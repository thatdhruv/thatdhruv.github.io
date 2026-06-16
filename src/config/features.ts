/**
 * Feature flags — flip values here to change behavior without touching layout.
 */
export const features = {
  /**
   * Visual skin applied via data-aesthetic on <html>.
   * Options: "refined" | "aqua2" | "neon"
   */
  aesthetic: "refined" as "refined" | "aqua2" | "neon",

  /** Animated gradient visual in the hero (right column) */
  heroVisual: true,

  /** Animated D3-style telemetry chart in the hero (disabled by default) */
  heroChart: false,

  /** Light / dark mode toggle in the navbar */
  lightModeToggle: true,
} as const;

export type Aesthetic = (typeof features)["aesthetic"];
