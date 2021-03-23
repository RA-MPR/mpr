import React, {useEffect, useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

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

const testData = [
    {id: 1, insertionDate: "2021/1/1", contactNumber: "+420 123 456 789", status: "Odmítnuto", statusColor: "#ff4a4a", name: "ABCEFGH IJKLM NOPQRST UVWXYZABC EFGH IJKL MNOPQRSTU VW XY ZABCEFGH IJKLMNOPQR STUV WXYZ s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 2, insertionDate: "2021/1/2", contactNumber: "+420 123 456 789", status: "Odmítnuto", statusColor: "rgba(255,74,74,255)", name: "A s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 3, insertionDate: "2021/1/3", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "B s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 4, insertionDate: "2021/1/4", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "Bca s.r.o.", ico: 12345678, user: "", sales: 10000},
    {id: 5, insertionDate: "2021/1/5", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "C s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 6, insertionDate: "2021/1/6", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "D s.r.o.", ico: 12345678, user: "", sales: 10000},
    {id: 7, insertionDate: "2021/1/7", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "E s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 8, insertionDate: "2021/1/8", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "F s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 9, insertionDate: "2021/1/9", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "G s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 10, insertionDate: "2021/1/10", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "H s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 11, insertionDate: "2021/1/11", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "I s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 12, insertionDate: "2021/1/12", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "J s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 13, insertionDate: "2021/1/13", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "K s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 14, insertionDate: "2021/1/14", contactNumber: "+420 123 456 789", status: "Uzavřeno", statusColor: "green", name: "La s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 15, insertionDate: "2021/1/15", contactNumber: "+420 123 456 789", status: "Uzavřeno", statusColor: "green", name: "X s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 16, insertionDate: "2021/1/16", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "Wa s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 17, insertionDate: "2021/1/17", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "ZZZ s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 18, insertionDate: "2021/1/18", contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "Ga s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
]

const CompanyList = ({onAddCompany, onShowCompanyDetail, className}) => {

    const [companies, setCompanies] = useState([]);
    const [onlyMyCompanies, setOnlyMyCompanies] = useState(true);
    const [letterFilter, setLetterFilter] = useState('');
    const [orderDirection, setOrderDirection] = useState('desc');
    const [orderBy, setOrderBy] = useState('insertionDate');

    useEffect(() => {
        const getCompanies = async () => {
            const companiesFromServer = await fetchCompanies();
            if(letterFilter !== ''){
                if(onlyMyCompanies){
                    //TODO filter companies for currently loged in user
                    setCompanies(companiesFromServer.filter((company) => (company.user === "Richard") && (company.name[0].toUpperCase() === letterFilter)));
                }else{
                    setCompanies(companiesFromServer.filter((company) => company.name[0].toUpperCase() === letterFilter));
                }
            }else{
                if(onlyMyCompanies){
                    //TODO filter companies for currently loged in user
                    setCompanies(companiesFromServer.filter((company) => company.user === "Richard"));
                }else{
                    setCompanies(companiesFromServer);
                }
            }
        }
        getCompanies();
    },[onlyMyCompanies, letterFilter])

    const fetchCompanies = async() => {
        // TODO Fetch data from API
        /*const response = await fetch('');
        const data = await response.json();*/
        const data = testData;
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
        <CompanyListHeader onToggle={toggleButton} onClickAdd={onAddCompany}></CompanyListHeader>
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
                        {!onlyMyCompanies && <TableCell width="3%" align="center"/>}
                        {onlyMyCompanies && <TableCell width="15%" align="center" key={columns[2].id}>
                            <TableSortLabel 
                                active={columns[2].id === orderBy}
                                direction = {columns[2].id === orderBy ? orderDirection : 'asc'}
                                onClick = {createSortHandler(columns[2].id)}
                            >
                                {columns[2].label}
                            </TableSortLabel>
                        </TableCell>}
                        <TableCell width={onlyMyCompanies ? "40%" : "50%"} align="center" key={columns[3].id}>
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
                            <TableCell onClick={() => onShowCompanyDetail(company.id)} align="left">
                                {index}
                            </TableCell>
                            {!onlyMyCompanies && <TableCell align="center">
                                {(company.user === "" || company.user === undefined) && <IconButton onClick={takeCompany} size="small" className="company-list-add"><CheckIcon/></IconButton>}
                            </TableCell>}
                            {onlyMyCompanies && <TableCell onClick={() => onShowCompanyDetail(company.id)} align="center">
                                <span className="company-status" style={{backgroundColor: company.statusColor}}>{company.status}</span>
                            </TableCell>}
                            <TableCell onClick={() => onShowCompanyDetail(company.id)} align="center">
                                <div className="text-container">
                                    {company.name}
                                </div>
                            </TableCell>
                            <TableCell onClick={() => onShowCompanyDetail(company.id)} align="center">
                                {company.contactNumber}
                            </TableCell>
                            <TableCell onClick={() => onShowCompanyDetail(company.id)} align="center">
                                {company.ico}
                            </TableCell>
                            {onlyMyCompanies && <TableCell onClick={() => onShowCompanyDetail(company.id)} align="center">
                                {company.sales}
                            </TableCell>}
                            {!onlyMyCompanies && <TableCell onClick={() => onShowCompanyDetail(company.id)} align="center">
                                {company.user}
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
