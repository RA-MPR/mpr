import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import CompanyNew from "./CompanyNew/CompanyNew";
// eslint-disable-next-line
import CompanyList from "./CompanyList/CompanyList";
// eslint-disable-next-line
import CompanyDetails from "./CompanyDetails/CompanyDetails";
import "./CompanyPage.css";

function CompanyPage() {

  const showNewCompanyForm = () =>{
    document.getElementById("companyList").classList.remove("show");
    document.getElementById("companyNew").classList.add("show");
  }

  const showCompanyList = () =>{
    document.getElementById("companyNew").classList.remove("show");
    document.getElementById("companyList").classList.add("show");
  }

  const showCompanyDetail = (id) =>{
    console.log("TODO Show company " + id + " detail");
  }

  return (
    <div className="root">
      <Grid container justify="center" spacing={2} style={{width:"100%"}}>
        <Grid item xs={8}>
          <Paper style={{ padding: 16 }}>
            <div className="company-main-screen">
              <CompanyNew onCloseForm={showCompanyList} className="company-module"/>
              <CompanyList onAddCompany={showNewCompanyForm} onShowCompanyDetail={showCompanyDetail} className="company-module show"/>
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
