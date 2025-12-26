import React from 'react';

export const IconWrapper = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
    >
        {children}
    </svg>
);

export const Atom = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <IconWrapper className={className} style={style}>
        <circle cx="12" cy="12" r="1" />
        <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
        <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </IconWrapper>
);

export const Brain = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </IconWrapper>
);

export const MessageSquare = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </IconWrapper>
);

export const Target = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </IconWrapper>
);

export const CheckCircle2 = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
    </IconWrapper>
);

export const XCircle = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
    </IconWrapper>
);

export const ChevronRight = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="m9 18 6-6-6-6" />
    </IconWrapper>
);

export const BarChart3 = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
    </IconWrapper>
);

export const Zap = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </IconWrapper>
);

export const Send = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <line x1="22" x2="11" y1="2" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </IconWrapper>
);

export const User = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </IconWrapper>
);

export const Library = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="m16 6 4 14" />
        <path d="M12 6v14" />
        <path d="M8 8v12" />
        <path d="M4 4v16" />
    </IconWrapper>
);

export const Play = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <polygon points="5 3 19 12 5 21 5 3" />
    </IconWrapper>
);

export const Repeat = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </IconWrapper>
);

export const GraduationCap = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </IconWrapper>
);

export const Layers = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </IconWrapper>
);

export const BrainCircuit = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M9 13a3 3 0 1 06 0" />
        <path d="M11.8 19.8 12 18" />
        <path d="m15.5 17.5-.5-2" />
        <path d="m8.5 17.5.5-2" />
        <path d="m6 13 2 .5" />
        <path d="m18 13-2 .5" />
        <path d="m9 9.5-.5-2" />
        <path d="m15 9.5.5-2" />
        <path d="m12 8V5" />
    </IconWrapper>
);

export const MessageCircle = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </IconWrapper>
);

export const Microscope = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M6 18h8" />
        <path d="M3 22h18" />
        <path d="M14 22a7 7 0 1 0 0-14h-1" />
        <path d="M9 14h2" />
        <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
        <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </IconWrapper>
);

export const Rocket = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </IconWrapper>
);

export const ArrowRight = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </IconWrapper>
);
// ... existing icons ...

export const Users = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconWrapper>
);

export const BookOpen = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </IconWrapper>
);

export const Tablet = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <line x1="12" x2="12.01" y1="18" y2="18" />
    </IconWrapper>
);

export const Bot = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <rect width="18" height="10" x="3" y="11" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" x2="8" y1="16" y2="16" />
        <line x1="16" x2="16" y1="16" y2="16" />
    </IconWrapper>
);

export const Phone = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconWrapper>
);
export const Pen = ({ className }: { className?: string }) => (
    <IconWrapper className={className}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </IconWrapper>
);
