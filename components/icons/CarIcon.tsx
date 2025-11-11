
import React from 'react';

export const CarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 17H6.516a1 1 0 01-.995-.88l-1.33-6.652A1 1 0 015.186 8h13.628a1 1 0 01.995.968l-1.33 6.652A1 1 0 0117.484 17H13m-2 0h-2m-2-4h10" />
    </svg>
);
