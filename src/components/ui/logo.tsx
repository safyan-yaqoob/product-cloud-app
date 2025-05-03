"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
  linkComponent?: boolean;
  href?: string;
  variant?: 'default' | 'sidebar' | 'navbar';
  className?: string;
}

export function Logo({ 
  linkComponent = false,
  href = '/', 
  variant = 'default', 
  className 
}: LogoProps) {
  const logoSizes = {
    default: { width: 160, height: 40 },
    sidebar: { width: 120, height: 32 },
    navbar: { width: 140, height: 36 },
  };
  
  const { width, height } = logoSizes[variant];
  
  const logoContent = (
    <div className={cn("relative flex items-center h-[40px]", className)}>
      <Image
        src="/images/logo.png"
        alt="SAAS Marketplace Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
  
  // Only wrap in Link if explicitly requested
  if (linkComponent) {
    return <Link href={href}>{logoContent}</Link>;
  }
  
  return logoContent;
} 