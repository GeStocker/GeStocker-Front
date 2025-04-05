"use client";

import { useTheme } from "@/context/ThemeProvider";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  imageUrls: { light: string; dark: string; rustic: string };
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const ThemeImages: React.FC<Props> = ({ imageUrls, alt, width, height, className }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Espera a que monte en el cliente

  const imageSrc = imageUrls[theme];

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ThemeImages;
