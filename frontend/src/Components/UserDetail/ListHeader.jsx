import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';

const ListHeader = ({onSearch, onClose}) => {
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
            <Button onClick={onClose}>Zpět</Button>
        </div>
    )
}

export default ListHeader
