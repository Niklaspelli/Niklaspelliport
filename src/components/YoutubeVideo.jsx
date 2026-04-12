import React from "react";
import YouTube from "react-youtube";
import LikeButton from "../LikeButton";
import GitHubStatus from "./GitHubStatus/GitHubStatus";

class YouTubeVideo extends React.Component {
  render() {
    const { videos } = this.props;

    // Videoinställningar
    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        rel: 0,
      },
    };

    // Styling-objekt
    const styles = {
      videoItem: {
        background: "rgba(20, 20, 20, 0.7)",
        border: "1px solid rgba(255, 165, 0, 0.2)",
        borderRadius: "12px",
        padding: "2rem",
        marginBottom: "4rem",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      },
      title: {
        color: "#ffa500",
        fontFamily: "'Courier New', Courier, monospace",
        textTransform: "uppercase",
        borderLeft: "4px solid #ffa500",
        paddingLeft: "15px",
        marginBottom: "2rem",
        fontSize: "1.5rem",
      },
      description: {
        color: "#ccc",
        whiteSpace: "pre-line",
        marginTop: "1.5rem",
        lineHeight: "1.6",
        fontSize: "0.95rem",
      },
      footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "1.5rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid rgba(255, 165, 0, 0.1)",
      },
      sourceTag: {
        background: "rgba(255, 165, 0, 0.1)",
        padding: "5px 12px",
        borderRadius: "4px",
        fontFamily: "monospace",
        fontSize: "0.85rem",
      },
      link: {
        color: "#ffa500",
        textDecoration: "none",
        fontWeight: "bold",
        marginLeft: "5px",
      },
    };

    return (
      <div style={{ padding: "20px 0" }}>
        {videos.map((video, index) => (
          <div key={index} style={styles.videoItem}>
            <h2 style={styles.title}>{video.title}</h2>

            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #333",
              }}
            >
              <YouTube
                videoId={video.videoId}
                opts={opts}
                onReady={this._onReady}
              />
            </div>

            <p style={styles.description}>
              <span style={{ color: "#ffa500", fontWeight: "bold" }}>
                [INFO]:{" "}
              </span>
              {video.description}
            </p>

            {/* GitHubStatus tar emot repoName som prop */}
            <div style={{ margin: "1.5rem 0" }}>
              <GitHubStatus repoName={video.repoName} />
            </div>

            <div style={styles.footer}>
              {video.sourceUrl && (
                <div style={styles.sourceTag}>
                  <span style={{ color: "#666" }}>$ fetch --source:</span>
                  <a
                    href={video.sourceUrl}
                    style={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) =>
                      (e.target.style.textShadow = "0 0 8px #ffa500")
                    }
                    onMouseLeave={(e) => (e.target.style.textShadow = "none")}
                  >
                    {video.sourceLabel || "view_code"}
                  </a>
                </div>
              )}

              {video.showLikeButton && (
                <div style={{ transform: "scale(0.9)" }}>
                  <LikeButton id={video.videoId} />
                </div>
              )}
            </div>
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
