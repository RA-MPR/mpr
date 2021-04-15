import React, {useEffect, useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import CloseIcon from '@material-ui/icons/Close';

import axios from 'axios';

import CompanyListHeader from './CompanyListHeader'
import CompanyListFooter from './CompanyListFooter'
import './CompanyList.css';


const columns = [
    {id: 'id', label: ""},
    {id: 'insertionDate', label: "Datum"},
    {id: 'status', label: "Status"},
    {id: 'name', label: "Název"},
    {id: 'contactNumber', label: "Kontakt"},
    {id: 'ico', label: "IČO"},
    {id: 'sales', label: "Reklama v tomto roce"},
    {id: 'user', label: "Obchodník"},
    {id: 'takeCompany', label: "Zabrat firmu"}
]

const CompanyList = ({onAddCompany, onShowCompanyDetail, onRefresh, className, token}) => {
    const [companiesFromServer, setCompaniesFromServer] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [onlyMyCompanies, setOnlyMyCompanies] = useState(true);
    const [letterFilter, setLetterFilter] = useState('');
    const [orderDirection, setOrderDirection] = useState('desc');
    const [orderBy, setOrderBy] = useState('ico');
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const getCompanies = async () => {
            const compsFromServer = await fetchCompanies();
            setCompaniesFromServer(compsFromServer);
            if(letterFilter !== ''){
                if(onlyMyCompanies){
                    //TODO filter companies for currently loged in user
                    setCompanies(compsFromServer.filter((company) => /*(company.user === "Richard") && */(company.name[0].toUpperCase() === letterFilter)));
                }else{
                    setCompanies(compsFromServer.filter((company) => company.name[0].toUpperCase() === letterFilter));
                }
            }else{
                if(onlyMyCompanies){
                    //TODO filter companies for currently loged in user
                    setCompanies(compsFromServer/*.filter((company) => company.user === "Richard")*/);
                }else{
                    setCompanies(compsFromServer);
                }
            }
        }
        getCompanies();
    },[onRefresh])

    useEffect(() => {
        const getCompanies = async () => {
            if(letterFilter !== ''){
                if(onlyMyCompanies){
                    //TODO filter companies for currently loged in user
                    setCompanies(companiesFromServer.filter((company) => /*(company.user === "Richard") && */company.name.toLowerCase().includes(searchValue.toLowerCase()) && (company.name[0].toUpperCase() === letterFilter)));
                }else{
                    setCompanies(companiesFromServer.filter((company) => company.name.toLowerCase().includes(searchValue.toLowerCase()) && company.name[0].toUpperCase() === letterFilter));
                }
            }else{
                if(onlyMyCompanies){
                    //TODO filter companies for currently loged in user
                    setCompanies(companiesFromServer.filter((company) => company.name.toLowerCase().includes(searchValue.toLowerCase())/* && company.user === "Richard")*/));
                }else{
                    setCompanies(companiesFromServer.filter((company) => company.name.toLowerCase().includes(searchValue.toLowerCase())));
                }
            }
        }
        getCompanies();
    },[onlyMyCompanies, letterFilter, searchValue])

    const fetchCompanies = async() => {
        const data = await axios.get('http://127.0.0.1:8000/company',{headers:{Authorization: "Token " + token}}).then(res => res.data);
        return data;
    }

    const toggleButton = (e) => {
        if(e.target.classList.contains("active") || e.target.parentNode.classList.contains("active")){
            return;
        }
        
        let buttons = document.getElementsByClassName("company-list-header-button");
        Array.from(buttons).forEach(button => {
            button.classList.remove("active");
        });

        
        if(e.target.classList.contains("company-list-header-button")){
            e.target.classList.add("active");
        }else{
            e.target.parentNode.classList.add("active");
        }
        setOnlyMyCompanies(!onlyMyCompanies);
    }

    const giveUpCompany = () => {
        console.log("TODO Give up company")
    }

    const takeCompany = () => {
        console.log("TODO Take control of company")
    }

    const onSearch = (value) => {
        setSearchValue(value);
    }

    const letterClicked = (e) => {
        let letters = document.getElementsByClassName("company-list-footer-letter");
        if(e.target.classList.contains("active")){
            e.target.classList.remove("active");
            setLetterFilter('');
        }else{
            Array.from(letters).forEach(letter => {
                letter.classList.remove("active");
            });
            e.target.classList.add("active");
            setLetterFilter(e.target.innerText[0]);
        }
    }

    const createSortHandler = (prop) => (event) => {
        const isAscending = (orderBy === prop && orderDirection === 'asc');
        setOrderBy(prop);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }

    function descendingComparator(a, b, orderBy){
        let dateA = new Date(a[orderBy]);
        let dateB = new Date(b[orderBy]);
        if(dateB < dateA){
            return -1;
        }
        if(dateB > dateA){
            return 1;
        }
        if(b[orderBy] < a[orderBy]){
            return -1;
        }
        if(b[orderBy] > a[orderBy]){
            return 1;
        }
        return 0;
    }

    function getComparator(orderDirection, orderBy){
        return orderDirection === 'desc'
            ? (a,b) => descendingComparator(a, b, orderBy)
            : (a,b) => -descendingComparator(a, b, orderBy)
    }

    const sortRowInfo = (companies, comparator) => {
        const sortedRowArray = companies.map((el, index) => [el, index]);
        sortedRowArray.sort((a,b) => {
            const order = comparator(a[0], b[0]);
            if(order !== 0) return order;
            return a[1] - b[1];
        })
        return sortedRowArray.map((el) => el[0]);
    }

    return (
        <div id="companyList" className={className + " company-list"}>
        <CompanyListHeader onSearch={onSearch} onToggle={toggleButton} onClickAdd={onAddCompany}></CompanyListHeader>
        <TableContainer>
            <Table stickyHeader size='small' aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell width="2%" key="rowNum">
                            <TableSortLabel 
                                active={columns[1].id === orderBy}
                                direction = {columns[1].id === orderBy ? orderDirection : 'asc'}
                                onClick = {createSortHandler(columns[1].id)}
                            />
                        </TableCell>
                        {!onlyMyCompanies && <TableCell width="13%" align="center">
                            {columns[8].label}
                        </TableCell>}
                        {onlyMyCompanies && <TableCell width="15%" align="center" key={columns[2].id}>
                            <TableSortLabel 
                                active={columns[2].id === orderBy}
                                direction = {columns[2].id === orderBy ? orderDirection : 'asc'}
                                onClick = {createSortHandler(columns[2].id)}
                            >
                                {columns[2].label}
                            </TableSortLabel>
                        </TableCell>}
                        <TableCell width="40%" align="center" key={columns[3].id}>
                            <TableSortLabel 
                                active={columns[3].id === orderBy}
                                direction = {columns[3].id === orderBy ? orderDirection : 'asc'}
                                onClick = {createSortHandler(columns[3].id)}
                            >
                                {columns[3].label}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell width="20%" align="center" key={columns[4].id}>
                            <TableSortLabel 
                                active={columns[4].id === orderBy}
                                direction = {columns[4].id === orderBy ? orderDirection : 'asc'}
                                onClick = {createSortHandler(columns[4].id)}
                            >
                                {columns[4].label}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell width="10%" align="center" key={columns[5].id}>
                            <TableSortLabel 
                                active={columns[5].id === orderBy}
                                direction = {columns[5].id === orderBy ? orderDirection : 'asc'}
                                onClick = {createSortHandler(columns[5].id)}
                            >
                                {columns[5].label}
                            </TableSortLabel>
                        </TableCell>
                        {onlyMyCompanies && <TableCell width="10%" align="center" key={columns[6].id}>
                            <TableSortLabel 
                                active={columns[6].id === orderBy}
                                direction = {columns[6].id === orderBy ? orderDirection : 'asc'}
                                onClick = {createSortHandler(columns[6].id)}
                            >
                                {columns[6].label}
                            </TableSortLabel>
                        </TableCell>}
                        {!onlyMyCompanies && <TableCell width="15%" align="center" key={columns[7].id}>
                            <TableSortLabel 
                                active={columns[7].id === orderBy}
                                direction = {columns[7].id === orderBy ? orderDirection : 'asc'}
                                onClick = {createSortHandler(columns[7].id)}
                            >
                                {columns[7].label}
                            </TableSortLabel>
                        </TableCell>}
                        {onlyMyCompanies && <TableCell width="3%"/>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortRowInfo(companies, getComparator(orderDirection, orderBy)).map((company, index) =>(
                        <TableRow hover key={index}>
                            <TableCell className="clickable" onClick={() => onShowCompanyDetail(company.ico)} align="left">
                                {index+1}
                            </TableCell>
                            {!onlyMyCompanies && <TableCell align="center">
                                {company.user === null ? 
                                    <Button onClick={takeCompany} size="small" className="company-list-take">Zabrat</Button> : 
                                    <Button size="small" disabled className="company-list-take disabled">Zabrano</Button>}
                            </TableCell>}
                            {onlyMyCompanies && <TableCell className="clickable" onClick={() => onShowCompanyDetail(company.ico)} align="center">
                                <span className="company-list-status" style={{backgroundColor: company.status_color}}>{company.status}</span>
                            </TableCell>}
                            <TableCell className="clickable" onClick={() => onShowCompanyDetail(company.ico)} align="center">
                                <div className="text-container">
                                    {company.name}
                                </div>
                            </TableCell>
                            <TableCell className="clickable" onClick={() => onShowCompanyDetail(company.ico)} align="center">
                                {company.phone_number}
                            </TableCell>
                            <TableCell className="clickable" onClick={() => onShowCompanyDetail(company.ico)} align="center">
                                {company.ico}
                            </TableCell>
                            {onlyMyCompanies && <TableCell className="clickable" onClick={() => onShowCompanyDetail(company.ico)} align="center">
                                {company.advertising_this_year !== null ? company.advertising_this_year : 0}
                            </TableCell>}
                            {!onlyMyCompanies && <TableCell className="clickable" onClick={() => onShowCompanyDetail(company.ico)} align="center">
                                {company.user === null ? "" : company.user.name}
                            </TableCell>}
                            {onlyMyCompanies && <TableCell align="center">
                                <IconButton onClick={giveUpCompany} size="small" className="company-list-close"><CloseIcon/></IconButton>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <CompanyListFooter onLetterClick={letterClicked}></CompanyListFooter>
        </div>
    )
}

export default CompanyList
