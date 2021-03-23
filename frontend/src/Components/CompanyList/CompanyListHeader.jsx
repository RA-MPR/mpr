import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

const CompanyListHeader = ({onToggle, onClickAdd}) => {
    return (
        <div className="company-list-header">
            <Typography variant="h4">Firmy</Typography>
            <div>
                <Button onClick={onToggle} variant='contained' className="company-list-header-button active">Moje</Button>
                <Button onClick={onToggle} variant='contained' className="company-list-header-button">Všechny</Button>
            </div>
            <IconButton className="add-button" onClick={onClickAdd}><AddIcon/></IconButton>
        </div>
    )
}

export default CompanyListHeader
