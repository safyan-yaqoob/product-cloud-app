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
    default: { width: 200, height: 50 },
    sidebar: { width: 150, height: 40 },
    navbar: { width: 180, height: 45 },
  };
  
  const { width, height } = logoSizes[variant];
  
  const logoContent = (
    <div className={cn("relative flex items-center", className)}>
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