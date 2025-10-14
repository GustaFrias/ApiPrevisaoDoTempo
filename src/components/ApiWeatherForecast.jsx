import React, { useEffect, useState } from "react";

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&timezone=auto";

export default function WeatherForecast() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData({
          temperature: data.current_weather.temperature,
          windSpeed: data.current_weather.wind_speed,
          windDirection: data.current_weather.wind_direction,
          weatherCode: data.current_weather.weathercode,
          time: data.current_weather.time,
        });
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 350,
        margin: "40px auto",
        padding: 20,
        background:
          "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        borderRadius: 20,
        boxShadow: "0 12px 20px rgba(102, 166, 255, 0.6)",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      {!weatherData ? (
        <p style={{ fontSize: 18 }}>Carregando dados do tempo...</p>
      ) : (
        <>
          <h2 style={{ marginBottom: 10, fontWeight: "bold" }}>
            Clima Atual em Berlin
          </h2>
          <p style={{ fontSize: 48, margin: "10px 0" }}>
            {weatherData.temperature}°C
          </p>
          <p style={{ margin: "8px 0", fontSize: 18 }}>
            <strong>Vento:</strong> {weatherData.windSpeed} km/h{" "}
            <span style={{ fontStyle: "italic", fontSize: 14 }}>
              ({weatherData.windDirection}°)
            </span>
          </p>
          <p style={{ margin: "8px 0", fontSize: 16 }}>
            <strong>Código do Tempo:</strong> {weatherData.weatherCode}
          </p>
          <p style={{ fontSize: 14, marginTop: 20 }}>
            Atualizado em: {new Date(weatherData.time).toLocaleTimeString()}
          </p>
        </>
      )}
    </div>
  );
}
