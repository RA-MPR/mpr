import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import CompanyNew from "./CompanyNew/CompanyNew";
// eslint-disable-next-line
import CompanyList from "./CompanyList/CompanyList";
import "./CompanyPage.css";

function CompanyPage() {
  return (
    <div className="root">
      <Grid container justify="center" spacing={2}>
        <Grid item xs={8}>
          <Paper style={{ padding: 16 }}>
            <div>
              <CompanyNew />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <h1>Graf</h1>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <h1>připomínky</h1>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default CompanyPage;
