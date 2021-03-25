import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

const CompanyListHeader = ({onToggle, onClickAdd, onSearch}) => {
    return (
        <div className="company-list-header">
            <Typography variant="h4">Firmy</Typography>
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
            <div>
                <Button onClick={onToggle} variant='contained' className="company-list-header-button active">Moje</Button>
                <Button onClick={onToggle} variant='contained' className="company-list-header-button">Všechny</Button>
            </div>
            <IconButton className="add-button" onClick={onClickAdd}><AddIcon/></IconButton>
        </div>
    )
}

export default CompanyListHeader
