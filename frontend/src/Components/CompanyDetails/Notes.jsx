import { Card, CardContent } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

import "./css/Notes.css"

const Notes = ({data}) => {
    return (
        <Card className="company-details-notes comapny-details-card">
            <CardContent className="company-details-notes-content">
                    <Typography variant="h5">
                        Poznámky
                    </Typography>

                <div className="notes-box">
                    {data.map(note => (
                        <p>- {note.content}</p>
                    ))}
                </div>

            </CardContent>
        </Card>
    )
}
export default Notes;