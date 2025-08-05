import { TwitterIcon } from "../icons/TwitterIcon"
import { YouTubeIcon } from "../icons/YouTubeIcon"
import { PlusIcon, SearchIcon, TagIcon, MenuIcon } from "../icons"
import { SideBarItem } from "./SideBarItem"
import { Tooltip } from "./Tooltip"
import { Button } from "./Button"

interface SideBarProps {
    twitterCount?: number;
    youtubeCount?: number;
    onAddContent?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

export const SideBar = ({ 
    twitterCount = 0, 
    youtubeCount = 0, 
    onAddContent, 
    isCollapsed = false,
    onToggleCollapse 
}: SideBarProps) => {

    return (
        <>
            <div className={`border-r fixed left-0 top-16 flex flex-col z-40 transition-all duration-300 ease-in-out ${
                isCollapsed ? 'w-16' : 'w-60'
            }`}
                 style={{
                     height: 'calc(100vh - 4rem)',
                     backgroundColor: 'var(--card)',
                     borderColor: 'var(--border)'
                 }}>
                
                {/* Toggle Button */}
                <div className={`p-4 border-b flex ${isCollapsed ? 'justify-center' : 'justify-end'}`} style={{ borderColor: 'var(--border)' }}>
                    <Button 
                        variant="ghost"
                        size="sm"
                        startIcon={<MenuIcon className="w-5 h-5" />}
                        onClick={onToggleCollapse}
                    />
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-6 overflow-hidden">
                    <div className="space-y-2">
                        {!isCollapsed && (
                            <div className="px-3 py-2">
                                <h3 className="text-xs font-semibold uppercase tracking-wider transition-opacity duration-300" 
                                    style={{ color: 'var(--muted-foreground)' }}>
                                    Content Types
                                </h3>
                            </div>
                        )}
                        
                        <SideBarItem 
                            text="Twitter Posts" 
                            icon={<TwitterIcon />} 
                            count={twitterCount}
                            isActive={false}
                            isCollapsed={isCollapsed}
                        />
                        <SideBarItem 
                            text="YouTube Videos" 
                            icon={<YouTubeIcon />} 
                            count={youtubeCount}
                            isActive={false}
                            isCollapsed={isCollapsed}
                        />
                    </div>

                    {/* Additional sections */}
                    <div className="mt-8 space-y-2">
                        {!isCollapsed && (
                            <div className="px-3 py-2">
                                <h3 className="text-xs font-semibold uppercase tracking-wider transition-opacity duration-300" 
                                    style={{ color: 'var(--muted-foreground)' }}>
                                    Quick Actions
                                </h3>
                            </div>
                        )}
                        
                        <Tooltip content="Add Content" show={isCollapsed}>
                            <div className={`${isCollapsed ? 'px-0 py-2 flex justify-center' : 'px-3 py-2'} rounded-lg transition-colors duration-200 cursor-pointer group`}
                                 onClick={onAddContent}
                                 onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--muted)'}
                                 onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>
                                {isCollapsed ? (
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                                         style={{ backgroundColor: 'var(--muted)' }}>
                                        <PlusIcon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                                             style={{ backgroundColor: 'var(--muted)' }}>
                                            <PlusIcon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                                        </div>
                                        <span className="ml-3 text-sm font-medium transition-opacity duration-300" 
                                              style={{ color: 'var(--foreground)' }}>
                                            Add Content
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Tooltip>

                        <Tooltip content="Search" show={isCollapsed}>
                            <div className={`${isCollapsed ? 'px-0 py-2 flex justify-center' : 'px-3 py-2'} rounded-lg transition-colors duration-200 cursor-pointer group`}
                                 onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--muted)'}
                                 onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>
                                {isCollapsed ? (
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                                         style={{ backgroundColor: 'var(--muted)' }}>
                                        <SearchIcon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                                             style={{ backgroundColor: 'var(--muted)' }}>
                                            <SearchIcon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                                        </div>
                                        <span className="ml-3 text-sm font-medium transition-opacity duration-300" 
                                              style={{ color: 'var(--foreground)' }}>
                                            Search
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Tooltip>

                        <Tooltip content="Tags" show={isCollapsed}>
                            <div className={`${isCollapsed ? 'px-0 py-2 flex justify-center' : 'px-3 py-2'} rounded-lg transition-colors duration-200 cursor-pointer group`}
                                 onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--muted)'}
                                 onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}>
                                {isCollapsed ? (
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                                         style={{ backgroundColor: 'var(--muted)' }}>
                                        <TagIcon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                                             style={{ backgroundColor: 'var(--muted)' }}>
                                            <TagIcon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                                        </div>
                                        <span className="ml-3 text-sm font-medium transition-opacity duration-300" 
                                              style={{ color: 'var(--foreground)' }}>
                                            Tags
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    )
}