
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Existing saree photograph in your public folder.
// Change this path if you want to use another saree photograph.
const SAREE_IMAGE = "/media/silk/s02.jpg";

type Pointer = {
  x: number;
  y: number;
};

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;

  varying vec2 vUv;
  varying float vFold;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;

    vec3 p = position;
    float t = uTime;

    // Natural vertical silk pleats
    float pleats =
      sin(uv.x * 27.0 + sin(uv.y * 5.0 - t * 0.7) * 1.4)
      * 0.075;

    // Soft moving folds
    float folds =
      sin(uv.x * 13.0 - t * 0.8 + uv.y * 3.0)
      * 0.055;

    // Fine fabric wrinkles
    float fineFolds =
      sin(uv.x * 55.0 + uv.y * 10.0 - t * 1.3)
      * 0.012;

    // Flowing free end / pallu
    float pallu =
      pow(uv.y, 1.8) *
      (
        sin(t * 1.15 + uv.y * 5.0) * 0.18 +
        sin(t * 0.8 + uv.x * 7.0) * 0.07
      );

    // Subtle mouse response
    float mouseMovement =
      uPointer.x * sin(uv.y * 3.14159) * 0.08 +
      uPointer.y * sin(uv.x * 3.14159) * 0.06;

    p.z += pleats + folds + fineFolds + pallu + mouseMovement;

    // Side-to-side fabric movement
    p.x +=
      sin(uv.y * 4.0 - t * 0.5) *
      0.10 *
      pow(uv.y, 1.5);

    // Gentle vertical movement
    p.y += sin(uv.x * 5.0 + t * 0.5) * 0.025;

    vFold = pleats + folds + fineFolds;
    vNormal = normalize(normalMatrix * normal);
    vPosition = p;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uTime;

  varying vec2 vUv;
  varying float vFold;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {

    // Actual saree photograph
    vec4 saree = texture2D(uTexture, vUv);

    // Preserve the original saree colours
    vec3 color = saree.rgb;

    // Fabric fold shading
    float foldLight =
      0.82 + smoothstep(-0.15, 0.15, vFold) * 0.30;

    color *= foldLight;

    // Moving silk reflection
    float shinePosition =
      0.5 + sin(uTime * 0.45) * 0.25;

    float shine =
      exp(
        -pow(
          (vUv.x - shinePosition) * 7.0,
          2.0
        )
      );

    // Fine silk threads
    float threads = pow(
      1.0 - abs(sin(vUv.x * 450.0 + vUv.y * 35.0)),
      18.0
    );

    // Moving fold highlights
    float foldHighlight = pow(
      max(
        0.0,
        sin(vUv.x * 28.0 + vFold * 25.0 - uTime)
      ),
      8.0
    );

    // Warm golden silk reflection
    vec3 gold = vec3(1.0, 0.78, 0.43);

    color += gold * (
      shine * 0.22 +
      threads * 0.055 +
      foldHighlight * 0.08
    );

    // Gentle fabric lighting
    float lighting =
      0.85 +
      0.15 *
      abs(
        dot(
          normalize(vNormal),
          normalize(vec3(-0.35, 0.55, 1.0))
        )
      );

    color *= lighting;

    // Keep the photograph visible with softly feathered edges
    float edgeX =
      smoothstep(0.0, 0.025, vUv.x) *
      (1.0 - smoothstep(0.975, 1.0, vUv.x));

    float edgeY =
      smoothstep(0.0, 0.02, vUv.y) *
      (1.0 - smoothstep(0.98, 1.0, vUv.y));

    float alpha = edgeX * edgeY * saree.a;

    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function SareeCloth({
  pointer,
}: {
  pointer: MutableRefObject<Pointer>;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  // Load the actual saree photograph as a texture
  const texture = useLoader(THREE.TextureLoader, SAREE_IMAGE);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
  }, [texture]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPointer: {
          value: new THREE.Vector2(0, 0),
        },
        uTexture: {
          value: texture,
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });
  }, [texture]);

  useEffect(() => {
    return () => material.dispose();
  }, [material]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Smooth mouse movement
    const pointerTarget =
      material.uniforms.uPointer.value as THREE.Vector2;

    pointerTarget.x +=
      (pointer.current.x - pointerTarget.x) * 0.035;

    pointerTarget.y +=
      (pointer.current.y - pointerTarget.y) * 0.035;

    // Continuous fabric animation
    material.uniforms.uTime.value = t;

    if (mesh.current) {
      mesh.current.rotation.y =
        Math.sin(t * 0.22) * 0.045 +
        pointerTarget.x * 0.025;

      mesh.current.rotation.x =
        Math.sin(t * 0.28) * 0.018 +
        pointerTarget.y * 0.018;

      mesh.current.rotation.z =
        Math.sin(t * 0.16) * 0.012;
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={[1.08, 1.08, 1]}
    >
      <planeGeometry args={[3.7, 4.6, 180, 220]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function SareeScene({
  pointer,
}: {
  pointer: MutableRefObject<Pointer>;
}) {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[3, 4, 5]}
        intensity={1.3}
      />

      <pointLight
        position={[-3, 1, 3]}
        intensity={0.8}
        color="#F4D39A"
      />

      <SareeCloth pointer={pointer} />
    </>
  );
}

export default function SilkStage() {
  const pointer = useRef<Pointer>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      pointer.current.y =
        1 - (event.clientY / window.innerHeight) * 2;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <Canvas
        frameloop="always"
        camera={{
          position: [0, 0, 5.8],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      >
        <SareeScene pointer={pointer} />
      </Canvas>
    </div>
  );
}
