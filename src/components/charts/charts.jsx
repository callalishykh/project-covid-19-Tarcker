import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import styles from "./charts.module.css";
import { Line, Bar } from "react-chartjs-2";

const Charts = ({ country, data: { confirmed, deaths, recovered } }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetchDailyData();
      setDailyData(data);
    };

    fetchApi();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            fill: true,
            borderColor: "#3333ff",
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            fill: true,
            borderColor: "#3333ff",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}> {country ? barChart : lineChart}</div>
  );
};

export default Charts;
