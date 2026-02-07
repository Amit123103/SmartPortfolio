uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vUv;
varying float vElevation;
varying vec3 vNormal;
varying float vBio;

void main() {
  // Vertical energy flow
  float flowSpeed = 1.5 + (vBio * 3.0);
  float flow = sin(vUv.y * 10.0 - uTime * flowSpeed) * 0.5 + 0.5;
  
  // Rim lighting (Fresnel)
  vec3 viewDirection = normalize(cameraPosition - vNormal);
  float fresnel = dot(viewDirection, vNormal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 3.0);

  // Mix based on noise elevation and flow
  vec3 color = mix(uColorA, uColorB, vElevation + flow * 0.3);
  
  // Bioluminescence pulse
  float pulse = (sin(uTime * 5.0) * 0.5 + 0.5) * vBio;
  color += uColorB * pulse * 0.5;
  
  // Add glowing rim
  color += vec3(0.6, 1.0, 0.8) * fresnel * (0.8 + vBio);
  
  // Darker base
  float bottomFade = smoothstep(-5.0, 5.0, vUv.y);
  color *= bottomFade;

  gl_FragColor = vec4(color, 1.0);
  
  #include <colorspace_fragment>
}
