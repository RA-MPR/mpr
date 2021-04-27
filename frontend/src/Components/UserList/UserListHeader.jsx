import React from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton'

import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

const UserListHeader = ({onSearch, onClickAdd}) => {
    return (
        <div className="user-list-header">
            <Typography variant="h4">Obchodníci</Typography>
            <TextField
                onChange={(e) => {onSearch(e.target.value)}}
                autoFocus
                color="primary"
                variant="standard"
                margin="dense"
                id="search"
                label="Hledat"
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
            />
            <IconButton className="add-button" onClick={onClickAdd}><AddIcon/></IconButton>
        </div>
    )
}

export default UserListHeader
