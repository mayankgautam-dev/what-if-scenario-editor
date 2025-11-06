import React from 'react';

const iconProps = {
  className: "w-8 h-8 text-purple-400",
  strokeWidth: 1.5,
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
};

// FIX: Add className prop to allow overriding styles.
export const TryOnIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.5A1.125 1.125 0 0 1 3.375 21V9.75M15.75 10.5a3 3 0 0 0-5.995-2.178M15.75 10.5h-7.5" /></svg>
);
// FIX: Add className prop to allow overriding styles.
export const RoomRedesignIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>
);
// FIX: Add className prop to allow overriding styles.
export const HairstyleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
);
// FIX: Add className prop to allow overriding styles.
export const TravelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M12.24 1.95c.162.806.162 1.623 0 2.43s-.58 1.57-1.33 2.196m4.184.382c.325.26.634.551.928.868m-8.318 0c.294-.317.603-.608.928-.868m10.134 2.218c.513.56.953 1.168 1.32 1.828m-12.77 0c.367-.66.807-1.268 1.32-1.828m12.016 4.32c.21.737.32 1.5.32 2.288m-14.636 0c0-.788.11-1.551.32-2.288M1.5 12a10.5 10.5 0 1 1 21 0 10.5 10.5 0 0 1-21 0Zm11.25 1.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75Zm-3.75 3a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5h-.008Zm5.25.008a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5h-.008Z" /></svg>
);
// FIX: Add className prop to allow overriding styles.
export const PersonaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
);
// FIX: Add className prop to allow overriding styles.
export const PetIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
);

// FIX: Add className prop to allow overriding styles.
export const MoodIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15.75s1.03-1.5 3-1.5 3 1.5 3 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25s1.03 1.5 3 1.5 3-1.5 3-1.5" />
    </svg>
);

// FIX: Add className prop to allow overriding styles.
export const ThreeDIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75l-9-5.25" />
    </svg>
);

