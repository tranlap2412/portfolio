"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  MathUtils,
  ShaderMaterial,
} from "three";
import {
  backgroundFrag,
  backgroundVert,
  cloudFrag,
  cloudVert,
  ringFrag,
  ringVert,
  torusFrag,
  torusVert,
} from "./shaders";

type Section = "purpose" | "design" | "engineering";

const SECTIONS: Section[] = ["purpose", "design", "engineering"];

const RINGS: Record<
  Section,
  {
    radius: number;
    tube: number;
    radial: number;
    tubular: number;
    pointsTubular: number;
    duration: number;
    color: string;
  }
> = {
  purpose: { radius: 0.5, tube: 0.08, radial: 8, tubular: 32, pointsTubular: 16, duration: 40, color: "#37FFA8" },
  design: { radius: 0.85, tube: 0.08, radial: 8, tubular: 64, pointsTubular: 32, duration: 50, color: "#E5A019" },
  engineering: { radius: 1.2, tube: 0.08, radial: 8, tubular: 96, pointsTubular: 48, duration: 60, color: "#37F3FF" },
};

function srgb(hex: string) {
  return new Color(hex).convertLinearToSRGB();
}

const PALETTE = {
  mid: srgb("#2E2A37"),
  off: srgb("#1E1B23"),
  black: srgb("#0A090C"),
  light: srgb("#9D97AA"),
};

const LIGHT_PALETTE = {
  mid: srgb("#d5d0dc"),
  off: srgb("#eceaf2"),
  black: srgb("#f7f6f9"),
  light: srgb("#6e687c"),
};

const motion = {
  intro: { value: 0 },
  outro: { value: 0 },
  dark: { value: 1 },
  active: { purpose: { value: 0 }, design: { value: 0 }, engineering: { value: 0 } },
  rotate: { purpose: { value: 0 }, design: { value: 0 }, engineering: { value: 0 } },
  section: null as Section | null,
  reduced: false,
};

function ringPositions(radius: number, tube: number, radial: number, tubular: number) {
  const active: number[] = [];
  const inactive: number[] = [];
  const scattered: number[] = [];
  for (let j = 0; j <= tubular; j++) {
    const u = (j / tubular) * Math.PI * 2;
    for (let i = 0; i <= radial; i++) {
      const v = (i / radial) * Math.PI * 2;
      const x = (radius + tube * Math.cos(v)) * Math.cos(u);
      const y = (radius + tube * Math.cos(v)) * Math.sin(u);
      const z = tube * Math.sin(v);
      active.push(x, y, z);
      inactive.push(x + (Math.random() - 0.5) * 0.12, y + (Math.random() - 0.5) * 0.12, z + (Math.random() - 0.5) * 0.12);
      const theta = MathUtils.randFloatSpread(360);
      const phi = MathUtils.randFloatSpread(360);
      scattered.push(
        3 * Math.sin(theta) * Math.cos(phi),
        3 * Math.sin(theta) * Math.sin(phi),
        3 * Math.cos(theta) + Math.random() * 0.5 - 0.25,
      );
    }
  }
  return {
    active: new Float32Array(active),
    inactive: new Float32Array(inactive),
    scattered: new Float32Array(scattered),
  };
}

function BackgroundPlane() {
  const material = useRef<ShaderMaterial>(null);
  const viewport = useThree((state) => state.viewport);
  const tone = useRef(motion.dark.value);
  useFrame(({ clock }) => {
    const shader = material.current;
    if (!shader) return;
    shader.uniforms.uTime.value = motion.reduced ? 0 : clock.elapsedTime;
    shader.uniforms.uAspect.value = viewport.aspect;
    if (tone.current === motion.dark.value) return;
    tone.current = motion.dark.value;
    const palette = motion.dark.value > 0.5 ? PALETTE : LIGHT_PALETTE;
    shader.uniforms.uMidColour.value.copy(palette.mid);
    shader.uniforms.uOffBlackColour.value.copy(palette.off);
    shader.uniforms.uBlackColour.value.copy(palette.black);
  });
  return (
    <mesh position={[0, 0, -6]}>
      <planeGeometry args={[viewport.width * 3, viewport.height * 3]} />
      <shaderMaterial
        ref={material}
        vertexShader={backgroundVert}
        fragmentShader={backgroundFrag}
        uniforms={{
          uTime: { value: 0 },
          uAspect: { value: viewport.aspect },
          uMidColour: { value: PALETTE.mid.clone() },
          uOffBlackColour: { value: PALETTE.off.clone() },
          uBlackColour: { value: PALETTE.black.clone() },
        }}
      />
    </mesh>
  );
}

function PointerCamera() {
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX / size.width - 0.5;
      pointer.current.y = event.clientY / size.height - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [size.width, size.height]);
  useFrame(({ camera, scene }) => {
    if (motion.reduced) return;
    camera.position.x += (pointer.current.x - camera.position.x) * 0.04;
    camera.position.y += (-pointer.current.y - camera.position.y) * 0.04;
    camera.lookAt(scene.position);
  });
  return null;
}

