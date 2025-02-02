"use client"
import { useEffect } from "react";

const MarineMap: React.FC = () => {
  useEffect(() => {
    // Any additional event listeners can be added here
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="https://marinecadastre.gov/accessais/"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MarineMap;