export const DreamBuilderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.354a15.056 15.056 0 0 1-4.5 0m3.75-12.036a9.04 9.04 0 0 1-4.5 0m3.75 2.354a12.06 12.06 0 0 1-4.5 0m3.75 2.354a15.056 15.056 0 0 1-4.5 0M12 3c-1.5 0-2.846.633-3.75 1.66M12 3v2.25M12 3h.008v.008H12V3Zm-3.75 2.25a6.01 6.01 0 0 1-1.5.189m1.5-.189a6.01 6.01 0 0 0 1.5.189m-1.5-.189H8.25m1.5.189c-1.5 0-2.846.633-3.75 1.66M3.75 6h.008v.008H3.75V6Zm0 3.75a6.01 6.01 0 0 1-1.5-.189m1.5.189a6.01 6.01 0 0 0-1.5-.189m1.5.189v-2.25m-1.5 2.25c-1.5 0-2.846.633-3.75 1.66M3.75 9.75h.008v.008H3.75V9.75Zm0 3.75a6.01 6.01 0 0 1-1.5-.189m1.5.189a6.01 6.01 0 0 0-1.5-.189m1.5.189v-2.25m-1.5 2.25c-1.5 0-2.846.633-3.75 1.66M3.75 13.5h.008v.008H3.75V13.5Zm0 3.75a6.01 6.01 0 0 1-1.5-.189m1.5.189a6.01 6.01 0 0 0-1.5-.189m1.5.189v-2.25m-1.5 2.25c1.5 0 2.846-.633 3.75-1.66m-3.75 1.66h.008v.008H3.75V17.25Zm0-3.75a6.01 6.01 0 0 1 1.5.189m-1.5-.189a6.01 6.01 0 0 0 1.5.189m-1.5-.189H4.5m-3 3.75a6.01 6.01 0 0 1 1.5.189m-1.5-.189a6.01 6.01 0 0 0 1.5.189m-1.5-.189v2.25m1.5-2.25c1.5 0 2.846-.633 3.75-1.66M1.5 13.5h.008v.008H1.5V13.5Zm0-3.75a6.01 6.01 0 0 0-1.5-.189m1.5.189a6.01 6.01 0 0 1-1.5-.189m1.5.189V7.5m1.5 2.25c-1.5 0 2.846-.633 3.75-1.66M1.5 9.75h.008v.008H1.5V9.75Zm0-3.75a6.01 6.01 0 0 0-1.5-.189m1.5.189a6.01 6.01 0 0 1-1.5-.189M1.5 6V3.75m0 2.25c0-1.5.633-2.846 1.66-3.75M1.5 6h2.25m0 0a6.01 6.01 0 0 0-1.5.189m1.5-.189a6.01 6.01 0 0 1-1.5-.189m1.5-.189V3.75m1.5 2.25c-1.5 0-2.846.633-3.75-1.66M3.75 3.75h.008v.008H3.75V3.75Zm16.5 0c1.5 0 2.846.633 3.75 1.66m-3.75-1.66v2.25m-3.75-2.25h.008v.008H16.5V3.75Zm3.75 2.25a6.01 6.01 0 0 1 1.5.189m-1.5-.189a6.01 6.01 0 0 0 1.5.189m-1.5-.189H19.5m-1.5.189c1.5 0 2.846.633 3.75 1.66m-3.75-1.66H18m.008 3.75h.008v.008H18V7.5Zm3 0a6.01 6.01 0 0 1 1.5.189m-1.5-.189a6.01 6.01 0 0 0 1.5.189m-1.5-.189v2.25m1.5-2.25c1.5 0 2.846.633 3.75 1.66M20.25 9.75h.008v.008H20.25V9.75Zm0 3.75a6.01 6.01 0 0 1 1.5.189m-1.5-.189a6.01 6.01 0 0 0 1.5.189m-1.5-.189v2.25m1.5-2.25c1.5 0 2.846.633 3.75 1.66M20.25 13.5h.008v.008H20.25V13.5Zm0 3.75a6.01 6.01 0 0 1 1.5.189m-1.5-.189a6.01 6.01 0 0 0 1.5.189m-1.5-.189v2.25m1.5-2.25c-1.5 0-2.846.633-3.75 1.66m3.75-1.66h-.008v.008H20.25V17.25Zm0-3.75a6.01 6.01 0 0 1-1.5-.189m1.5.189a6.01 6.01 0 0 0-1.5-.189m1.5.189H18m3 3.75a6.01 6.01 0 0 1-1.5-.189m1.5.189a6.01 6.01 0 0 0-1.5-.189m1.5.189v-2.25m-1.5 2.25c-1.5 0-2.846.633-3.75 1.66M22.5 13.5h-.008v.008H22.5V13.5Zm0-3.75a6.01 6.01 0 0 1-1.5-.189m1.5.189a6.01 6.01 0 0 0-1.5-.189m1.5.189V7.5m-1.5 2.25c-1.5 0-2.846.633-3.75 1.66M22.5 9.75h-.008v.008H22.5V9.75Zm0-3.75a6.01 6.01 0 0 1-1.5-.189m1.5.189a6.01 6.01 0 0 0-1.5-.189M22.5 6V3.75m0 2.25c0-1.5-.633-2.846-1.66-3.75M22.5 6h-2.25m0 0a6.01 6.01 0 0 1-1.5.189m-1.5-.189a6.01 6.01 0 0 0-1.5-.189m1.5.189V3.75m-1.5 2.25c-1.5 0-2.846.633-3.75-1.66M20.25 3.75h-.008v.008H20.25V3.75Z" /></svg>
);

export const PhotoUploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const RefreshIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 4v6h-6"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
);

export const ResetIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0m0 0c1.863-1.863 1.863-4.887 0-6.75s-4.887-1.863-6.75 0-1.863 4.887 0 6.75" />
    </svg>
);

export const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.73c-1.126 0-2.036.954-2.036 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.042m-7.416 0v3.042c0 .212.03.418.084.612m7.332 0-1.261 6.305A2.25 2.25 0 0 1 15.53 15h-5.06a2.25 2.25 0 0 1-2.244-2.244L7.125 5.13m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V7.22c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
);

export const RightArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

export const SlidersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
);

export const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);