function SolidRing({ section }: { section: Section }) {
  const material = useRef<ShaderMaterial>(null);
  const ring = RINGS[section];
  const tone = useRef(motion.dark.value);
  useFrame(({ clock }) => {
    const shader = material.current;
    if (!shader) return;
    shader.uniforms.uTime.value = motion.reduced ? 0 : clock.elapsedTime;
    shader.uniforms.uRotateAngle.value = motion.rotate[section].value;
    shader.uniforms.uActiveProgress.value = motion.active[section].value;
    if (tone.current === motion.dark.value) return;
    tone.current = motion.dark.value;
    shader.uniforms.uColour.value.copy(motion.dark.value > 0.5 ? PALETTE.off : LIGHT_PALETTE.off);
  });
  return (
    <mesh>
      <torusGeometry args={[ring.radius, ring.tube, ring.radial, ring.tubular]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        vertexShader={torusVert}
        fragmentShader={torusFrag}
        uniforms={{
          uTime: { value: 0 },
          uRotateAngle: { value: 0 },
          uActiveProgress: { value: 0 },
          uRadius: { value: ring.radius },
          uTube: { value: ring.tube },
          uColour: { value: PALETTE.off.clone() },
          uActiveColour: { value: srgb(ring.color) },
        }}
      />
    </mesh>
  );
}

function ParticleRing({
  section,
  mobile,
  pointScale = 1,
  sparse = false,
}: {
  section: Section;
  mobile: boolean;
  pointScale?: number;
  sparse?: boolean;
}) {
  const material = useRef<ShaderMaterial>(null);
  const ring = RINGS[section];
  const positions = useMemo(
    () =>
      ringPositions(
        ring.radius,
        ring.tube,
        sparse ? 3 : mobile ? 4 : 6,
        sparse ? 8 : mobile ? Math.round(ring.pointsTubular / 2) : ring.pointsTubular,
      ),
    [mobile, ring.pointsTubular, ring.radius, ring.tube, sparse],
  );
  const tone = useRef(motion.dark.value);
  useFrame(({ clock }) => {
    const shader = material.current;
    if (!shader) return;
    shader.uniforms.uTime.value = motion.reduced ? 0 : clock.elapsedTime;
    shader.uniforms.uRotateAngle.value = motion.rotate[section].value;
    shader.uniforms.uIntroScrollProgress.value = motion.intro.value;
    shader.uniforms.uOutroScrollProgress.value = motion.outro.value;
    shader.uniforms.uActiveProgress.value = motion.active[section].value;
    if (tone.current === motion.dark.value) return;
    tone.current = motion.dark.value;
    shader.uniforms.uColour.value.copy(motion.dark.value > 0.5 ? PALETTE.light : LIGHT_PALETTE.light);
  });
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.active.length / 3} array={positions.active} itemSize={3} />
        <bufferAttribute attach="attributes-inactivePosition" count={positions.inactive.length / 3} array={positions.inactive} itemSize={3} />
        <bufferAttribute attach="attributes-scatteredPosition" count={positions.scattered.length / 3} array={positions.scattered} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        transparent
        depthTest={false}
        blending={AdditiveBlending}
        vertexShader={ringVert}
        fragmentShader={ringFrag}
        uniforms={{
          uTime: { value: 0 },
          uRotateAngle: { value: 0 },
          uIntroScrollProgress: { value: 0 },
          uOutroScrollProgress: { value: 0 },
          uActiveProgress: { value: 0 },
          uPointScale: { value: pointScale },
          uColour: { value: PALETTE.light.clone() },
        }}
      />
    </points>
  );
}

function cloudColours(count: number, section: Section | null) {
  const colours = new Float32Array(count * 3);
  const mid = (motion.dark.value > 0.5 ? PALETTE.mid : LIGHT_PALETTE.mid).toArray();
  const accent = section ? srgb(RINGS[section].color).toArray() : mid;
  const stride = Math.floor(Math.random() * 6) + 4;
  for (let i = 0; i < count; i++) colours.set(section && i % stride === 0 ? accent : mid, i * 3);
  return colours;
}

function Cloud({ mobile }: { mobile: boolean }) {
  const count = mobile ? 36 : 72;
  const material = useRef<ShaderMaterial>(null);
  const coloursAttr = useRef<BufferAttribute>(null);
  const painted = useRef<Section | null | undefined>(undefined);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = MathUtils.randFloatSpread(360);
      const phi = MathUtils.randFloatSpread(360);
      data.set(
        [3 * Math.sin(theta) * Math.cos(phi), 3 * Math.sin(theta) * Math.sin(phi), 3 * Math.cos(theta) + Math.random() * 0.5 - 0.25],
        i * 3,
      );
    }
    return data;
  }, [count]);
  const colours = useMemo(() => cloudColours(count, null), [count]);
  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = motion.reduced ? 0 : clock.elapsedTime;
    if (!coloursAttr.current || painted.current === motion.section) return;
    painted.current = motion.section;
    (coloursAttr.current.array as Float32Array).set(cloudColours(count, motion.section));
    coloursAttr.current.needsUpdate = true;
  });
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute ref={coloursAttr} attach="attributes-colour" count={count} array={colours} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        transparent
        depthTest={false}
        blending={AdditiveBlending}
        vertexShader={cloudVert}
        fragmentShader={cloudFrag}
        uniforms={{ uTime: { value: 0 } }}
      />
    </points>
  );
}

