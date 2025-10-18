import React, { useEffect, useState } from "react";

const API_URL = "https://api.carbonintensity.org.uk/intensity/date"; // update URL accordingly

export default function PowerIntensityForecast() {
  const [intensityData, setIntensityData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // Adapted to the new API structure where data is in data array
        setIntensityData(data.data);
      })
      .catch(err => {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao carregar dados.");
      });
  }, []);

  return (
    <>
      <h2
        style={{
          marginBottom: 5,
          fontWeight: "bold",
          textAlign: "center",
          color: "#fff",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Previsão de Intensidade de Energia
      </h2>
      <div
        style={{
          maxWidth: 1500,
          padding: 20,
          margin: "0 auto 20px auto",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#fff",
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {error ? (
          <p style={{ fontSize: 18 }}>{error}</p>
        ) : !intensityData ? (
          <p style={{ fontSize: 18 }}>Carregando dados da intensidade...</p>
        ) : (
          intensityData.map((entry, index) => (
            <div
              key={index}
              style={{
                background:
                  entry.intensity.index === "high"
                    ? "linear-gradient(135deg, #ff6a6a 0%, #ff0000 100%)"
                    : entry.intensity.index === "moderate"
                    ? "linear-gradient(135deg, #ffd966 0%, #ffb700 100%)"
                    : "linear-gradient(135deg, #6aff6a 0%, #00ff00 100%)",
                borderRadius: 20,
                boxShadow: "0 12px 20px rgba(255, 102, 102, 0.6)",
                padding: 20,
                minWidth: 220,
                flex: "1 1 220px",
                color: "#fff",
              }}
            >
              <h3 style={{ margin: "0 0 8px" }}>
                {new Date(entry.from).toLocaleString()} -{" "}
                {new Date(entry.to).toLocaleTimeString()}
              </h3>
              <p style={{ fontSize: 24, margin: "4px 0" }}>
                Previsão: {entry.intensity.forecast}
              </p>
              <p style={{ fontSize: 20, margin: "4px 0" }}>
                Real:{" "}
                {entry.intensity.actual !== null
                  ? entry.intensity.actual
                  : "Dados não disponíveis"}
              </p>
              <p style={{ fontSize: 16, margin: 0, fontWeight: "bold" }}>
                Índice: {entry.intensity.index}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
