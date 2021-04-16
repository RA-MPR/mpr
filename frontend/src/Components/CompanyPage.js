import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import CompanyNew from "./CompanyNew/CompanyNew";
// eslint-disable-next-line
import CompanyList from "./CompanyList/CompanyList";
// eslint-disable-next-line
import CompanyDetails from "./CompanyDetails/CompanyDetails";

import "./CompanyPage.css";
import { useEffect, useRef, useState } from "react";
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";

import {useHistory} from "react-router-dom";

function CompanyPage({token, componentToShow, detailIco, setDetailIco}) {
 
  const history = useHistory();

  const [refresh, setRefresh] = useState(false);
  const [upcomingRefresh, setUpcomingRefresh] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);

  const showNewCompanyForm = () =>{
    history.push('/company/new');
  }

  const showCompanyList = () =>{
    setRefresh(!refresh);
    history.push('/');
  }

  const showCompanyDetail = (ico) =>{
    if(ico === detailIco){
      history.push('/company/detail');
    }else{
      setDetailIco(ico);
    }
  }

  const isMounted = useRef(false);
  useEffect(() => {
    if(isMounted.current){

      console.log(detailIco);
      history.push('/company/detail');
    }else{
      isMounted.current = true;
    }
  }, [detailIco]);



  return (
    <div className="root">
      <Grid container justify="center" spacing={2} style={{width:"100%"}}>
        <Grid item xs={8}>
          <Paper style={{ padding: 16 }}>
            <div className="company-main-screen">
              {componentToShow === "companyNew" && <CompanyNew onCloseForm={showCompanyList} onShowCompanyDetail={showCompanyDetail} token={token}/>}
              {componentToShow === "companyDetail" && <CompanyDetails ico={detailIco} onClose={showCompanyList} token={token} setUpcomingRefresh={setUpcomingRefresh} refreshEvents={refreshEvents}/>}
              {componentToShow === "companyList" && <CompanyList onAddCompany={showNewCompanyForm} onShowCompanyDetail={showCompanyDetail} onRefresh={refresh} token={token}/>}
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
            <UpcomingEvents token={token} upcomingRefresh={upcomingRefresh} setRefreshEvents={setRefreshEvents}/>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default CompanyPage;
