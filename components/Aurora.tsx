'use client'

import { useEffect, useRef, useMemo, useCallback } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
}

// Throttle function for RAF optimization
const throttle = <T extends unknown[]>(
  func: (...args: T) => void, 
  limit: number
) => {
  let inThrottle: boolean;
  return function(this: unknown, ...args: T) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Check if device is mobile for performance optimization
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

export default function Aurora(props: AuroraProps) {
  const {
    colorStops = ["#5227FF", "#7cff67", "#5227FF"],
    amplitude = 1.0,
    blend = 0.5,
  } = props;
  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);

  // Memoize performance settings
  const performanceSettings = useMemo(() => {
    const isMobile = isMobileDevice();
    const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    return {
      pixelRatio: isMobile ? Math.min(devicePixelRatio, 1.5) : devicePixelRatio,
      frameRate: isMobile ? 30 : 60,
      quality: isMobile ? 0.7 : 1.0,
    };
  }, []);

  // Memoize color stops processing
  const processedColorStops = useMemo(() => {
    return colorStops.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });
  }, [colorStops]);

  // Throttled update function for mobile devices
  const throttledUpdate = useCallback(
    throttle((program: Program, time: number) => {
      const { time: propTime = time * 0.01, speed = 1.0 } = propsRef.current;
      program.uniforms.uTime.value = propTime * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? amplitude;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map((hex: string) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
    }, 1000 / performanceSettings.frameRate),
    [amplitude, blend, colorStops, performanceSettings.frameRate]
  );

  const cleanup = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    if (rendererRef.current) {
      const canvas = rendererRef.current.gl.canvas;
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      rendererRef.current = null;
    }
  }, []);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    // Initialize renderer with performance optimizations
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: !isMobileDevice(), // Disable antialiasing on mobile for performance
      powerPreference: "low-power", // Use integrated GPU when available
    });
    
    rendererRef.current = renderer;
    const gl = renderer.gl;
    
    // Optimize WebGL settings
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";
    
    // Set pixel ratio for performance
    renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);

    // Resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!ctn || !programRef.current) return;
        const width = ctn.offsetWidth;
        const height = ctn.offsetHeight;
        renderer.setSize(width, height);
        programRef.current.uniforms.uResolution.value = [width, height];
      }, 150); // Debounce resize
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize, { passive: true });
    }

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete (geometry.attributes).uv;
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: processedColorStops },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
      },
    });
    
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;
    ctn.appendChild(gl.canvas);

    let lastTime = 0;
    const targetFPS = performanceSettings.frameRate;
    const frameInterval = 1000 / targetFPS;

    const update = (currentTime: number) => {
      animationIdRef.current = requestAnimationFrame(update);
      
      // Frame rate limiting for performance
      if (currentTime - lastTime < frameInterval) {
        return;
      }
      lastTime = currentTime;
      
      if (programRef.current && rendererRef.current && meshRef.current) {
        if (isMobileDevice()) {
          throttledUpdate(programRef.current, currentTime);
        } else {
          const { time = currentTime * 0.01, speed = 1.0 } = propsRef.current;
          programRef.current.uniforms.uTime.value = time * speed * 0.1;
          programRef.current.uniforms.uAmplitude.value = propsRef.current.amplitude ?? amplitude;
          programRef.current.uniforms.uBlend.value = propsRef.current.blend ?? blend;
          
          const stops = propsRef.current.colorStops ?? colorStops;
          programRef.current.uniforms.uColorStops.value = stops.map((hex: string) => {
            const c = new Color(hex);
            return [c.r, c.g, c.b];
          });
        }
        
        rendererRef.current.render({ scene: meshRef.current });
      }
    };

    // Start animation
    animationIdRef.current = requestAnimationFrame(update);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
      clearTimeout(resizeTimeout);
      cleanup();
    };
  }, [amplitude, blend, processedColorStops, performanceSettings, throttledUpdate, cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <div 
      ref={ctnDom} 
      className="absolute inset-0 w-full h-full performance-layer"
      style={{ 
        willChange: 'transform',
        contain: 'layout style paint',
      }}
    />
  );
} 