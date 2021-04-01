import React from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';

const ContactListHeader = ({onSearch}) => {
    return (
        <div className="contact-list-header">
            <Typography variant="h4">Kontaktní osoby</Typography>
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
        </div>
    )
}

export default ContactListHeader
