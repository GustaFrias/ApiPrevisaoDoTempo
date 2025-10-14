import React from "react";
import ApiWeatherForecast from "../components/ApiWeatherForecast"

export default function Home() {
    return (
        <section>
            <h2 style={{ textAlign: "center", padding: 20}}>Jornal De Alagoas</h2>
            <h3 style={{ textAlign: "center", padding: 20}}>Apresentador: Gustavo Frias</h3>
            <h4 style={{ textAlign: "center", padding: 20}}>Estamos com a proposta de falar de uma capital do mundo a cada mês! A escolhida deste mês é BERLIN</h4>
        <ApiWeatherForecast />
        </section>
    )
}