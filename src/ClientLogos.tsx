import React from "react";

// ============================================================================
// 4WAYS MEDIA BESPOKE SCRIPT LOGO
// ============================================================================
export function FourWaysLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none py-1 ${className}`}>
      <span className="font-script text-3xl sm:text-4xl font-bold tracking-wide leading-tight">
        4ways media
      </span>
    </div>
  );
}

// ============================================================================
// MONOCHROMATIC CLIENT LOGOS (SCALE, ENS, WISCHOFF, KLARITY, RHO, PARADIGM, RAMP, LINEAR)
// ============================================================================

export function ScaleLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 4h4v16H0V4zm6 0h4v16H6V4zm6 0h4v16h-4V4zm16.5 4.5c-3.5 0-6 2.5-6 6s2.5 6 6 6c2.5 0 4.5-1.2 5.5-3.2l-3.8-1.8c-.5 1-1.2 1.5-2.2 1.5-1.5 0-2.5-1-2.5-2.5h9c.1-.4.1-.7.1-1 0-3-2.5-5-6.1-5zm-2.8 4.2c.2-1.2 1.2-2 2.7-2s2.5.8 2.7 2h-5.4z" />
      <text x="46" y="17.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" letterSpacing="1.5">SCALE</text>
    </svg>
  );
}

export function EnsLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 17.5L9.5 6.5h4L8 17.5H4zm8-11h4l5.5 11h-4L12 6.5zm-8 5.5h16v3H4v-3z" opacity="0.9" />
      <text x="32" y="17.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16" letterSpacing="2.5">ENS</text>
    </svg>
  );
}

export function WischoffLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 215 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="18" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="900" fontSize="21" letterSpacing="0">W</text>
      <text x="24" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="13" letterSpacing="3">WISCHOFF</text>
      <text x="124" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="400" fontSize="11" letterSpacing="2.5" opacity="0.8">VENTURES</text>
    </svg>
  );
}

export function KlarityLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 115 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="12" r="5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <text x="22" y="17.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" letterSpacing="2.5">KLARITY</text>
    </svg>
  );
}

export function RhoLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4h8c4 0 7 2.5 7 6s-3 6-7 6H9v4H5V4zm4 8h4c1.8 0 3-1 3-2s-1.2-2-3-2H9v4z" />
      <text x="28" y="17.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16" letterSpacing="3">RHO</text>
    </svg>
  );
}

export function ParadigmLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 145 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm4 0a6 6 0 1 0 12 0 6 6 0 0 0-12 0zm3 0a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fillRule="evenodd" />
      <text x="32" y="17.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" letterSpacing="3">PARADIGM</text>
    </svg>
  );
}

export function RampLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 95 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 18L12 6h8l-10 12H2z" />
      <text x="28" y="17.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="16" letterSpacing="1.2">ramp</text>
    </svg>
  );
}

export function LinearLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm0 3a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6z" />
      <text x="26" y="17.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="15" letterSpacing="1">Linear</text>
    </svg>
  );
}
