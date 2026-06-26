import { useState } from "react";
import * as loggerModule from "../../../logging-middleware/middleware/logger.js";

const Log = typeof loggerModule === "function" ? loggerModule : loggerModule.default || loggerModule.Log;

function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState("");

  async function handleSubmit() {
    try {
      const res = await fetch("http://localhost:3000/url/short", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url,
          shortcode,
          validity: 30
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Unable to create short URL");
        return;
      }

      setResult(data.shortlink || "");
    } catch (error) {
      setResult("Unable to reach the backend server.");
    }

    try {
      await Log("Frontend", "info", "components", "Fetch the data");
    } catch {
      // Ignore logging failures so the UI still works.
    }
  }

  return (
    <>
      <input
        placeholder="Enter URL"
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        placeholder="Shortcode"
        onChange={(e) => setShortcode(e.target.value)}
      />

      <button onClick={handleSubmit}>Create</button>

      {result && (
  <a href={result} target="_blank">
    {result}
  </a>
)}
    </>
  );
}

export default UrlShortener;