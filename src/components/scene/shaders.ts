const NOISE = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float noise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const ROTATE = `
mat3 rotation3dX(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}
mat3 rotation3dZ(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0);
}
vec3 rotateTorus(inout vec3 position, in float angle) {
  position *= rotation3dZ(-angle * 2.0);
  position *= rotation3dY(angle * 4.0);
  position *= rotation3dX(-angle);
  return position;
}
vec3 noiseTorus(inout vec3 position, in float uTime) {
  float noiseFactor = noise(vec3(position * 0.33) + (uTime * 0.2));
  position.z += noiseFactor * 0.22;
  return position;
}
`;

export const backgroundVert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const backgroundFrag = `
${NOISE}
uniform float uTime;
uniform float uAspect;
uniform vec3 uMidColour;
uniform vec3 uOffBlackColour;
uniform vec3 uBlackColour;
varying vec2 vUv;

void main() {
  float noiseA = noise(vec3(vUv * 2.0, uTime * 0.2)) * 0.5 + 0.5;
  float noiseB = noise(vec3(vUv * 4.0, uTime * 0.1)) * 0.5 + 0.5;
  vec3 colour = mix(mix(uMidColour, uOffBlackColour, noiseB), uBlackColour, noiseA);

  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= uAspect;
  float vig = smoothstep(0.6, 1.2, distance(uv, vec2(0.0)));
  colour = mix(colour, uBlackColour, vig);

  float noiseV = noise(vec3(vUv * 400.0, uTime));
  vec3 noiseColour = mix(colour, uMidColour, noiseV);
  colour = mix(colour, noiseColour, 0.2);
  gl_FragColor = vec4(colour, 1.0);
}
`;

export const torusVert = `
${NOISE}
${ROTATE}
uniform float uTime;
uniform float uRotateAngle;
varying vec3 vViewPosition;
varying vec3 vNormal;

void main() {
  vec3 projectedPosition = position;
  projectedPosition = rotateTorus(projectedPosition, uRotateAngle);
  projectedPosition = noiseTorus(projectedPosition, uTime);
  vec3 n = normal;
  n = rotateTorus(n, uRotateAngle);
  vec4 mv = modelViewMatrix * vec4(projectedPosition, 1.0);
  vViewPosition = mv.xyz;
  vNormal = normalize(normalMatrix * n);
  gl_Position = projectionMatrix * mv;
}
`;

export const torusFrag = `
${NOISE}
uniform float uTime;
uniform vec3 uColour;
uniform vec3 uActiveColour;
uniform float uActiveProgress;
uniform float uRadius;
uniform float uTube;
varying vec3 vViewPosition;
varying vec3 vNormal;

void main() {
  float size = uRadius + uTube;
  float startValue = mix(-size * 1.2, size * 1.2, uActiveProgress);
  float endValue = mix(-size * 1.2, size * 1.2, clamp(uActiveProgress * 1.8, 0.0, 1.0));
  float xNoise = noise(vec3(vViewPosition.xy * 16.0, uTime)) * 0.5 + 0.5 * 0.2;
  float mixFactor = smoothstep(startValue, endValue, vViewPosition.y + (xNoise * (1.0 - uActiveProgress)));
  vec3 blendedColour = mix(uActiveColour, uColour, mixFactor);
  float lambert = clamp(dot(normalize(vNormal), normalize(vec3(1.0, 1.7, 0.5))), 0.0, 1.0);
  vec3 colour = blendedColour * (0.35 + lambert);
  gl_FragColor = vec4(colour, uActiveProgress);
}
`;

export const ringVert = `
${NOISE}
${ROTATE}
attribute vec3 inactivePosition;
attribute vec3 scatteredPosition;
uniform float uTime;
uniform float uRotateAngle;
uniform float uIntroScrollProgress;
uniform float uOutroScrollProgress;
uniform float uActiveProgress;
uniform float uPointScale;

const float MIN_PT_SIZE = 14.0;
const float MAX_PT_SIZE = 32.0;

void main() {
  vec3 particlePosition = mix(scatteredPosition, inactivePosition, uIntroScrollProgress);
  particlePosition = mix(particlePosition, scatteredPosition, uOutroScrollProgress);
  particlePosition = mix(particlePosition, position, uActiveProgress);
  particlePosition = rotateTorus(particlePosition, uRotateAngle);
  particlePosition = noiseTorus(particlePosition, uTime);

  vec4 mv = modelViewMatrix * vec4(particlePosition, 1.0);
  vec4 projectedPosition = projectionMatrix * mv;
  float attenuationFactor = 1.0 / max(projectedPosition.z, 0.2);
  gl_Position = projectedPosition;
  float size = MAX_PT_SIZE * attenuationFactor * uPointScale;
  gl_PointSize = clamp(size, MIN_PT_SIZE * uPointScale, MAX_PT_SIZE * uPointScale);
}
`;

