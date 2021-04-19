import React from "react";

import axios from "axios";

import "./Graph.css";

import { Bar } from "@reactchartjs/react-chart.js";

import { cs } from "date-fns/locale";
import { Divider, Select, Typography, MenuItem } from "@material-ui/core";

const Graph = ({ upcomingRefresh, token }) => {
  const [serverData, setServerData] = React.useState([]);
  const [months, setMonths] = React.useState(12);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async function fetchData() {
    await axios
      .get("http://127.0.0.1:8000/user/orders", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        setServerData(res.data);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, [upcomingRefresh]);

  const data = {
    labels: serverData
      .map((a) => {
        if (months == 3) return cs.localize.month(a.month - 1);
        else return a.month;
      })
      .slice(-months),
    datasets: [
      {
        data: serverData.map((a) => a.total).slice(-months),
        backgroundColor: "rgba(74, 175, 5, 0.7)",
        borderColor: "rgba(74, 175, 5, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dataTotal = {
    labels: ["celkem"],
    datasets: [
      {
        data: [
          serverData
            .map((a) => a.total)
            .slice(-3)
            .reduce((a, b) => a + b, 0),
        ],
        backgroundColor: "rgba(74, 175, 5, 0.7)",
        borderColor: "rgba(74, 175, 5, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          if (months == 3)
            return capitalize(data["labels"][tooltipItem[0]["index"]]);
          else
            return capitalize(
              cs.localize.month(data["labels"][tooltipItem[0]["index"]] - 1)
            );
        },
      },
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const optionsTotal = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const handleMonthsChange = (event) => {
    setMonths(event.target.value);
  };

  return (
    <>
      <div className="graph-header">
        <Typography variant="h5">Podepsané objednávky</Typography>
        <div>
          Zobrazit:
          <Select
            className="graph-select"
            value={months}
            onChange={handleMonthsChange}
          >
            <MenuItem value={12}>rok</MenuItem>
            <MenuItem value={3}>kvartál</MenuItem>
          </Select>
        </div>
      </div>
      <Divider />
      <div className="graph-body">
        {months == 3 && (
          <>
            <div className="narrow">
            <Bar data={dataTotal} options={optionsTotal} width={100} height={200}/></div>
            <div className="wide">
            <Bar data={data} options={options} width={300} height={200}/></div>
          </>
        )}
        {months == 12 && <div className="wide"><Bar data={data} options={options} width={400} height={200}/></div>}
      </div>
    </>
  );
};

export default Graph;
