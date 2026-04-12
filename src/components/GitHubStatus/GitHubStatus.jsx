import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./GitHubStatus.css";

const GitHubStatus = ({ repoName }) => {
  const [lastCommit, setLastCommit] = useState(null);
  const username = "Niklaspelli";

  useEffect(() => {
    // 1. Kolla om vi redan har data i sessionStorage
    const cacheKey = `github_last_commit_${repoName}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      setLastCommit(JSON.parse(cachedData));
      return; // Avbryt useEffect här, vi behöver inte göra fetch
    }

    // 2. Om ingen cache finns, gör API-anropet
    fetch(`https://api.github.com/repos/${username}/${repoName}/commits`)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub rate limit reached");
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          const latest = data[0];
          const commitInfo = {
            date: new Date(latest.commit.author.date).toLocaleDateString(
              "sv-SE",
            ),
            message: latest.commit.message,
            url: latest.html_url,
          };

          // 3. Spara i både state och sessionStorage
          setLastCommit(commitInfo);
          sessionStorage.setItem(
            "github_last_commit",
            JSON.stringify(commitInfo),
          );
        }
      })
      .catch((err) => console.error("GitHub Fetch Error:", err));
  }, [username, repoName]);

  if (!lastCommit) return null; // Eller en diskret "System idle" text

  return (
    <motion.div
      className="github-status"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pulse-dot"></div>
      <p className="github-text">
        <span className="label">LATEST_DEPLOY:</span>
        <span className="date">{lastCommit.date}</span>
        <br />
        <a
          href={lastCommit.url}
          target="_blank"
          rel="noreferrer"
          className="commit-link"
        >
          {"> "}
          {lastCommit.message.substring(0, 35)}...
        </a>
      </p>
    </motion.div>
  );
};

export default GitHubStatus;