const CORNERS: { section: Section; x: -1 | 1; y: -1 | 1; scale: number }[] = [
  { section: "purpose", x: -1, y: 1, scale: 0.34 },
  { section: "design", x: 1, y: 1, scale: 0.22 },
  { section: "engineering", x: -1, y: -1, scale: 0.16 },
  { section: "purpose", x: 1, y: -1, scale: 0.32 },
];

function CornerRings() {
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      {CORNERS.map((corner, index) => (
        <group
          key={index}
          position={[
            corner.x * (viewport.width / 2 - 0.75),
            corner.y * (viewport.height / 2 - 0.58),
            0,
          ]}
          scale={corner.scale}
        >
          <SolidRing section={corner.section} />
          <ParticleRing section={corner.section} mobile={false} pointScale={0.48} sparse />
        </group>
      ))}
    </>
  );
}

function Scene({ mobile }: { mobile: boolean }) {
  return (
    <>
      {!mobile && <PointerCamera />}
      <BackgroundPlane />
      {!mobile && <CornerRings />}
      <Cloud mobile={mobile} />
    </>
  );
}

export function PortfolioScene() {
  const [mobile, setMobile] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(query.matches);
    update();
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  useEffect(() => {
    motion.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    motion.dark.value = document.documentElement.classList.contains("dark") ? 1 : 0;
    motion.intro.value = motion.reduced ? 1 : 0;
    motion.outro.value = 0;

    const rotateTweens = motion.reduced
      ? []
      : SECTIONS.map((section) =>
        gsap.to(motion.rotate[section], {
          value: Math.PI * 2,
          duration: RINGS[section].duration,
          repeat: -1,
          ease: "none",
        }),
      );
    const progressTweens = new Map<Section, gsap.core.Tween>();

    const setSection = (next: Section | null) => {
      if (next === motion.section) return;
      const previous = motion.section;
      motion.section = next;
      if (previous) {
        progressTweens.get(previous)?.kill();
        const tween = rotateTweens[SECTIONS.indexOf(previous)];
        if (tween) gsap.to(tween, { timeScale: 1, duration: 0.5, overwrite: "auto" });
        progressTweens.set(previous, gsap.to(motion.active[previous], { value: 0, duration: 0.7, ease: "power1.out" }));
      }
      if (!next) return;
      progressTweens.get(next)?.kill();
      const tween = rotateTweens[SECTIONS.indexOf(next)];
      if (tween) gsap.to(tween, { timeScale: 6, duration: 2, overwrite: "auto" });
      progressTweens.set(
        next,
        gsap.to(motion.active[next], { value: 1, duration: 1.2, delay: 0.2, ease: "power2.in" }),
      );
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const y = window.scrollY;
        const progress = max > 0 ? y / max : 0;
        motion.intro.value = motion.reduced ? 1 : Math.min(1, y / 1000);
        motion.outro.value = progress > 0.9 ? Math.min(1, (progress - 0.9) / 0.1) : 0;
        if (motion.reduced) return;
        if (y < 1000) setSection(null);
        else if (progress < 0.42) setSection("purpose");
        else if (progress < 0.7) setSection("design");
        else if (progress < 0.9) setSection("engineering");
        else setSection(null);
      });
    };

    const observer = new MutationObserver(() => {
      motion.dark.value = document.documentElement.classList.contains("dark") ? 1 : 0;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const onVisibility = () => {
      const shown = document.visibilityState === "visible";
      setVisible(shown);
      if (shown) gsap.globalTimeline.resume();
      else gsap.globalTimeline.pause();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      gsap.globalTimeline.resume();
      rotateTweens.forEach((tween) => tween.kill());
      progressTweens.forEach((tween) => tween.kill());
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.section = null;
    };
  }, []);

  return (
    <Canvas
      className="!fixed inset-0 -z-20"
      dpr={mobile ? 1 : [1, 1.15]}
      frameloop={visible ? "always" : "never"}
      flat
      camera={{ position: [0, 0, 5], fov: 60, far: 20, near: 0.001 }}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: mobile ? "low-power" : "default",
      }}
      performance={{ min: 0.6 }}
      style={{ pointerEvents: "none" }}
    >
      <Scene mobile={mobile} />
    </Canvas>
  );
}
