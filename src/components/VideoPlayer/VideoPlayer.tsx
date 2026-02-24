import "./VideoPlayer.scss";

interface VideoPlayerProps {
    url: string;
    visible: boolean;
    title?: string;
}

const VideoPlayer = ({ url, visible, }: VideoPlayerProps) => {
    if (!visible) return null;

    return (
        <iframe
            title="Video de presentación de Will Only Will"
            className="youtube-container"
            src={url}
            loading="lazy"
            style={{ border: 0 }}
            allowFullScreen
        ></iframe>
    );
};

export default VideoPlayer;
