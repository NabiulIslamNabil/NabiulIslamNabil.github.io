import { useRef, useEffect } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const ADVECTION_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_velocity;
uniform sampler2D u_quantity;
uniform vec2 u_texelSize;
uniform float u_dt;
uniform float u_dissipation;
void main() {
  vec2 vel = texture2D(u_velocity, v_uv).xy;
  vec2 pos = v_uv - u_texelSize * vel * u_dt;
  gl_FragColor = u_dissipation * texture2D(u_quantity, pos);
}
`;

const DIVERGENCE_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_velocity;
uniform vec2 u_texelSize;
vec2 sampleVelocity(vec2 uv) {
  return texture2D(u_velocity, uv).xy;
}
void main() {
  vec2 texelSize = u_texelSize;
  float L = sampleVelocity(v_uv + vec2(-texelSize.x, 0.0)).x;
  float R = sampleVelocity(v_uv + vec2( texelSize.x, 0.0)).x;
  float B = sampleVelocity(v_uv + vec2(0.0, -texelSize.y)).y;
  float T = sampleVelocity(v_uv + vec2(0.0,  texelSize.y)).y;
  gl_FragColor = vec4(0.5 * ((R - L) + (T - B)), 0.0, 0.0, 1.0);
}
`;

const JACOBI_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_pressure;
uniform sampler2D u_divergence;
uniform vec2 u_texelSize;
uniform float u_alpha;
void main() {
  vec2 texelSize = u_texelSize;
  float L = texture2D(u_pressure, v_uv + vec2(-texelSize.x, 0.0)).x;
  float R = texture2D(u_pressure, v_uv + vec2( texelSize.x, 0.0)).x;
  float B = texture2D(u_pressure, v_uv + vec2(0.0, -texelSize.y)).x;
  float T = texture2D(u_pressure, v_uv + vec2(0.0,  texelSize.y)).x;
  float d = texture2D(u_divergence, v_uv).x;
  gl_FragColor = vec4((L + R + B + T + u_alpha * d) / 4.0, 0.0, 0.0, 1.0);
}
`;

const GRADIENT_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_velocity;
uniform sampler2D u_pressure;
uniform vec2 u_texelSize;
void main() {
  vec2 texelSize = u_texelSize;
  float L = texture2D(u_pressure, v_uv + vec2(-texelSize.x, 0.0)).x;
  float R = texture2D(u_pressure, v_uv + vec2( texelSize.x, 0.0)).x;
  float B = texture2D(u_pressure, v_uv + vec2(0.0, -texelSize.y)).x;
  float T = texture2D(u_pressure, v_uv + vec2(0.0,  texelSize.y)).x;
  vec2 vel = texture2D(u_velocity, v_uv).xy;
  gl_FragColor = vec4(vel - 0.5 * vec2(R - L, T - B), 0.0, 1.0);
}
`;

const CURL_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_velocity;
uniform vec2 u_texelSize;
void main() {
  vec2 texelSize = u_texelSize;
  float L = texture2D(u_velocity, v_uv + vec2(-texelSize.x, 0.0)).y;
  float R = texture2D(u_velocity, v_uv + vec2( texelSize.x, 0.0)).y;
  float B = texture2D(u_velocity, v_uv + vec2(0.0, -texelSize.y)).x;
  float T = texture2D(u_velocity, v_uv + vec2(0.0,  texelSize.y)).x;
  float curl = R - L - T + B;
  gl_FragColor = vec4(curl, 0.0, 0.0, 1.0);
}
`;

const VORTICITY_FORCE_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_velocity;
uniform sampler2D u_vorticity;
uniform vec2 u_texelSize;
uniform float u_curl;
uniform float u_dt;
void main() {
  float vorticity = texture2D(u_vorticity, v_uv).x;
  float absCurl = abs(vorticity);
  float vL = abs(texture2D(u_vorticity, v_uv + vec2(-u_texelSize.x, 0.0)).x);
  float vR = abs(texture2D(u_vorticity, v_uv + vec2( u_texelSize.x, 0.0)).x);
  float vB = abs(texture2D(u_vorticity, v_uv + vec2(0.0, -u_texelSize.y)).x);
  float vT = abs(texture2D(u_vorticity, v_uv + vec2(0.0,  u_texelSize.y)).x);
  vec2 eta = normalize(vec2(vR - vL, vT - vB) + vec2(1.0e-5));
  vec2 force = u_curl * vec2(eta.y, -eta.x) * vorticity;
  vec2 vel = texture2D(u_velocity, v_uv).xy;
  gl_FragColor = vec4(vel + force * u_dt, 0.0, 1.0);
}
`;

