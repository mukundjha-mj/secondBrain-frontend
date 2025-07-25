import { ShareIcon } from "../icons/ShareIcon"
import { useEffect } from "react"

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube",
    // tags: 
}

export const Card = ({ title, link, type }: CardProps) => {
    useEffect(() => {
        // Trigger Twitter widget rendering when component mounts
        if (type === 'twitter' && (window as any).twttr) {
            (window as any).twttr.widgets.load();
        }
    }, [type]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out h-fit group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-start text-base font-medium text-gray-900 flex-1 mr-3 group-hover:text-gray-700 transition-colors duration-200">
                    <div className="text-gray-400 pr-2 mt-1 flex-shrink-0 group-hover:text-blue-500 transition-colors duration-200">
                        <ShareIcon />
                    </div>
                    <h3 className="leading-tight overflow-hidden"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}>
                        {title}
                    </h3>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <a href={link} target="_blank" rel="noopener noreferrer" 
                       className="text-gray-400 hover:text-blue-500 transition-colors p-1">
                        <ShareIcon />
                    </a>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <ShareIcon />
                    </button>
                </div>
            </div>

            <div className="content-area">
                {type === 'youtube' && (
                    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <iframe 
                            className="w-full h-full" 
                            src={link.replace('watch', "embed").replace("?v=", "/")} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen>
                        </iframe>
                    </div>
                )}

                {type === 'twitter' && (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <blockquote className="twitter-tweet" data-theme="light">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </div>
                )}
            </div>
        </div>
    )
}