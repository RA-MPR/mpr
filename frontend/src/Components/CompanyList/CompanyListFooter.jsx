import React from 'react'
import Typography from '@material-ui/core/Typography';

const CompanyListFooter = ({onLetterClick}) => {

    const generateLetters = () => {
        let arr = [];
        for(let i = 65; i < 91; i++){
            arr.push(String.fromCharCode(i))
        }
        return arr;
    }

    return (
        <div className="company-list-footer">
            {generateLetters().map((letter) => (
                <Typography key={letter} onClick={onLetterClick} variant="h6" className="company-list-footer-letter">{letter}</Typography>
            ))}
        </div>
    )
}

export default CompanyListFooter
