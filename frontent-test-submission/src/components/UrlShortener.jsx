import { useState } from "react";

function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState("");

  async function handleSubmit() {
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
    setResult(data.shortlink);
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