const RAY = `
mat2 rot2D(in float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}
float sdTorus(in vec3 p, in vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}
`;

export const ringFrag = `
#define MAX_ITERATIONS 12
#define MIN_DISTANCE 0.01
#define MAX_DISTANCE 5.00
#define TORUS_POS vec3(0.0, 0.0, 1.5)
#define LIGHT_POS vec3(0.5, -0.5, 0.0)
#define ALPHA 0.7
#define ACTIVE_ALPHA 0.0
#define OUTRO_ALPHA 0.0

uniform float uActiveProgress;
uniform float uIntroScrollProgress;
uniform float uOutroScrollProgress;
uniform vec3 uColour;

${RAY}
float getDistance(in vec3 p) {
  vec3 torusP = p - TORUS_POS;
  torusP.yz *= rot2D(-0.75);
  return sdTorus(torusP, vec2(0.5, 0.15));
}
float rayMarch(in vec3 ro, in vec3 rd) {
  float t = 0.0;
  for (int i = 0; i < MAX_ITERATIONS; i++) {
    vec3 p = ro + rd * t;
    float d = getDistance(p);
    if (d < MIN_DISTANCE) break;
    t += d;
    if (t > MAX_DISTANCE) break;
  }
  return t;
}
vec3 getNormal(in vec3 p) {
  float d = getDistance(p);
  vec2 e = vec2(0.01, 0.0);
  vec3 n = d - vec3(getDistance(p - e.xyy), getDistance(p - e.yxy), getDistance(p - e.yyx));
  return normalize(n);
}
float getLight(in vec3 p) {
  vec3 l = normalize(LIGHT_POS - p);
  float dif = clamp(dot(getNormal(p), l), 0.0, 1.0);
  return pow(dif, 1.5);
}

void main() {
  float alpha = mix(0.0, ALPHA, uIntroScrollProgress);
  alpha = mix(alpha, ACTIVE_ALPHA, uActiveProgress);
  alpha = mix(alpha, OUTRO_ALPHA, uOutroScrollProgress);
  vec2 coord = gl_PointCoord - vec2(0.5);
  if (length(coord) > 0.5) discard;
  vec3 ro = vec3(0.0, 0.0, 0.0);
  vec3 rd = normalize(vec3(coord, 1.0));
  float td = rayMarch(ro, rd);
  vec3 p = ro + rd * td;
  gl_FragColor = vec4(uColour * getLight(p), alpha);
}
`;

export const cloudVert = `
attribute vec3 colour;
varying vec3 vColour;
varying vec3 vPosition;

const float MIN_PT_SIZE = 24.0;
const float MAX_PT_SIZE = 80.0;

void main() {
  vPosition = position;
  vColour = colour;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vec4 projectedPosition = projectionMatrix * mv;
  float attenuationFactor = 1.0 / max(projectedPosition.z, 0.2);
  gl_Position = projectedPosition;
  gl_PointSize = clamp(MAX_PT_SIZE * attenuationFactor, MIN_PT_SIZE, MAX_PT_SIZE);
}
`;

export const cloudFrag = `
#define MAX_ITERATIONS 12
#define MIN_DISTANCE 0.01
#define MAX_DISTANCE 5.00
#define TORUS_POS vec3(0.0, 0.0, 1.5)
#define LIGHT_POS vec3(0.5, -0.5, 0.0)

varying vec3 vColour;
varying vec3 vPosition;
uniform float uTime;

${RAY}
float getDistance(in vec3 p) {
  vec3 torusP = p - TORUS_POS;
  float rotation = uTime + (vPosition.x * 33.0);
  torusP.yz *= rot2D(rotation);
  return sdTorus(torusP, vec2(0.5, 0.15));
}
float rayMarch(in vec3 ro, in vec3 rd) {
  float t = 0.0;
  for (int i = 0; i < MAX_ITERATIONS; i++) {
    vec3 p = ro + rd * t;
    float d = getDistance(p);
    if (d < MIN_DISTANCE) break;
    t += d;
    if (t > MAX_DISTANCE) break;
  }
  return t;
}
vec3 getNormal(in vec3 p) {
  float d = getDistance(p);
  vec2 e = vec2(0.01, 0.0);
  vec3 n = d - vec3(getDistance(p - e.xyy), getDistance(p - e.yxy), getDistance(p - e.yyx));
  return normalize(n);
}
float getLight(in vec3 p) {
  float dif = clamp(dot(getNormal(p), normalize(LIGHT_POS - p)), 0.0, 1.0);
  return pow(dif, 1.5);
}

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  if (length(coord) > 0.5) discard;
  vec3 rd = normalize(vec3(coord, 1.0));
  float td = rayMarch(vec3(0.0), rd);
  gl_FragColor = vec4(vColour * getLight(vec3(0.0) + rd * td), 0.8);
}
`;
