import * as THREE from 'three';

/**
 * Bark Shader: Procedural organic wood texture with time-based energy flow.
 */
export const BarkShader = {
    uniforms: {
        uTime: { value: 0 },
        uColorBase: { value: new THREE.Color('#022C22') },
        uColorHighlight: { value: new THREE.Color('#1E6F4F') },
        uTexture: { value: null } // Optional noise texture
    },
    vertexShader: `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;

    // Perlin Noise (simplified)
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

    float cnoise(vec3 P){
      vec3 Pi0 = floor(P); // Integer part for indexing
      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
      Pi0 = mod(Pi0, 289.0);
      Pi1 = mod(Pi1, 289.0);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.y, Pi0.y, Pi1.y, Pi1.y);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;

      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);

      vec4 gx0 = ixy0 / 7.0;
      vec4 gy0 = fract(floor(gx0) * 1.0 / 7.0) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);

      vec4 gx1 = ixy1 / 7.0;
      vec4 gy1 = fract(floor(gx1) * 1.0 / 7.0) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);

      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;

      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.y, Pf0.z));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.x, Pf1.y, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.x, Pf0.y, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.y, Pf1.z));
      float n111 = dot(g111, Pf1);

      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
      return 2.2 * n_xyz;
    }

    void main() {
      vUv = uv;
      // Displace position for bark texture feel
      float noise = cnoise(position * 2.5 + uTime * 0.1);
      vElevation = noise;
      vec3 newPos = position + normal * noise * 0.1; 
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorBase;
    uniform vec3 uColorHighlight;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Create a vertical flow effect
      float flow = sin(vUv.y * 20.0 - uTime * 2.0) * 0.5 + 0.5;
      
      // Mix colors based on noise and flow
      vec3 color = mix(uColorBase, uColorHighlight, vElevation * 0.5 + flow * 0.2);
      
      // Add a subtle glow at the bottom
      float bottomGlow = 1.0 - smoothstep(0.0, 0.4, vUv.y);
      color += vec3(0.0, 0.2, 0.1) * bottomGlow;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

/**
 * Leaf Shader: Soft glowing particles.
 */
export const LeafShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#4ADE80') }
    },
    vertexShader: `
    attribute float aScale;
    attribute vec3 aRandom;
    uniform float uTime;
    varying vec2 vUv;
    varying float vAlpha;

    void main() {
      vUv = uv;
      
      // Infinite fall logic
      vec3 pos = position;
      
      // IMPORTANT: The instance logic happens in the generic Particles component
      // This shader assumes it is applied to an InstancedMesh where matrixWorld handles position
      // For custom per-particle animation, we'd need to manipulate the instanceMatrix in JS or use TSL (WebGPU)
      // Here we will use a simpler approach: Vertex sway
      
      pos.x += sin(uTime * aRandom.x + position.y) * 0.1;
      pos.z += cos(uTime * aRandom.y + position.y) * 0.1;

      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
      
      // Fade edges based on size
      vAlpha = 0.8;
    }
  `,
    fragmentShader: `
    uniform vec3 uColor;
    varying vec2 vUv;
    varying float vAlpha;

    void main() {
      // Circular particle
      float dist = distance(vUv, vec2(0.5));
      if (dist > 0.5) discard;
      
      // Soft glow
      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 2.0);

      gl_FragColor = vec4(uColor, vAlpha * strength);
    }
  `
};
