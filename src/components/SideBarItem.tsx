import type { ReactElement } from "react"

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
    count?: number;
    isActive?: boolean;
}

export const SideBarItem = ({ text, icon, count, isActive = false }: SideBarItemProps) => {
    return (
        <div className={`
            px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group
            ${isActive 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
            }
        `}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                        ${isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:scale-110'
                        }
                    `}>
                        {icon}
                    </div>
                    <span className={`
                        ml-3 text-sm font-medium transition-colors duration-200
                        ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
                    `}>
                        {text}
                    </span>
                </div>
                
                {count && (
                    <div className={`
                        px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200
                        ${isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                        }
                    `}>
                        {count}
                    </div>
                )}
            </div>
        </div>
    )
}