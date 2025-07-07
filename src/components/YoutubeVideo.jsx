import React from "react";
import YouTube from "react-youtube";
import LikeButton from "../LikeButton";
import "../styles.css";

class YouTubeVideo extends React.Component {
  render() {
    const { videos } = this.props;
    const opts = {
      playerVars: {
        autoplay: 0,
      },
    };

    return (
      <div className="video-container">
        {videos.map((video, index) => (
          <div className="video-item" key={index}>
            <YouTube
              videoId={video.videoId}
              opts={opts}
              onReady={this._onReady}
            />
            <p className="video-description">{video.description}</p>

            {video.sourceUrl && (
              <p className="video-source">
                Src code:{" "}
                <a
                  href={video.sourceUrl}
                  className="workLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {video.sourceLabel || "View source"}
                </a>
              </p>
            )}

            {video.showLikeButton && <LikeButton />}
          </div>
        ))}
      </div>
    );
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
}

export default YouTubeVideo;
