import React, {useEffect, useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import CompanyListHeader from './CompanyListHeader'
import CompanyListFooter from './CompanyListFooter'
import './CompanyList.css';


const columns = [
    {id: 'id', label: ""},
    {id: 'companyStatus', label: "Status"},
    {id: 'companyName', label: "Název"},
    {id: 'companyContactNumber', label: "Telefonní číslo"},
    {id: 'companyICO', label: "IČO"},
    {id: 'companySales', label: "Reklama v tomto roce"},
    {id: 'companyUser', label: "Obchodník"}
]

const testData = [
    {id: 1, contactNumber: "+420 123 456 789", status: "Odmítnuto", statusColor: "#ff4a4a", name: "ABCEFGH IJKLM NOPQRST UVWXYZABC EFGH IJKL MNOPQRSTU VW XY ZABCEFGH IJKLMNOPQR STUV WXYZ s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 2, contactNumber: "+420 123 456 789", status: "Odmítnuto", statusColor: "rgba(255,74,74,255)", name: "A s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 3, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "B s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 4, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "Bca s.r.o.", ico: 12345678, user: "", sales: 10000},
    {id: 5, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "C s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 6, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "D s.r.o.", ico: 12345678, user: undefined, sales: 10000},
    {id: 7, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "E s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 8, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "F s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 9, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "G s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 10, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "H s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 11, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "I s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 12, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "J s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 13, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "K s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 14, contactNumber: "+420 123 456 789", status: "Uzavřeno", statusColor: "green", name: "La s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 15, contactNumber: "+420 123 456 789", status: "Uzavřeno", statusColor: "green", name: "X s.r.o.", ico: 12345678, user: "Richard", sales: 10000},
    {id: 16, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "Wa s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 17, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "ZZZ s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
    {id: 18, contactNumber: "+420 123 456 789", status: "Osloveno", statusColor: "orange", name: "Ga s.r.o.", ico: 12345678, user: "Jano", sales: 10000},
]

const CompanyList = ({className}) => {

    const [companies, setCompanies] = useState([]);
    const [onlyMyCompanies, setOnlyMyCompanies] = useState(true);
    const [letterFilter, setLetterFilter] = useState('');

    useEffect(() => {
        const getCompanies = async () => {
            const companiesFromServer = await fetchCompanies();
            if(letterFilter != ''){
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

    const addCompany = () => {
        console.log("TODO Show add company form")
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

    return (
        <div className={className}>
        <CompanyListHeader onToggle={toggleButton} onClickAdd={addCompany}></CompanyListHeader>
        <TableContainer>
            <Table stickyHeader size='small' aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell width="2%" align="center"/>
                        {!onlyMyCompanies && <TableCell width="3%" align="center"/>}
                        {onlyMyCompanies && <TableCell width="15%" align="center" key={columns[1].id}>
                            {columns[1].label}
                        </TableCell>}
                        <TableCell width={onlyMyCompanies ? "40%" : "50%"} align="center" key={columns[2].id}>
                            {columns[2].label}
                        </TableCell>
                        <TableCell width="20%" align="center" key={columns[3].id}>
                            {columns[3].label}
                        </TableCell>
                        <TableCell width="10%" align="center" key={columns[4].id}>
                            {columns[4].label}
                        </TableCell>
                        {onlyMyCompanies && <TableCell width="10%" align="center" key={columns[5].id}>
                            {columns[5].label}
                        </TableCell>}
                        {!onlyMyCompanies && <TableCell width="15%" align="center" key={columns[6].id}>
                            {columns[6].label}
                        </TableCell>}
                        {onlyMyCompanies && <TableCell width="3%" align="center"/>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map((company) =>(
                        <TableRow hover key={company.id}>
                            <TableCell align="left">
                                {companies.indexOf(company)+1}
                            </TableCell>
                            {!onlyMyCompanies && <TableCell align="center">
                                {(company.user == "" || company.user == undefined) && <IconButton onClick={takeCompany} className="company-list-add"><CheckIcon/></IconButton>}
                            </TableCell>}
                            {onlyMyCompanies && <TableCell align="center">
                                <span className="company-status" style={{backgroundColor: company.statusColor}}>{company.status}</span>
                            </TableCell>}
                            <TableCell align="center">
                                <div className="text-container">
                                    {company.name}
                                </div>
                            </TableCell>
                            <TableCell align="center">
                                {company.contactNumber}
                            </TableCell>
                            <TableCell align="center">
                                {company.ico}
                            </TableCell>
                            {onlyMyCompanies && <TableCell align="right">
                                {company.sales}
                            </TableCell>}
                            {!onlyMyCompanies && <TableCell align="center">
                                {company.user}
                            </TableCell>}
                            {onlyMyCompanies && <TableCell align="center">
                                <IconButton onClick={giveUpCompany} className="company-list-close"><CloseIcon/></IconButton>
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
