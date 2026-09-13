export const SCENE_CONFIG = {
  colors: {
    charcoal: "#0E100F",
    anthracite: "#2A2D2B",
    pineGreen: "#1F3329",
    burntOrange: "#C1622D",
    stoneGray: "#C9C5BC",
    ivory: "#EDE8DE",
  },
  camera: {
    fov: 42,
    near: 0.1,
    far: 100,
    defaultPosition: [0, 0, 8.5] as [number, number, number],
  },
  sections: [
    { id: "hero", cameraZ: 8.5, cameraY: 0, targetY: 0 },
    { id: "numbers", cameraZ: 9.0, cameraY: -0.5, targetY: -0.5 },
    { id: "work", cameraZ: 8.0, cameraY: -1.0, targetY: -1.0 },
    { id: "expertise", cameraZ: 9.5, cameraY: -1.2, targetY: -1.2 },
    { id: "contact", cameraZ: 11.0, cameraY: -1.5, targetY: -1.5 },
  ],
  lamellae: {
    count: 24,
    spacing: 0.14,
    height: 3.2,
    depth: 0.04,
  },
} as const;
