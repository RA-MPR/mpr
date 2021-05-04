import React, { useEffect, useState, useRef } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Icon from "@material-ui/core/Icon";

import axios from "axios";

import { format, parse } from "date-fns";

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";
import "./UserDetail.css";

import ConfirmDialog from "../CompanyDetails/ConfirmDialog";
import { Tooltip } from "@material-ui/core";

const columns = [
  { id: "id", label: "" },
  { id: "modification_date", label: "Datum" },
  { id: "status", label: "Status" },
  { id: "name", label: "Název" },
  { id: "phone_number", label: "Kontakt" },
  { id: "ico", label: "IČO" },
  { id: "advertising_this_year", label: "Obrat" },
];

const UserDetail = ({
  userId, userName, userSurname,
  onShowCompanyDetail,
  className,
  token,
  onClose
}) => {
  const [companiesFromServer, setCompaniesFromServer] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [letterFilter, setLetterFilter] = useState("");
  const [orderDirection, setOrderDirection] = useState("desc");
  const [orderBy, setOrderBy] = useState("modification_date");
  const [searchValue, setSearchValue] = useState("");
  const [admin, setAdmin] = useState(false);

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
      await fetchAdmin();
    };
    getAdmin();
  }, []);

  useEffect(() => {
    const getCompanies = async () => {
      if(userId !== ""){
        const compsFromServer = await fetchCompanies();
        setCompaniesFromServer(compsFromServer);
        if (letterFilter !== "") {
            setCompanies(
              compsFromServer.filter(
                (company) => company.name[0].toUpperCase() === letterFilter
              )
            );
        } else {
            setCompanies(compsFromServer);
        }
      }
    };
    getCompanies();
  }, [userId]);

  useEffect(() => {
    const getCompanies = async () => {
      if (letterFilter !== "") {
        setCompanies(
          companiesFromServer.filter(
            (company) =>
            //TODO Pridat hladanie podla adresy
              (company.name.toLowerCase().includes(searchValue.toLowerCase()) || 
              company.ico.toLowerCase().includes(searchValue.toLowerCase())) &&
              company.name[0].toUpperCase() === letterFilter
          )
        );
      } else {
        setCompanies(
          companiesFromServer.filter((company) =>
          //TODO Pridat hladanie podla adresy
            company.name.toLowerCase().includes(searchValue.toLowerCase()) || 
            company.ico.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      }
    };
    getCompanies();
  }, [letterFilter, searchValue]);

  const fetchCompanies = async () => {
    const data = await axios
      .get("/api/user/"+userId, {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
    return data;
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


  if(userId == "") {
    return (
      <div id="userDetail"></div>
    )
  }else{
    return (
      <div id="userDetail" className={className + " company-list"}>
        {userName !== undefined && 
        userName !== null && 
        userSurname !== undefined && 
        userSurname !== null && 
        <Typography variant="h4">
          {userName + " " + userSurname}
        </Typography>}
        <ListHeader
          onSearch={onSearch}
          onClose={onClose}
        ></ListHeader>
        <TableContainer>
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width="2%" key="rowNum">
                  <TableSortLabel
                    active={columns[1].id === orderBy}
                    direction={columns[1].id === orderBy ? orderDirection : "asc"}
                    onClick={createSortHandler(columns[1].id)}
                  >
                    <Icon><AccessAlarmIcon/></Icon>
                  </TableSortLabel>
                </TableCell>
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
                <TableCell width="40%" align="center" key={columns[3].id}>
                  <TableSortLabel
                    active={columns[3].id === orderBy}
                    direction={columns[3].id === orderBy ? orderDirection : "asc"}
                    onClick={createSortHandler(columns[3].id)}
                  >
                    {columns[3].label}
                  </TableSortLabel>
                </TableCell>
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
                <TableCell width="10%" align="center" key={columns[5].id}>
                  <TableSortLabel
                    active={columns[5].id === orderBy}
                    direction={columns[5].id === orderBy ? orderDirection : "asc"}
                    onClick={createSortHandler(columns[5].id)}
                  >
                    {columns[5].label}
                  </TableSortLabel>
                </TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {sortRowInfo(companies, getComparator(orderDirection, orderBy)).map(
                (company, index) => (
                  <TableRow hover key={index}>
                    <TableCell
                      className="clickable"
                      onClick={() =>
                        onShowCompanyDetail(company.ico)
                      }
                      align="left"
                    >
                      {index + 1}
                    </TableCell>

                      <TableCell
                        className="clickable"
                        onClick={() =>
                          onShowCompanyDetail(company.ico)
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

                    <TableCell
                      className="clickable"
                      onClick={() =>
                        onShowCompanyDetail(company.ico)
                      }
                      align="center"
                    >
                      <div className="text-container">{company.name}</div>
                    </TableCell>
                    <TableCell
                      className="clickable"
                      onClick={() => onShowCompanyDetail(company.ico)}
                      align="center"
                    >
                      {company.phone_number}
                    </TableCell>
                    <TableCell
                      className="clickable"
                      onClick={() =>
                        onShowCompanyDetail(company.ico)
                      }
                      align="center"
                    >
                      {company.ico}
                    </TableCell>
                    <TableCell
                      className="clickable"
                      onClick={() => onShowCompanyDetail(company.ico)}
                      align="center"
                    >
                      {company.advertising_this_year !== null
                        ? company.advertising_this_year
                        : 0}
                    </TableCell>
                    
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <ListFooter onLetterClick={letterClicked}></ListFooter>
      </div>
    );
  }
};

export default UserDetail;
