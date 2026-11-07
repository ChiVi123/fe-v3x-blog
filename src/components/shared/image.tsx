"use client";

import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { type SyntheticEvent, useState } from "react";
import { optimizeCloudinaryUrl } from "~/lib/utils";

export interface ImageProps extends NextImageProps {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK_SRC = "/placeholder-image.jpg";

export function Image({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  unoptimized,
  width,
  onError,
  ...props
}: ImageProps) {
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  // Reset error state if src prop changes (e.g. dynamic image switching or hover preview)
  if (prevSrc !== src) {
    setPrevSrc(src);
    setHasError(false);
  }

  // 1. Determine active source: switch to fallbackSrc if error occurred or src is empty
  const targetSrc = hasError || !src ? fallbackSrc : src;
  const rawUrl = typeof targetSrc === "string" ? targetSrc : (targetSrc as { src?: string })?.src || "";

  // 2. Check if the currently active image is from Cloudinary
  const isCloudinary = rawUrl.includes("res.cloudinary.com");

  // 3. For Cloudinary, inject f_auto,q_auto and optional width resize; otherwise use targetSrc directly
  const displaySrc = isCloudinary ? optimizeCloudinaryUrl(rawUrl, width) : targetSrc;

  // 4. Bypass Next.js server optimization for Cloudinary (direct CDN load), or honor explicit unoptimized prop
  const shouldBypassOptimization = unoptimized ?? isCloudinary;

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const originalUrl = typeof src === "string" ? src : (src as { src?: string })?.src || "unknown";
    console.error(`[Image Error] Failed to load image from "${originalUrl}". Falling back to "${fallbackSrc}".`, e);

    if (!hasError) {
      setHasError(true);
    }

    onError?.(e);
  };

  return (
    <NextImage
      src={displaySrc}
      alt={alt}
      width={width}
      unoptimized={shouldBypassOptimization}
      onError={handleError}
      {...props}
    />
  );
}

export default Image;
