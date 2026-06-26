async function Log(stack, level, packageName, message) {
  const payload = {
    stack,
    level,
    package: packageName,
    message,
    time: new Date()
  };

  try {
    const res = await fetch("http://localhost:4000/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.text();
    console.log("Full log payload sent:", JSON.stringify(payload, null, 2));
    console.log("Server response:", data);
  } catch (error) {
    console.log("Logger fallback payload:", JSON.stringify(payload, null, 2));
    console.error("Logger error:", error);
  }
}

if (typeof module !== "undefined") {
  module.exports = Log;
}