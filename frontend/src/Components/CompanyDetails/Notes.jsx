import { Card, CardContent } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { TextField } from "@material-ui/core"

import { useState, useEffect } from "react";

import "./css/Notes.css"

const Notes = ({data, edit, setNotes}) => {
    
    const [noteText, setNoteText] = useState("");

    useEffect(() => {
        setNoteText(data);
    })


    const handleNotechange = (value) => {
        setNoteText(value);
        setNotes(value);
    }

    return (
        <Card className="company-details-notes comapny-details-card">
            <CardContent className="company-details-notes-content">
                    <Typography variant="h5">
                        Poznámky
                    </Typography>

                <div className="notes-box">
                    {!edit &&  <div style={{whiteSpace: "pre-wrap"}}>{data}</div>}
                    {edit && <TextField className="note-edit-box" multiline value={noteText} onChange={(e) => handleNotechange(e.target.value)} />}
                </div>

            </CardContent>
        </Card>
    )
}
export default Notes;