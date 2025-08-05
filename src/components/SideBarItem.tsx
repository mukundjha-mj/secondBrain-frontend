import type { ReactElement } from "react"
import { Tooltip } from "./Tooltip"

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
    count?: number;
    isActive?: boolean;
    isCollapsed?: boolean;
}

export const SideBarItem = ({ text, icon, count, isActive = false, isCollapsed = false }: SideBarItemProps) => {
    const content = (
        <div className={`
            ${isCollapsed ? 'px-0 py-3 flex justify-center items-center' : 'px-3 py-3'} rounded-xl cursor-pointer transition-all duration-200 group
        `}
        style={{
            backgroundColor: isActive ? 'var(--primary)' : 'transparent',
            color: isActive ? 'white' : 'var(--foreground)'
        }}
        onMouseEnter={(e) => {
            if (!isActive) {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)';
            }
        }}
        onMouseLeave={(e) => {
            if (!isActive) {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            }
        }}>
            {isCollapsed ? (
                // Collapsed state - show only icon centered
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 relative"
                     style={{
                         backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--muted)',
                         color: isActive ? 'white' : 'var(--muted-foreground)'
                     }}>
                    {icon}
                    {/* Count badge for collapsed state */}
                    {count !== undefined && count > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                             style={{
                                 backgroundColor: 'var(--primary)',
                                 color: 'white',
                                 fontSize: '10px'
                             }}>
                            {count > 99 ? '99+' : count}
                        </div>
                    )}
                </div>
            ) : (
                // Expanded state - show icon and text
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                             style={{
                                 backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--muted)',
                                 color: isActive ? 'white' : 'var(--muted-foreground)'
                             }}>
                            {icon}
                        </div>
                        <span className="ml-3 text-sm font-medium transition-all duration-300"
                              style={{
                                  color: isActive ? 'white' : 'var(--foreground)'
                              }}>
                            {text}
                        </span>
                    </div>
                    
                    {count !== undefined && count > 0 && (
                        <div className="px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300"
                             style={{
                                 backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--muted)',
                                 color: isActive ? 'white' : 'var(--muted-foreground)'
                             }}>
                            {count}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <Tooltip content={text} show={isCollapsed}>
            {content}
        </Tooltip>
    )
}