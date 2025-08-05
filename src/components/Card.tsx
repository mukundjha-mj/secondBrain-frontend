import { DeleteIcon } from "../icons";
import { ShareIcon } from "../icons/ShareIcon"
import { useEffect } from "react"
import { useDeleteContent } from "../hooks/useDeleteContent";

interface CardProps {
    _id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube",
    onRefresh?: () => void;
    // tags: 
}

export const Card = ({ _id, title, link, type, onRefresh }: CardProps) => {
    useEffect(() => {
        // Trigger Twitter widget rendering when component mounts
        if (type === 'twitter' && (window as any).twttr) {
            (window as any).twttr.widgets.load();
        }
    }, [type]);

    const { deleteContent, loading } = useDeleteContent();
    function convertYouTubeLink(link: string): string {
        if (link.includes("watch?v=")) {
            // Normal YouTube video
            return link.replace("watch?v=", "embed/");
        }
        else if (link.includes("youtube.com/shorts/")) {
            // YouTube Shorts
            return link.replace("youtube.com/shorts/", "youtube.com/embed/");
        }
        return link; // return unchanged if not matching
    }

    return (
        <div className="rounded-xl border p-4 hover:-translate-y-2 transition-all duration-300 ease-out h-fit group"
            style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
            }}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-start text-base font-medium flex-1 mr-3 transition-colors duration-200"
                    style={{ color: 'var(--foreground)' }}>
                    <div className="pr-2 mt-1 flex-shrink-0 transition-colors duration-200"
                        style={{ color: 'var(--muted-foreground)' }}>
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
                        className="transition-colors p-1"
                        style={{ color: 'var(--muted-foreground)' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--primary)'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                        <ShareIcon />
                    </a>
                    <button
                        className="transition-colors p-1 cursor-pointer disabled:opacity-50"
                        style={{ color: loading ? 'var(--muted-foreground)' : 'var(--muted-foreground)' }}
                        disabled={loading}
                        onMouseEnter={(e) => !loading && ((e.target as HTMLElement).style.color = 'var(--destructive)')}
                        onMouseLeave={(e) => !loading && ((e.target as HTMLElement).style.color = 'var(--muted-foreground)')}
                        onClick={async () => {
                            console.log("Delete button clicked for content ID:", _id);
                            try {
                                await deleteContent(_id);
                                console.log("Delete completed successfully");
                                // If delete succeeds, refresh the data
                                if (onRefresh) {
                                    console.log("Calling onRefresh to update UI");
                                    onRefresh();
                                }
                            } catch (err) {
                                // Error is already handled in the hook
                                console.error('Delete failed:', err);
                            }
                        }}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>

            <div className="content-area">
                {type === 'youtube' && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden"
                        style={{ backgroundColor: 'var(--muted)' }}>
                        <iframe
                            className={`w-full h-full`}
                            src={convertYouTubeLink(link)}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                        </iframe>
                    </div>
                )}

                {type === 'twitter' && (
                    <div className="rounded-lg p-4"
                        style={{ backgroundColor: 'var(--muted)' }}>
                        <blockquote className="twitter-tweet" data-theme="light">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </div>
                )}
            </div>
        </div>
    )
}