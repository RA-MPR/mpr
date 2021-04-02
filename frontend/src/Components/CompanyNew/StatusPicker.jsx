import {
  Grid,
  TextField,
  Typography,
  Paper,
  InputLabel,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import "./StatusPicker.css";

const StatusPicker = ({ customStatus, color, handleColor }) => {
  return (
    <Grid item xs={7} hidden={customStatus}>
      <Grid container justify="center" spacing={2} alignItems="center">
        <Grid item xs={10}>
          <Paper className="paperStatus" variant="outlined">
            <div style={{ padding: 5 }}>
              <Typography variant="h6">Vlastní stav</Typography>
              <TextField
                id="statusText"
                label="Název"
                name="statusText"
                required={!customStatus}
                inputProps={{ maxLength: 16 }}
              />
            </div>
            <div style={{ padding: 5 }}>
              <InputLabel id="colorsLabel">Barva</InputLabel>
              <ToggleButtonGroup
                value={color}
                exclusive
                onChange={handleColor}
                className="toggleColors"
                size="small"
                labelid="colorsLabel"
              >
                <ToggleButton
                  value={"white"}
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  Bílá
                </ToggleButton>
                <ToggleButton
                  value={"yellow"}
                  style={{ backgroundColor: "yellow", color: "black" }}
                >
                  Žlutá
                </ToggleButton>
                <ToggleButton
                  value={"green"}
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Zelená
                </ToggleButton>
                <ToggleButton
                  value={"purple"}
                  style={{ backgroundColor: "purple", color: "white" }}
                >
                  Fialová
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                value={color}
                exclusive
                onChange={handleColor}
                className="toggleColors"
                size="small"
              >
                <ToggleButton
                  value={"orange"}
                  style={{ backgroundColor: "orange", color: "black" }}
                >
                  Oranžová
                </ToggleButton>
                <ToggleButton
                  value={"red"}
                  style={{ backgroundColor: "red", color: "black" }}
                >
                  Červená
                </ToggleButton>
                <ToggleButton
                  value={"blue"}
                  style={{ backgroundColor: "blue", color: "white" }}
                >
                  Modrá
                </ToggleButton>
                <ToggleButton
                  value={"pink"}
                  style={{ backgroundColor: "pink", color: "black" }}
                >
                  Růžová
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StatusPicker;
