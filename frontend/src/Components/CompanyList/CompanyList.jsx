import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import axios from "axios";

import CompanyListHeader from "./CompanyListHeader";
import CompanyListFooter from "./CompanyListFooter";
import "./CompanyList.css";

import StatusChange from "../CompanyDetails/StatusChange";
import ConfirmDialog from "../CompanyDetails/ConfirmDialog";

const columns = [
  { id: "id", label: "" },
  { id: "insertionDate", label: "Datum" },
  { id: "status", label: "Status" },
  { id: "name", label: "Název" },
  { id: "contactNumber", label: "Kontakt" },
  { id: "ico", label: "IČO" },
  { id: "sales", label: "Reklama v tomto roce" },
  { id: "user", label: "Obchodník" },
  { id: "takeCompany", label: "Zabrat firmu" },
];

const CompanyList = ({
  onAddCompany,
  onShowCompanyDetail,
  onRefresh,
  className,
  token,
}) => {
  const [companiesFromServer, setCompaniesFromServer] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [myCompaniesFromServer, setMyCompaniesFromServer] = useState([]);
  const [myCompanies, setMyCompanies] = useState([]);
  const [onlyMyCompanies, setOnlyMyCompanies] = useState(true);
  const [letterFilter, setLetterFilter] = useState("");
  const [orderDirection, setOrderDirection] = useState("desc");
  const [orderBy, setOrderBy] = useState("ico");
  const [searchValue, setSearchValue] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [companyICO, setCompanyICO] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [companyStatus, setCompanyStatus] = useState(null);
  const [companyStatusColor, setCompanyStatusColor] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [takeOpen, setTakeOpen] = useState(false);

  const fetchAdmin = async () => {
    await axios
      .get("/api/user/admin", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        setAdmin(res.data["is_admin"]);
      });
  };

  React.useEffect(() => {
    const getAdmin = async () => {
      const admin = await fetchAdmin();
    };
    getAdmin();
  }, []);

  useEffect(() => {
    const getCompanies = async () => {
      const compsFromServer = await fetchAllCompanies();
      const myCompsFromServer = await fetchMyCompanies();
      setCompaniesFromServer(compsFromServer);
      setMyCompaniesFromServer(myCompsFromServer);
      if (letterFilter !== "") {
        if (onlyMyCompanies) {
          //TODO filter companies for currently loged in user
          setMyCompanies(
            myCompsFromServer.filter(
              (company) =>
                /*(company.user === "Richard") && */ company.name[0].toUpperCase() ===
                letterFilter
            )
          );
        } else {
          setCompanies(
            compsFromServer.filter(
              (company) => company.name[0].toUpperCase() === letterFilter
            )
          );
        }
      } else {
        if (onlyMyCompanies) {
          //TODO filter companies for currently loged in user
          setMyCompanies(
            myCompsFromServer /*.filter((company) => company.user === "Richard")*/
          );
        } else {
          setCompanies(compsFromServer);
        }
      }
    };
    getCompanies();
  }, [onRefresh, refresh]);

  useEffect(() => {
    const getCompanies = async () => {
      if (letterFilter !== "") {
        if (onlyMyCompanies) {
          //TODO filter companies for currently loged in user
          setMyCompanies(
            myCompaniesFromServer.filter(
              (company) =>
                /*(company.user === "Richard") && */ company.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) &&
                company.name[0].toUpperCase() === letterFilter
            )
          );
        } else {
          setCompanies(
            companiesFromServer.filter(
              (company) =>
                company.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) &&
                company.name[0].toUpperCase() === letterFilter
            )
          );
        }
      } else {
        if (onlyMyCompanies) {
          //TODO filter companies for currently loged in user
          setMyCompanies(
            myCompaniesFromServer.filter(
              (company) =>
                company.name
                  .toLowerCase()
                  .includes(
                    searchValue.toLowerCase()
                  ) /* && company.user === "Richard")*/
            )
          );
        } else {
          setCompanies(
            companiesFromServer.filter((company) =>
              company.name.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
        }
      }
    };
    getCompanies();
  }, [onlyMyCompanies, letterFilter, searchValue]);

  const fetchAllCompanies = async () => {
    const data = await axios
      .get("/api/company", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
    return data;
  };

  const fetchMyCompanies = async () => {
    const data = await axios
      .get("/api/user/companies", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
    return data;
  };

  const toggleButton = (e) => {
    if (
      e.target.classList.contains("active") ||
      e.target.parentNode.classList.contains("active")
    ) {
      return;
    }

    let buttons = document.getElementsByClassName("company-list-header-button");
    Array.from(buttons).forEach((button) => {
      button.classList.remove("active");
    });

    if (e.target.classList.contains("company-list-header-button")) {
      e.target.classList.add("active");
    } else {
      e.target.parentNode.classList.add("active");
    }
    setOnlyMyCompanies(!onlyMyCompanies);
  };

  const takeCompany = (company) => {
    setCompanyICO(company.ico);
    setCompanyName(company.name);
    setTakeOpen(true);
  };

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const letterClicked = (e) => {
    let letters = document.getElementsByClassName("company-list-footer-letter");
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      setLetterFilter("");
    } else {
      Array.from(letters).forEach((letter) => {
        letter.classList.remove("active");
      });
      e.target.classList.add("active");
      setLetterFilter(e.target.innerText[0]);
    }
  };

  const createSortHandler = (prop) => (event) => {
    const isAscending = orderBy === prop && orderDirection === "asc";
    setOrderBy(prop);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  function descendingComparator(a, b, orderBy) {
    let dateA = new Date(a[orderBy]);
    let dateB = new Date(b[orderBy]);
    if (dateB < dateA) {
      return -1;
    }
    if (dateB > dateA) {
      return 1;
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(orderDirection, orderBy) {
    return orderDirection === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const sortRowInfo = (companies, comparator) => {
    const sortedRowArray = companies.map((el, index) => [el, index]);
    sortedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return sortedRowArray.map((el) => el[0]);
  };

  const openStatusChange = (ico, name, status, statusColor) => {
    setCompanyICO(ico);
    setCompanyName(name);
    setCompanyStatus(status);
    setCompanyStatusColor(statusColor);
    setStatusDialogOpen(true);
  };

  const handleTakeCompany = () => {
    axios
      .put(
        "/api/company/" + companyICO + "/",
        { update_user: "True" },
        {
          headers: { Authorization: "Token " + token },
        }
      )
      .then(function (response) {
        setTakeOpen(false);
        setRefresh((prev) => !prev);
      });
  };

  return (
    <div id="companyList" className={className + " company-list"}>
      <CompanyListHeader
        onSearch={onSearch}
        onToggle={toggleButton}
        onClickAdd={onAddCompany}
      ></CompanyListHeader>
      <TableContainer>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell width="2%" key="rowNum">
                <TableSortLabel
                  active={columns[1].id === orderBy}
                  direction={columns[1].id === orderBy ? orderDirection : "asc"}
                  onClick={createSortHandler(columns[1].id)}
                />
              </TableCell>
              {!onlyMyCompanies && (
                <TableCell width="13%" align="center">
                  {columns[8].label}
                </TableCell>
              )}
              {onlyMyCompanies && (
                <TableCell width="15%" align="center" key={columns[2].id}>
                  <TableSortLabel
                    active={columns[2].id === orderBy}
                    direction={
                      columns[2].id === orderBy ? orderDirection : "asc"
                    }
                    onClick={createSortHandler(columns[2].id)}
                  >
                    {columns[2].label}
                  </TableSortLabel>
                </TableCell>
              )}
              <TableCell width="40%" align="center" key={columns[3].id}>
                <TableSortLabel
                  active={columns[3].id === orderBy}
                  direction={columns[3].id === orderBy ? orderDirection : "asc"}
                  onClick={createSortHandler(columns[3].id)}
                >
                  {columns[3].label}
                </TableSortLabel>
              </TableCell>
              {onlyMyCompanies && (
                <TableCell width="20%" align="center" key={columns[4].id}>
                  <TableSortLabel
                    active={columns[4].id === orderBy}
                    direction={
                      columns[4].id === orderBy ? orderDirection : "asc"
                    }
                    onClick={createSortHandler(columns[4].id)}
                  >
                    {columns[4].label}
                  </TableSortLabel>
                </TableCell>
              )}
              {!onlyMyCompanies && admin && (
                <TableCell width="10%" align="center" key={columns[6].id}>
                  <TableSortLabel
                    active={columns[6].id === orderBy}
                    direction={
                      columns[6].id === orderBy ? orderDirection : "asc"
                    }
                    onClick={createSortHandler(columns[6].id)}
                  >
                    {columns[6].label}
                  </TableSortLabel>
                </TableCell>
              )}
              {!onlyMyCompanies && !admin && (
                <TableCell width="20%" align="center" key={columns[4].id}>
                  <TableSortLabel
                    active={columns[4].id === orderBy}
                    direction={
                      columns[4].id === orderBy ? orderDirection : "asc"
                    }
                    onClick={createSortHandler(columns[4].id)}
                  >
                    {columns[4].label}
                  </TableSortLabel>
                </TableCell>
              )}
              <TableCell width="10%" align="center" key={columns[5].id}>
                <TableSortLabel
                  active={columns[5].id === orderBy}
                  direction={columns[5].id === orderBy ? orderDirection : "asc"}
                  onClick={createSortHandler(columns[5].id)}
                >
                  {columns[5].label}
                </TableSortLabel>
              </TableCell>
              {onlyMyCompanies && (
                <TableCell width="10%" align="center" key={columns[6].id}>
                  <TableSortLabel
                    active={columns[6].id === orderBy}
                    direction={
                      columns[6].id === orderBy ? orderDirection : "asc"
                    }
                    onClick={createSortHandler(columns[6].id)}
                  >
                    {columns[6].label}
                  </TableSortLabel>
                </TableCell>
              )}
              {!onlyMyCompanies && (
                <TableCell width="18%" align="center" key={columns[7].id}>
                  <TableSortLabel
                    active={columns[7].id === orderBy}
                    direction={
                      columns[7].id === orderBy ? orderDirection : "asc"
                    }
                    onClick={createSortHandler(columns[7].id)}
                  >
                    {columns[7].label}
                  </TableSortLabel>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortRowInfo(!onlyMyCompanies ? companies : myCompanies, getComparator(orderDirection, orderBy)).map(
              (company, index) => (
                <TableRow hover key={index}>
                  <TableCell
                    className="clickable"
                    onClick={() =>
                      (onlyMyCompanies || admin) &&
                      onShowCompanyDetail(company.ico)
                    }
                    align="left"
                  >
                    {index + 1}
                  </TableCell>
                  {!onlyMyCompanies && (
                    <TableCell align="center">
                      {company.user === null ? (
                        <Button
                          onClick={() => takeCompany(company)}
                          size="small"
                          className="company-list-take"
                        >
                          Zabrat
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          disabled
                          className="company-list-take disabled"
                        >
                          Zabrano
                        </Button>
                      )}
                    </TableCell>
                  )}
                  {onlyMyCompanies && (
                    <TableCell
                      className="clickable"
                      onClick={() =>
                        openStatusChange(
                          company.ico,
                          company.name,
                          company.status,
                          company.status_color
                        )
                      }
                      align="center"
                    >
                      <span
                        className="company-list-status"
                        style={{ backgroundColor: company.status_color }}
                      >
                        {company.status}
                      </span>
                    </TableCell>
                  )}
                  <TableCell
                    className="clickable"
                    onClick={() =>
                      (onlyMyCompanies || admin) &&
                      onShowCompanyDetail(company.ico)
                    }
                    align="center"
                  >
                    <div className="text-container">{company.name}</div>
                  </TableCell>
                  {onlyMyCompanies && (
                    <TableCell
                      className="clickable"
                      onClick={() => onShowCompanyDetail(company.ico)}
                      align="center"
                    >
                      {company.phone_number}
                    </TableCell>
                  )}
                  {!onlyMyCompanies && admin && (
                    <TableCell
                      className="clickable"
                      onClick={() => onShowCompanyDetail(company.ico)}
                      align="center"
                    >
                      {company.advertising_this_year !== null
                        ? company.advertising_this_year
                        : 0}
                    </TableCell>
                  )}
                  {!onlyMyCompanies && !admin && (
                    <TableCell className="clickable" align="center">
                      {company.phone_number}
                    </TableCell>
                  )}
                  <TableCell
                    className="clickable"
                    onClick={() =>
                      (onlyMyCompanies || admin) &&
                      onShowCompanyDetail(company.ico)
                    }
                    align="center"
                  >
                    {company.ico}
                  </TableCell>
                  {onlyMyCompanies && (
                    <TableCell
                      className="clickable"
                      onClick={() => onShowCompanyDetail(company.ico)}
                      align="center"
                    >
                      {company.advertising_this_year !== null
                        ? company.advertising_this_year
                        : 0}
                    </TableCell>
                  )}
                  {!onlyMyCompanies && (
                    <TableCell
                      className="clickable"
                      onClick={() => admin && onShowCompanyDetail(company.ico)}
                      align="center"
                    >
                      {company.user === null ? "" : company.user.name}
                    </TableCell>
                  )}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <StatusChange
        ico={companyICO}
        companyName={companyName}
        companyStatus={companyStatus}
        companyStatusColor={companyStatusColor}
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        refresh={() => setRefresh((prev) => !prev)}
        token={token}
      />
      <ConfirmDialog
        title={"Zabrat firmu"}
        open={takeOpen}
        setOpen={setTakeOpen}
        onConfirm={() => handleTakeCompany()}
      >
        {"Opravdu chcete zabrat firmu " + companyName + "?"}
      </ConfirmDialog>
      <CompanyListFooter onLetterClick={letterClicked}></CompanyListFooter>
    </div>
  );
};

export default CompanyList;
