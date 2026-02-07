uniform float uTime;
uniform vec3 uColorA; // Base
uniform vec3 uColorB; // Highlight
uniform vec3 uFogColor;
uniform float uMistDensity;

varying vec2 vUv;
varying vec3 vWorldPos;
varying float vElevation;

void main() {
    // 1. Base Gradient
    vec3 color = mix(uColorA, uColorB, vUv.y + sin(uTime) * 0.1);

    // 2. Volumetric Mist (Distance Fog)
    float dist = length(cameraPosition - vWorldPos);
    float fogFactor = smoothstep(5.0, 20.0, dist) * uMistDensity;
    
    // 3. Height Fog (Ground mist)
    float groundFog = smoothstep(2.0, -2.0, vWorldPos.y) * 0.5;
    
    color = mix(color, uFogColor, fogFactor + groundFog);

    // 4. Bioluminescence Pulse
    // Only applied if uColorB is bright
    float pulse = sin(uTime * 2.0 + vWorldPos.x) * 0.5 + 0.5;
    if (length(uColorB) > 1.5) {
        color += uColorB * pulse * 0.3;
    }

    gl_FragColor = vec4(color, 1.0);
}