const BRUSH_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_fluid;
uniform vec3 u_brushPos;
uniform vec3 u_brushColor;
uniform float u_brushSize;
uniform float u_brushStrength;
uniform float u_dissipation;
uniform vec2 u_texelSize;
uniform float u_pointerActive;
uniform float u_pointerDown;
void main() {
  vec4 col = texture2D(u_fluid, v_uv);
  col *= u_dissipation;
  if (u_pointerActive > 0.5) {
    vec2 diff = (v_uv - u_brushPos.xy) / u_texelSize;
    float dist = length(diff);
    if (dist < u_brushSize) {
      float falloff = smoothstep(u_brushSize, 0.0, dist);
      float strength = u_brushStrength * falloff;
      col.xyz += strength * u_brushColor;
    }
  }
  gl_FragColor = col;
}
`;

const DISPLAY_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform sampler2D u_fluid;
uniform vec3 u_brushColor;
uniform float u_brushStrength;
uniform float u_time;

vec3 ACESFilm(vec3 x) {
  float a = 2.51;
  float b = 0.03;
  float c = 2.43;
  float d = 0.59;
  float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

// Simplified Kuwahara-style directional smoothing
vec4 kuwaharaDirectional(vec2 uv, sampler2D tex, float radius) {
  vec2 texel = 1.0 / u_resolution;
  vec4 m0 = vec4(0.0);
  vec4 m1 = vec4(0.0);
  vec4 m2 = vec4(0.0);
  vec4 m3 = vec4(0.0);
  float n = 0.0;
  
  for (float x = -radius; x <= radius; x += 2.0) {
    for (float y = -radius; y <= 0.0; y += 2.0) {
      vec4 c = texture2D(tex, uv + vec2(x, y) * texel);
      m0 += c;
      n += 1.0;
    }
  }
  m0 /= max(n, 1.0);
  n = 0.0;
  
  for (float x = -radius; x <= radius; x += 2.0) {
    for (float y = 0.0; y <= radius; y += 2.0) {
      vec4 c = texture2D(tex, uv + vec2(x, y) * texel);
      m1 += c;
      n += 1.0;
    }
  }
  m1 /= max(n, 1.0);
  n = 0.0;
  
  for (float x = -radius; x <= 0.0; x += 2.0) {
    for (float y = -radius; y <= radius; y += 2.0) {
      vec4 c = texture2D(tex, uv + vec2(x, y) * texel);
      m2 += c;
      n += 1.0;
    }
  }
  m2 /= max(n, 1.0);
  n = 0.0;
  
  for (float x = 0.0; x <= radius; x += 2.0) {
    for (float y = -radius; y <= radius; y += 2.0) {
      vec4 c = texture2D(tex, uv + vec2(x, y) * texel);
      m3 += c;
      n += 1.0;
    }
  }
  m3 /= max(n, 1.0);
  
  // Directional blending based on gradient
  float gx = length(m1.rgb - m0.rgb);
  float gy = length(m3.rgb - m2.rgb);
  float g = gx + gy + 0.001;
  float wx = gy / g;
  float wy = gx / g;
  
  return mix(mix(m0, m1, wx), mix(m2, m3, wy), wy);
}

void main() {
  // Create a subtle radial gradient base
  vec2 center = v_uv - 0.5;
  float dist = length(center);
  vec3 baseColor = mix(vec3(0.025, 0.025, 0.024), vec3(0.08, 0.13, 0.14), smoothstep(0.0, 0.6, dist));
  
  // Sample the fluid with kuwahara-style filtering
  vec4 fluidCol = kuwaharaDirectional(v_uv, u_fluid, 12.0);
  
  // Mix base and fluid
  vec3 finalColor = baseColor + fluidCol.rgb * u_brushStrength * 2.5;
  
  // ACES tone mapping
  finalColor = ACESFilm(finalColor);
  
  // Palette shift
  finalColor = pow(finalColor, vec3(1.0, 0.95, 1.1));
  
  // Subtle noise
  float noise = fract(sin(dot(v_uv * u_resolution, vec2(12.9898, 78.233)) + u_time * 0.1) * 43758.5453);
  finalColor += noise * 0.008;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertSrc: string, fragSrc: string): WebGLProgram | null {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  read: number;
  write: number;
}

function createFBO(gl: WebGLRenderingContext, w: number, h: number): FBO {
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { texture, fbo, read: 0, write: 1 };
}

function createDoubleFBO(gl: WebGLRenderingContext, w: number, h: number): { read: FBO; write: FBO; swap: () => void } {
  const fbo1 = createFBO(gl, w, h);
  const fbo2 = createFBO(gl, w, h);
  return {
    read: fbo1,
    write: fbo2,
    swap() {
      const temp = fbo1.texture;
      fbo1.texture = fbo2.texture;
      fbo2.texture = temp;
      const tempFbo = fbo1.fbo;
      fbo1.fbo = fbo2.fbo;
      fbo2.fbo = tempFbo;
    }
  };
}

function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram) {
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) {
      uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }
  }
  return uniforms;
}

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for touch device - skip fluid on mobile
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
      canvas.style.background = 'radial-gradient(ellipse at 30% 40%, #22333B 0%, #0A0908 70%)';
      return;
    }

    const gl = canvas.getContext('webgl', {
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    // Enable float textures
    const ext = gl.getExtension('OES_texture_float');
    if (!ext) {
      console.warn('OES_texture_float not supported, falling back to gradient');
      canvas.style.background = 'radial-gradient(ellipse at 30% 40%, #22333B 0%, #0A0908 70%)';
      return;
    }
    gl.getExtension('OES_texture_float_linear');

    const dpr = Math.min(window.devicePixelRatio, 2);
    let width = Math.floor(canvas.offsetWidth * dpr);
    let height = Math.floor(canvas.offsetHeight * dpr);

    // Cap resolution
    const MAX_RES = 1024;
    if (width > MAX_RES || height > MAX_RES) {
      const scale = MAX_RES / Math.max(width, height);
      width = Math.floor(width * scale);
      height = Math.floor(height * scale);
    }

    canvas.width = width;
    canvas.height = height;

    const texelSize = { x: 1.0 / width, y: 1.0 / height };

    // Create programs
    const advectProg = createProgram(gl, VERTEX_SHADER, ADVECTION_SHADER);
    const divProg = createProgram(gl, VERTEX_SHADER, DIVERGENCE_SHADER);
    const jacobiProg = createProgram(gl, VERTEX_SHADER, JACOBI_SHADER);
    const gradProg = createProgram(gl, VERTEX_SHADER, GRADIENT_SHADER);
    const curlProg = createProgram(gl, VERTEX_SHADER, CURL_SHADER);
    const vortProg = createProgram(gl, VERTEX_SHADER, VORTICITY_FORCE_SHADER);
    const brushProg = createProgram(gl, VERTEX_SHADER, BRUSH_SHADER);
    const displayProg = createProgram(gl, VERTEX_SHADER, DISPLAY_SHADER);

    if (!advectProg || !divProg || !jacobiProg || !gradProg || !curlProg || !vortProg || !brushProg || !displayProg) {
      return;
    }

    // Get uniforms
    const advectUni = getUniforms(gl, advectProg);
    const divUni = getUniforms(gl, divProg);
    const jacobiUni = getUniforms(gl, jacobiProg);
    const gradUni = getUniforms(gl, gradProg);
    const curlUni = getUniforms(gl, curlProg);
    const vortUni = getUniforms(gl, vortProg);
    const brushUni = getUniforms(gl, brushProg);
    const displayUni = getUniforms(gl, displayProg);

    // Create quad buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    // Create FBOs
    const velocityFBO = createDoubleFBO(gl, width, height);
    const divergenceFBO = createFBO(gl, width, height);
    const pressureFBOs = [createFBO(gl, width, height), createFBO(gl, width, height)];
    const curlFBO = createFBO(gl, width, height);

    // Mouse state
    const mouse = { x: 0.5, y: 0.5, vx: 0, vy: 0, active: 0, down: 0 };
    let lastMouseX = 0.5;
    let lastMouseY = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouse.vx = (x - lastMouseX) * 800;
      mouse.vy = (y - lastMouseY) * 800;
      lastMouseX = x;
      lastMouseY = y;
      mouse.x = x;
      mouse.y = y;
    };

    const handleMouseEnter = () => { mouse.active = 1; };
    const handleMouseLeave = () => { mouse.active = 0; mouse.down = 0; };
    const handleMouseDown = () => { mouse.down = 1; };
    const handleMouseUp = () => { mouse.down = 0; };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    function blit(gl: WebGLRenderingContext, target: FBO | null, w: number, h: number) {
      if (target) {
        gl.viewport(0, 0, w, h);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, canvas!.width, canvas!.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function bindQuad(gl: WebGLRenderingContext, program: WebGLProgram) {
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      const posLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    }

    const BRUSH_COLOR = [0.42, 0.54, 0.55]; // Muted teal-gray accent
    const startTime = performance.now();

    let animId = 0;

    function simulate() {
      if (!gl) return;
      const time = (performance.now() - startTime) / 1000;

      // Advect velocity
      gl.useProgram(advectProg);
      bindQuad(gl, advectProg!);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(advectUni['u_velocity'], 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(advectUni['u_quantity'], 1);
      gl.uniform2f(advectUni['u_texelSize'], texelSize.x, texelSize.y);
      gl.uniform1f(advectUni['u_dt'], 0.016);
      gl.uniform1f(advectUni['u_dissipation'], 0.985);
      blit(gl, velocityFBO.write, width, height);
      velocityFBO.swap();

      // Compute curl
      gl.useProgram(curlProg);
      bindQuad(gl, curlProg!);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(curlUni['u_velocity'], 0);
      gl.uniform2f(curlUni['u_texelSize'], texelSize.x, texelSize.y);
      blit(gl, curlFBO, width, height);

      // Apply vorticity confinement
      gl.useProgram(vortProg);
      bindQuad(gl, vortProg!);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(vortUni['u_velocity'], 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, curlFBO.texture);
      gl.uniform1i(vortUni['u_vorticity'], 1);
      gl.uniform2f(vortUni['u_texelSize'], texelSize.x, texelSize.y);
      gl.uniform1f(vortUni['u_curl'], 4.5);
      gl.uniform1f(vortUni['u_dt'], 0.016);
      blit(gl, velocityFBO.write, width, height);
      velocityFBO.swap();

      // Compute divergence
      gl.useProgram(divProg);
      bindQuad(gl, divProg!);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(divUni['u_velocity'], 0);
      gl.uniform2f(divUni['u_texelSize'], texelSize.x, texelSize.y);
      blit(gl, divergenceFBO, width, height);

      // Clear pressure
      gl.clearColor(0, 0, 0, 1);
      gl.bindFramebuffer(gl.FRAMEBUFFER, pressureFBOs[0].fbo);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindFramebuffer(gl.FRAMEBUFFER, pressureFBOs[1].fbo);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Jacobi iterations for pressure
      for (let i = 0; i < 20; i++) {
        gl.useProgram(jacobiProg);
        bindQuad(gl, jacobiProg!);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressureFBOs[0].texture);
        gl.uniform1i(jacobiUni['u_pressure'], 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, divergenceFBO.texture);
        gl.uniform1i(jacobiUni['u_divergence'], 1);
        gl.uniform2f(jacobiUni['u_texelSize'], texelSize.x, texelSize.y);
        gl.uniform1f(jacobiUni['u_alpha'], -1.0);
        blit(gl, pressureFBOs[1], width, height);
        // Swap
        const temp = pressureFBOs[0].texture;
        pressureFBOs[0].texture = pressureFBOs[1].texture;
        pressureFBOs[1].texture = temp;
        const tempFbo = pressureFBOs[0].fbo;
        pressureFBOs[0].fbo = pressureFBOs[1].fbo;
        pressureFBOs[1].fbo = tempFbo;
      }

      // Subtract pressure gradient
      gl.useProgram(gradProg);
      bindQuad(gl, gradProg!);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(gradUni['u_velocity'], 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, pressureFBOs[0].texture);
      gl.uniform1i(gradUni['u_pressure'], 1);
      gl.uniform2f(gradUni['u_texelSize'], texelSize.x, texelSize.y);
      blit(gl, velocityFBO.write, width, height);
      velocityFBO.swap();

      // Paint brush (cursor trail)
      gl.useProgram(brushProg);
      bindQuad(gl, brushProg!);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(brushUni['u_fluid'], 0);
      gl.uniform3f(brushUni['u_brushPos'], mouse.x, mouse.y, mouse.down);
      gl.uniform3f(brushUni['u_brushColor'], BRUSH_COLOR[0], BRUSH_COLOR[1], BRUSH_COLOR[2]);
      gl.uniform1f(brushUni['u_brushSize'], 28.0);
      gl.uniform1f(brushUni['u_brushStrength'], 0.52);
      gl.uniform1f(brushUni['u_dissipation'], 0.985);
      gl.uniform2f(brushUni['u_texelSize'], texelSize.x, texelSize.y);
      gl.uniform1f(brushUni['u_pointerActive'], mouse.active);
      gl.uniform1f(brushUni['u_pointerDown'], mouse.down);
      blit(gl, velocityFBO.write, width, height);
      velocityFBO.swap();

      // Display
      gl.useProgram(displayProg);
      bindQuad(gl, displayProg!);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(displayUni['u_fluid'], 0);
      gl.uniform2f(displayUni['u_resolution'], width, height);
      gl.uniform3f(displayUni['u_brushColor'], BRUSH_COLOR[0], BRUSH_COLOR[1], BRUSH_COLOR[2]);
      gl.uniform1f(displayUni['u_brushStrength'], 0.52);
      gl.uniform1f(displayUni['u_time'], time);
      blit(gl, null, width, height);

      // Decay velocity
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      animId = requestAnimationFrame(simulate);
    }

    animId = requestAnimationFrame(simulate);

    const handleResize = () => {
      const newWidth = Math.floor(canvas.offsetWidth * dpr);
      const newHeight = Math.floor(canvas.offsetHeight * dpr);
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
