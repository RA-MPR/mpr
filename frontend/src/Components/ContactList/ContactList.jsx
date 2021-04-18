import React, {useEffect, useState}  from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ContactListHeader from './ContactListHeader';
import './ContactList.css';

import axios from 'axios';

import {useHistory} from "react-router-dom";

const columns = [
    {id: 'id', label: ""},
    {id: 'name', label: "Jméno"},
    {id: 'surname', label: "Příjmení"},
    {id: 'company', label: "Firma"},
    {id: 'email', label: "Email"},
    {id: 'phone', label: "Telefon"}
]

const ContactList = ({className, token, detailIco, setDetailIco}) => {

    const history = useHistory();

    const [contactsFromServer, setContactsFromServer] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [orderDirection, setOrderDirection] = useState('asc');
    const [orderBy, setOrderBy] = useState('surname');
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const getContacts = async () => {
            const contsFromServer = await fetchContacts();
            setContactsFromServer(contsFromServer);
            setContacts(contsFromServer);
        }
        getContacts();
    },[])

    useEffect(() => {
        const getContacts = async () => {
            setContacts(contactsFromServer.filter((contact) => 
                contact.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                contact.surname.toLowerCase().includes(searchValue.toLowerCase()) || 
                contact.company.name.toLowerCase().includes(searchValue.toLowerCase())))
        }
        getContacts();
    }, [searchValue])

    const fetchContacts = async() => {
        const data = await axios.get('http://127.0.0.1:8000/user/contacts', {headers:{Authorization: "Token " + token}}).then(res => res.data);
        return data;
    }

    const onSearch = (value) => {
        setSearchValue(value);
    }

    const createSortHandler = (prop) => (event) => {
        const isAscending = (orderBy === prop && orderDirection === 'asc');
        setOrderBy(prop);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }

    function descendingComparator(a, b, orderBy){
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

    const sortRowInfo = (contacts, comparator) => {
        const sortedRowArray = contacts.map((el, index) => [el, index]);
        sortedRowArray.sort((a,b) => {
            const order = comparator(a[0], b[0]);
            if(order !== 0) return order;
            return a[1] - b[1];
        })
        return sortedRowArray.map((el) => el[0]);
    }

    const handleShowCompanyDetail = (ico) => {
        if(ico === detailIco){
            history.push('/company/detail');
        }else{
            setDetailIco(ico);
            history.push('/company/detail');
        }
    }

    return (
        <div id="contactList" className={className + " contact-list"}>
            <ContactListHeader onSearch={onSearch} />
            <TableContainer>
                <Table stickyHeader size='small' aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" key="rowNum"/>
                            <TableCell align="center" key={columns[1].id}>
                                <TableSortLabel 
                                    active={columns[1].id === orderBy}
                                    direction = {columns[1].id === orderBy ? orderDirection : 'asc'}
                                    onClick = {createSortHandler(columns[1].id)}
                                >
                                    {columns[1].label}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" key={columns[2].id}>
                                <TableSortLabel 
                                    active={columns[2].id === orderBy}
                                    direction = {columns[2].id === orderBy ? orderDirection : 'asc'}
                                    onClick = {createSortHandler(columns[2].id)}
                                >
                                    {columns[2].label}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" key={columns[3].id}>
                                <TableSortLabel 
                                    active={columns[3].id === orderBy}
                                    direction = {columns[3].id === orderBy ? orderDirection : 'asc'}
                                    onClick = {createSortHandler(columns[3].id)}
                                >
                                    {columns[3].label}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" key={columns[4].id}>
                                <TableSortLabel 
                                    active={columns[4].id === orderBy}
                                    direction = {columns[4].id === orderBy ? orderDirection : 'asc'}
                                    onClick = {createSortHandler(columns[4].id)}
                                >
                                    {columns[4].label}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" key={columns[5].id}>
                                <TableSortLabel 
                                    active={columns[5].id === orderBy}
                                    direction = {columns[5].id === orderBy ? orderDirection : 'asc'}
                                    onClick = {createSortHandler(columns[5].id)}
                                >
                                    {columns[5].label}
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortRowInfo(contacts, getComparator(orderDirection, orderBy)).map((contact, index) => (
                            <TableRow hover key={index}>
                                <TableCell align="center" onClick={() => {handleShowCompanyDetail(contact.company.ico)}}>
                                    {index+1}
                                </TableCell>
                                <TableCell align="center" onClick={() => {handleShowCompanyDetail(contact.company.ico)}}>
                                    {contact.name}
                                </TableCell>
                                <TableCell align="center" onClick={() => {handleShowCompanyDetail(contact.company.ico)}}>
                                    {contact.surname}
                                </TableCell>
                                <TableCell align="center" onClick={() => {handleShowCompanyDetail(contact.company.ico)}}>
                                    <div className="text-container">
                                        {contact.company.name}
                                    </div>
                                </TableCell>
                                <TableCell align="center" onClick={() => {handleShowCompanyDetail(contact.company.ico)}}>
                                    {contact.email}
                                </TableCell>
                                <TableCell align="center" onClick={() => {handleShowCompanyDetail(contact.company.ico)}}>
                                    {contact.phone}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ContactList
