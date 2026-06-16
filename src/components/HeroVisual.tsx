"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const LOGO_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
  <path fill-rule="evenodd" d="M292.722,796.139q-59.4,0-109.456-20.752T96.8,717.2q-36.411-37.433-56.763-89.519T19.691,512.529V487.708q0-62.655,20.345-114.949T96.8,282.834q36.421-37.632,86.873-58.39T294.35,203.692H485.186V796.139H292.722Zm1.628-482.177q-63.068,0-96.029,43.538T165.362,486.9v25.634q0,86.27,32.959,130.005t94.4,43.742h49.642V313.962H294.35Z" />
  <path d="M980.308,203.413h-495.2v110.27H659.67V795.861H802.492V313.683H980.308V203.413Z" />
</svg>`;

const ANIMATION_MS = 5500;
const INITIAL_DELAY_MS = 4500;
const BETWEEN_DELAY_MS = 4500;
const PHASE_SPLIT = 0.58;
const SPRING_IDLE = 0.1;
const SPRING_HOVER = 0.2;
const SPRING_EXIT = 0.12;
const COLOR_LERP = 0.12;

type AutoPhase = "initial-delay" | "playing" | "between-delay";

type ThemeTokens = {
  accent: string;
  foreground: string;
  isDark: boolean;
};

function readTheme(): ThemeTokens {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  return {
    accent: styles.getPropertyValue("--token-accent").trim() || "#2997ff",
    foreground: styles.getPropertyValue("--token-foreground").trim() || "#f5f5f7",
    isDark: root.getAttribute("data-theme") !== "light",
  };
}

/** One slow revolution, then two fast revolutions — same total cycle. */
function autoRotationY(progress: number): number {
  if (progress < PHASE_SPLIT) {
    const p = progress / PHASE_SPLIT;
    return d3.easeSinInOut(p) * Math.PI * 2;
  }
  const p = (progress - PHASE_SPLIT) / (1 - PHASE_SPLIT);
  return Math.PI * 2 + d3.easeCubicOut(p) * Math.PI * 4;
}

function orbitLights(progress: number, hovering: boolean, nx: number, ny: number) {
  if (hovering) {
    return {
      key: new THREE.Vector3(nx * 9, -ny * 9, 5),
      fill: new THREE.Vector3(-nx * 5, ny * 4, 4),
      rim: new THREE.Vector3(nx * 3, ny * 6, -3),
    };
  }

  const a = progress * Math.PI * 2;
  const b = progress * Math.PI * 5.5;
  return {
    key: new THREE.Vector3(Math.cos(b) * 7.5, Math.sin(a) * 5.5, Math.sin(b) * 3.5 + 4),
    fill: new THREE.Vector3(Math.cos(a + Math.PI) * 6, Math.sin(b * 0.8) * 4, 5),
    rim: new THREE.Vector3(Math.sin(a * 1.4) * 4, Math.cos(b) * 5, -4),
  };
}

function buildLogoGroup(material: THREE.MeshPhysicalMaterial): THREE.Group {
  const loader = new SVGLoader();
  const { paths } = loader.parse(LOGO_SVG);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 68,
    bevelEnabled: true,
    bevelThickness: 9,
    bevelSize: 5,
    bevelSegments: 5,
    curveSegments: 16,
  };

  const meshGroup = new THREE.Group();

  for (const path of paths) {
    for (const shape of SVGLoader.createShapes(path)) {
      meshGroup.add(new THREE.Mesh(new THREE.ExtrudeGeometry(shape, extrudeSettings), material));
    }
  }

  const svgScale = 0.0042;
  meshGroup.scale.set(svgScale, -svgScale, svgScale);
  meshGroup.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(meshGroup);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  meshGroup.position.set(-center.x, -center.y, -center.z);

  const root = new THREE.Group();
  root.add(meshGroup);

  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) root.scale.setScalar(2.5 / maxDim);

  return root;
}

function logoColorForTheme(theme: ThemeTokens): THREE.Color {
  if (theme.isDark) {
    return new THREE.Color(theme.accent);
  }
  return new THREE.Color(theme.foreground);
}

function applyThemeToScene(
  theme: ThemeTokens,
  material: THREE.MeshPhysicalMaterial,
  targetLogoColor: THREE.Color,
  lights: {
    ambient: THREE.AmbientLight;
    fill: THREE.DirectionalLight;
    rim: THREE.DirectionalLight;
    key: THREE.PointLight;
    accent: THREE.PointLight;
  }
) {
  targetLogoColor.copy(logoColorForTheme(theme));
  const accent = new THREE.Color(theme.accent);

  if (theme.isDark) {
    material.metalness = 0.9;
    material.roughness = 0.11;
    material.clearcoatRoughness = 0.05;
    material.emissive.set(theme.accent);
    material.emissiveIntensity = 0.04;
    lights.ambient.intensity = 0.2;
    lights.fill.intensity = 0.55;
    lights.fill.color.set(0xffffff);
    lights.rim.intensity = 0.45;
    lights.rim.color.set(0xddeeff);
    lights.key.intensity = 5.5;
    lights.accent.intensity = 2.2;
    lights.key.color.copy(accent);
    lights.accent.color.set(0xffffff);
  } else {
    material.metalness = 0.82;
    material.roughness = 0.18;
    material.clearcoatRoughness = 0.12;
    material.emissive.set(theme.foreground);
    material.emissiveIntensity = 0.02;
    lights.ambient.intensity = 0.55;
    lights.fill.intensity = 0.42;
    lights.fill.color.set(0xfff8f0);
    lights.rim.intensity = 0.35;
    lights.rim.color.set(0xffffff);
    lights.key.intensity = 4;
    lights.accent.intensity = 1.4;
    lights.key.color.copy(accent);
    lights.accent.color.set(0xfff4e8);
  }
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = canvasHostRef.current;
    const container = containerRef.current;
    if (!host || !container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let hovering = false;
    let phase: AutoPhase = "initial-delay";
    let phaseElapsed = 0;
    let cycleProgress = 0;
    let pausedAutoY = 0;
    let exitBlendY = 0;
    let lastTime = performance.now();
    let frameId = 0;

    const pointer = { nx: 0, ny: 0 };
    const user = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const targetLogoColor = new THREE.Color();
    const currentLogoColor = new THREE.Color();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;
    host.appendChild(renderer.domElement);

    const material = new THREE.MeshPhysicalMaterial({
      metalness: 0.9,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      reflectivity: 1,
    });

    const logo = buildLogoGroup(material);
    const logoPivot = new THREE.Group();
    logoPivot.add(logo);
    scene.add(logoPivot);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    const rim = new THREE.DirectionalLight(0xddeeff, 0.35);
    const key = new THREE.PointLight(0xffffff, 4, 30, 1.4);
    const accent = new THREE.PointLight(0xffffff, 1.5, 20, 2);

    scene.add(ambient, fill, rim, key, accent);

    const lights = { ambient, fill, rim, key, accent };
    let theme = readTheme();
    applyThemeToScene(theme, material, targetLogoColor, lights);
    currentLogoColor.copy(targetLogoColor);
    material.color.copy(currentLogoColor);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const [px, py] = d3.pointer(event, container);
      pointer.nx = px / width - 0.5;
      pointer.ny = py / height - 0.5;
      user.targetX = -pointer.ny * 1.05;
      user.targetY = pointer.nx * 1.35;
    };

    const onPointerEnter = () => {
      hovering = true;
      pausedAutoY = autoRotationY(cycleProgress);
    };

    const onPointerLeave = () => {
      hovering = false;
      user.targetX = 0;
      user.targetY = 0;
      exitBlendY = pausedAutoY + user.y;
      cycleProgress = 0;
      pausedAutoY = 0;
      phase = "between-delay";
      phaseElapsed = 0;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);

    const themeObserver = new MutationObserver(() => {
      theme = readTheme();
      applyThemeToScene(theme, material, targetLogoColor, lights);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-aesthetic"],
    });

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      currentLogoColor.lerp(targetLogoColor, COLOR_LERP);
      material.color.copy(currentLogoColor);

      const spring = hovering ? SPRING_HOVER : SPRING_IDLE;
      user.x = d3.interpolateNumber(user.x, user.targetX)(spring);
      user.y = d3.interpolateNumber(user.y, user.targetY)(spring);

      let lightProgress = 0;

      if (!hovering && !reducedMotion) {
        phaseElapsed += dt * 1000;
        exitBlendY = d3.interpolateNumber(exitBlendY, 0)(SPRING_EXIT);

        if (phase === "initial-delay") {
          logoPivot.rotation.y = exitBlendY;
          logoPivot.rotation.x = d3.interpolateNumber(logoPivot.rotation.x, 0)(SPRING_IDLE);
          logoPivot.rotation.z = d3.interpolateNumber(logoPivot.rotation.z, 0)(SPRING_IDLE);

          if (phaseElapsed >= INITIAL_DELAY_MS) {
            phase = "playing";
            phaseElapsed = 0;
            cycleProgress = 0;
          }
        } else if (phase === "playing") {
          cycleProgress = Math.min(cycleProgress + (dt * 1000) / ANIMATION_MS, 1);
          const autoY = autoRotationY(cycleProgress);
          logoPivot.rotation.y = autoY + exitBlendY;
          logoPivot.rotation.x = d3.interpolateNumber(logoPivot.rotation.x, user.x)(SPRING_IDLE);
          logoPivot.rotation.z = d3.interpolateNumber(logoPivot.rotation.z, 0)(SPRING_IDLE);
          lightProgress = cycleProgress;

          if (cycleProgress >= 1) {
            phase = "between-delay";
            phaseElapsed = 0;
            cycleProgress = 0;
            logoPivot.rotation.y = exitBlendY;
          }
        } else {
          logoPivot.rotation.y = exitBlendY;
          logoPivot.rotation.x = d3.interpolateNumber(logoPivot.rotation.x, 0)(SPRING_IDLE);
          logoPivot.rotation.z = d3.interpolateNumber(logoPivot.rotation.z, 0)(SPRING_IDLE);
          lightProgress = 0;

          if (phaseElapsed >= BETWEEN_DELAY_MS) {
            phase = "playing";
            phaseElapsed = 0;
            cycleProgress = 0;
          }
        }
      } else if (hovering) {
        logoPivot.rotation.y = pausedAutoY + user.y;
        logoPivot.rotation.x = user.x;
        logoPivot.rotation.z = d3.interpolateNumber(logoPivot.rotation.z, user.x * 0.08)(spring);
        lightProgress = cycleProgress;
      } else {
        logoPivot.rotation.y = d3.interpolateNumber(logoPivot.rotation.y, 0)(SPRING_IDLE);
        logoPivot.rotation.x = d3.interpolateNumber(logoPivot.rotation.x, user.x)(SPRING_IDLE);
      }

      const lightPos = orbitLights(lightProgress, hovering, pointer.nx, pointer.ny);
      key.position.copy(lightPos.key);
      accent.position.copy(lightPos.fill);
      rim.position.copy(lightPos.rim);

      if (hovering) {
        key.intensity = d3.interpolateNumber(
          key.intensity,
          theme.isDark ? 6.5 : 4.8
        )(0.15);
      } else {
        key.intensity = d3.interpolateNumber(
          key.intensity,
          theme.isDark ? 5.5 : 4
        )(0.08);
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      themeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      renderer.dispose();
      material.dispose();
      logo.traverse((child) => {
        if (child instanceof THREE.Mesh) child.geometry.dispose();
      });
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-visual animate-fade-up delay-200">
      <div className="hero-visual-frame hero-visual-frame--logo">
        <div ref={canvasHostRef} className="hero-visual-canvas-host" />
        <p className="hero-visual-caption">dt monogram</p>
      </div>
    </div>
  );
}
