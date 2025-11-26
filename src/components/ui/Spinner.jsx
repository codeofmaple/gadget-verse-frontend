'use client';

export default function Spinner({ size = 48 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
            </defs>

            {/* circular arc */}
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="url(#spinnerGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="60 140"
            />
        </svg>
    );
}
