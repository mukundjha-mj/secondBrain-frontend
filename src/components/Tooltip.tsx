import { useState } from 'react';
import type { ReactNode } from 'react';

interface TooltipProps {
    content: string;
    children: ReactNode;
    show?: boolean;
}

export const Tooltip = ({ content, children, show = true }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    if (!show) {
        return <>{children}</>;
    }

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            {isVisible && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-50">
                    <div className="px-3 py-2 text-sm font-medium rounded-lg shadow-lg border whitespace-nowrap"
                         style={{
                             backgroundColor: 'var(--popover)',
                             borderColor: 'var(--border)',
                             color: 'var(--popover-foreground)'
                         }}>
                        {content}
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45"
                             style={{ backgroundColor: 'var(--popover)' }}>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
