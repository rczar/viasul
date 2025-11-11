
import React from 'react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="logoGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5e1616" />
                    <stop offset="100%" stopColor="#3a0b0b" />
                </radialGradient>
            </defs>
            <path d="M90 50 A 40 40 0 1 1 21.7 15" stroke="url(#logoGradient)" strokeWidth="12" strokeLinecap="round" />
            <path d="M75 50 A 25 25 0 1 1 33.3 28" stroke="url(#logoGradient)" strokeWidth="12" strokeLinecap="round" />
        </svg>
    );
};

export default Logo;
