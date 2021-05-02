import React from "react";

import axios from "axios";

import "./Graph.css";

import { Bar } from "@reactchartjs/react-chart.js";

import { cs } from "date-fns/locale";
import {
  Divider,
  Select,
  Typography,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { getQuarter, getMonth } from "date-fns";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

const Graph = ({ upcomingRefresh, token, graphBody, setGraphBody }) => {
  const [serverData, setServerData] = React.useState([]);
  const [months, setMonths] = React.useState(12);
  const [actualQuarter, setActualQuarter] = React.useState(
    getQuarter(new Date())
  );
  const monthsByQuarters = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ];

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async function fetchData() {
    await axios
      .get("/api/user/orders", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        setServerData(res.data);
      });
  }

  React.useEffect(() => {
    fetchData();
    setActualQuarter(getQuarter(new Date()));
  }, [upcomingRefresh]);

  React.useEffect(() => {
    if (!graphBody)
      document.getElementById("graphBody").classList.add("hidden");
  }, []);

  const data = {
    labels: serverData.filter((a) => {
      if(Number(months) === 3)
        return monthsByQuarters[actualQuarter - 1].includes(a.month) ? true : false;
      else 
        return true;
    }).map((a, index) => {
      if (Number(months) === 3){
        return cs.localize.month(
          monthsByQuarters[actualQuarter - 1][index] - 1
        )
      }
      else return a.month;
    }),
    datasets: [
      {
        data: serverData
          .filter((a) => {
            if (Number(months) === 3)
              return monthsByQuarters[actualQuarter - 1].includes(a.month);
            else return true;
          })
          .map((a) => {
            return a.total;
          }),
        backgroundColor: serverData
          .filter((a) => {
            if (Number(months) === 3)
              return monthsByQuarters[actualQuarter - 1].includes(a.month);
            else return true;
          })
          .map((a) => {
            switch(a.month % 3){
              case 1:
                if(a.total < 119000) return "rgb(16, 156, 241, 0.7)"
                else return "rgba(74, 175, 5, 0.7)";
              case 2:
                if(a.total < 119000) return "rgb(16, 156, 241, 0.7)"
                else return "rgba(74, 175, 5, 0.7)";
              case 0:
                if(a.total < 160000) return "rgb(16, 156, 241, 0.7)"
                else return "rgba(74, 175, 5, 0.7)";
              default:
                return "rgba(255, 255, 255, 0.7)"
            }
          }
        ),
        borderColor: serverData
        .filter((a) => {
          if (Number(months) === 3)
            return monthsByQuarters[actualQuarter - 1].includes(a.month);
          else return true;
        })
        .map((a) => {
          switch(a.month % 3){
            case 1:
              if(a.total < 119000) return "rgb(16, 156, 241, 1)"
              else return "rgba(74, 175, 5, 1)";
            case 2:
              if(a.total < 119000) return "rgb(16, 156, 241, 1)"
              else return "rgba(74, 175, 5, 1)";
            case 0:
              if(a.total < 160000) return "rgb(16, 156, 241, 1)"
              else return "rgba(74, 175, 5, 1)";
            default:
              return "rgba(255, 255, 255, 1)"
          }
        }
      ),
        borderWidth: 1,
      },
    ],
  };

  const calculatedDataTotal = serverData
    .filter((a) => {
      if (Number(months) === 3)
        return monthsByQuarters[actualQuarter - 1].includes(a.month);
      else return true;
    })
    .map((a) => a.total)
    .reduce((a, b) => a + b, 0);

  const dataTotal = {
    labels: ["celkem"],
    datasets: [
      {
        data: [calculatedDataTotal],
        backgroundColor: calculatedDataTotal < 398000 ? "rgb(16, 156, 241, 0.7)" : "rgba(74, 175, 5, 0.7)",
        borderColor: calculatedDataTotal < 398000 ? "rgb(16, 156, 241, 1)" : "rgba(74, 175, 5, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          if (Number(months) === 3)
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
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            suggestedMax: 398000,
          },
        },
      ],
    },
  };

  const handleMonthsChange = (event) => {
    setMonths(event.target.value);
  };

  const showGraphBody = () => {
    document.getElementById("graphBody").classList.remove("hidden");
    setGraphBody(true);
  };

  const hideGraphBody = () => {
    document.getElementById("graphBody").classList.add("hidden");
    setGraphBody(false);
  };

  return (
    <>
      <div className="graph-header">
        <div style={{ display: "contents" }}>
          <Typography variant="h5" style={{ overflow: "hidden"}}>Podepsané objednávky</Typography>
          {!graphBody ? (
            <IconButton size="small" onClick={showGraphBody}>
              <KeyboardArrowDown></KeyboardArrowDown>
            </IconButton>
          ) : (
            <IconButton size="small" onClick={hideGraphBody}>
              <KeyboardArrowUp></KeyboardArrowUp>
            </IconButton>
          )}
        </div>
        <div style={{ display: "contents" }}>
          {graphBody && (
            <>
              Zobrazit:
              <Select
                className="graph-select"
                value={months}
                onChange={handleMonthsChange}
              >
                <MenuItem value={12}>rok</MenuItem>
                <MenuItem value={3}>kvartál</MenuItem>
              </Select>
            </>
          )}
        </div>
      </div>
      {graphBody && <Divider />}
      <div id="graphBody" className="graph-body">
        {Number(months) === 3 && (
          <>
            <div className="narrow">
              <Bar
                data={dataTotal}
                options={optionsTotal}
                height={200}
              />
            </div>
            <div className="wide">
              <Bar data={data} options={options} height={200} redraw/>
            </div>
          </>
        )}
        {Number(months) === 12 && (
          <div className="wide">
            <Bar data={data} options={options} height={200} redraw/>
          </div>
        )}
      </div>
    </>
  );
};

export default Graph;
