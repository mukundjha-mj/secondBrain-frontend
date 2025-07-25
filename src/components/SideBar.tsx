import { Logo } from "../icons/Logo"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YouTubeIcon } from "../icons/YouTubeIcon"
import { SideBarItem } from "./SideBarItem"

interface SideBarProps {
    twitterCount?: number;
    youtubeCount?: number;
    onAddContent?: () => void;
}

export const SideBar = ({ twitterCount = 0, youtubeCount = 0, onAddContent }: SideBarProps) => {
    return (
        <>
            <div className="h-screen bg-gradient-to-b from-slate-50 to-white border-r border-gray-200/80 w-80 fixed left-0 top-0 flex flex-col shadow-xl">
                {/* Header */}
                <div className="px-6 py-6 border-b border-gray-200/60">
                    <div className="flex text-2xl font-bold items-center group cursor-pointer">
                        <div className="pr-3 text-purple-600 group-hover:text-purple-700 group-hover:scale-110 transform transition-all duration-200">
                            <Logo />
                        </div>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            SecondBrain
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 font-medium">Your personal knowledge hub</p>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-6">
                    <div className="space-y-2">
                        <div className="px-3 py-2">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Content Types</h3>
                        </div>
                        
                        <SideBarItem 
                            text="Twitter Posts" 
                            icon={<TwitterIcon />} 
                            count={twitterCount}
                            isActive={false}
                        />
                        <SideBarItem 
                            text="YouTube Videos" 
                            icon={<YouTubeIcon />} 
                            count={youtubeCount}
                            isActive={false}
                        />
                    </div>

                    {/* Additional sections */}
                    <div className="mt-8 space-y-2">
                        <div className="px-3 py-2">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Actions</h3>
                        </div>
                        
                        <div className="px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors duration-200 cursor-pointer group" onClick={onAddContent}>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-purple-700">Add Content</span>
                            </div>
                        </div>

                        <div className="px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 cursor-pointer group">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-blue-700">Search</span>
                            </div>
                        </div>

                        <div className="px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 cursor-pointer group">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-green-700">Tags</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200/60 bg-gray-50/50">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">MJ</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">Mukund Jha</p>
                            <p className="text-xs text-gray-500">Free Plan</p>
                        </div>
                        <button className="p-1 hover:bg-gray-200 rounded-md transition-colors duration-200">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}