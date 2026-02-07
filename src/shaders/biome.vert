uniform float uTime;
uniform float uSway;
uniform float uMistDensity;
varying vec2 vUv;
varying vec3 vWorldPos;
varying float vElevation;

// Per-instance attributes for particles/leaves
attribute float aScale;
attribute float aOffset;

void main() {
    vUv = uv;
    vec3 pos = position;

    // Apply scaling for instanced meshes
    #ifdef USE_INSTANCING
        pos *= aScale;
    #endif

    // Wind Sway
    float wind = sin(uTime * 0.5 + pos.x * 0.5) * cos(uTime * 0.3 + pos.z * 0.5) * uSway;
    pos.x += wind * smoothstep(0.0, 5.0, pos.y);

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
    
    vElevation = pos.y;
}
