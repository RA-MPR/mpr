import React, {useEffect, useState}  from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import UserListHeader from './UserListHeader';
import './UserList.css';

import axios from 'axios';
import { Typography } from '@material-ui/core';

const columns = [
    {id: 'id', label: ""},
    {id: 'name', label: "Jméno"},
    {id: 'surname', label: "Příjmení"},
    {id: 'email', label: "Email"},
    {id: 'phone', label: "Telefon"},
    {id: 'signed_orders', label: "Podepsané objednávky"},
    {id: 'paid_invoices', label: "Zaplacené faktury"}
]

const UserList = ({className, token, onEdit, onAdd}) => {

    const [admin, setAdmin] = useState(false);
    const [usersFromServer, setUsersFromServer] = useState([]);
    const [users, setUsers] = useState([]);
    const [orderDirection, setOrderDirection] = useState('asc');
    const [orderBy, setOrderBy] = useState('surname');
    const [searchValue, setSearchValue] = useState("");

    const fetchAdmin = async () => {
        await axios
        .get("/api/user/admin", {
        headers: { Authorization: "Token " + token },
        })
        .then((res) => {
            setAdmin(res.data["is_admin"]);
        });
    };

    useEffect(() => {
        const getAdmin = async () => {
            await fetchAdmin();
        };
        getAdmin();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            if(admin){
                const usFromServer = await fetchUsers();
                setUsersFromServer(usFromServer);
                setUsers(usFromServer);
            }
            
        }
        getUsers();
        // eslint-disable-next-line
    },[admin]);

    useEffect(() => {
        const getUsers = async () => {
            setUsers(usersFromServer.filter((user) => 
                user.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                user.surname.toLowerCase().includes(searchValue.toLowerCase()) || 
                user.company.name.toLowerCase().includes(searchValue.toLowerCase())))
        }
        getUsers();
        // eslint-disable-next-line
    }, [searchValue])

    const fetchUsers = async() => {
        const data = await axios.get('/api/user/', {headers:{Authorization: "Token " + token}}).then(res => res.data);
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

    const sortRowInfo = (Users, comparator) => {
        const sortedRowArray = Users.map((el, index) => [el, index]);
        sortedRowArray.sort((a,b) => {
            const order = comparator(a[0], b[0]);
            if(order !== 0) return order;
            return a[1] - b[1];
        })
        return sortedRowArray.map((el) => el[0]);
    }

    return (
        <div id="contactList" className={className + " user-list"}>
            {usersFromServer.length !== 0 ? <TableContainer>
                <UserListHeader onSearch={onSearch} onClickAdd={onAdd}/>
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
                            <TableCell align="center" key={columns[6].id}>
                                <TableSortLabel 
                                    active={columns[6].id === orderBy}
                                    direction = {columns[6].id === orderBy ? orderDirection : 'asc'}
                                    onClick = {createSortHandler(columns[6].id)}
                                >
                                    {columns[5].label}
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortRowInfo(users, getComparator(orderDirection, orderBy)).map((user, index) => (
                            <TableRow hover key={index}>
                                <TableCell align="center" className="clickable" onClick={() => {onEdit(user.id)}}>
                                    {index+1}
                                </TableCell>
                                <TableCell align="center" className="clickable" onClick={() => {onEdit(user.id)}}>
                                    {user.name ? user.name : "-"}
                                </TableCell>
                                <TableCell align="center" className="clickable" onClick={() => {onEdit(user.id)}}>
                                    {user.surname ? user.surname : "-"}
                                </TableCell>
                                <TableCell align="center" className="clickable" onClick={() => {onEdit(user.id)}}>
                                    {user.email ? user.email : "-"}
                                </TableCell>
                                <TableCell align="center" className="clickable" onClick={() => {onEdit(user.id)}}>
                                    {user.phone ? user.phone : "-"}
                                </TableCell>
                                <TableCell align="center" className="clickable" onClick={() => {onEdit(user.id)}}>
                                    {user.sign_orders ? user.sign_orders : "-"}
                                </TableCell>
                                <TableCell align="center" className="clickable" onClick={() => {onEdit(user.id)}}>
                                    {user.paid_invoice ? user.paid_invoice : "-"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : 
            <div>
                <Typography variant="h3">Přístup zamítnut!</Typography>
            </div>}
        </div>
    )
}

export default UserList
