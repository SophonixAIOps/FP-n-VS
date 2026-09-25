import type { NextConfig } from "next";

/**
 * Nothing to configure, and that is worth saying once.
 *
 * An `images` block used to sit here — formats, `remotePatterns`, `deviceSizes`,
 * `imageSizes` — and not one line of it ever ran. That block configures
 * `next/image` and the built-in Image Optimization API, and this site renders
 * neither: every frame is a hand-rolled `<picture>` with two art-directed
 * sources, because `next/image` emits a single `<img>` and cannot vary its
 * source by media query.
 *
 * Config that looks load-bearing but is inert is worse than no config, because
 * the next person tunes it and wonders why nothing moves. The widths, the
 * format negotiation and the Unsplash host all live in `src/lib/images.ts`,
 * which is where they actually take effect.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
