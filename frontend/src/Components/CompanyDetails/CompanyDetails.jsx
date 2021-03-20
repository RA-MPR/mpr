import Notes from "./Notes"
import Events from "./Events"
import Orders from "./Orders"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import Button from "@material-ui/core/Button"

import "./CompanyDetails.css"


const CompanyDetails = ({companyDetails, contactPersons, notes, events, orders}) => {

    const {companyName, companyICO, billingAddress, contactAddress} = companyDetails;

    const editCompanyDetails = () => {
        // TODO
    }

    const deleteCompany = () => {
        // TODO
    }

    return (
        <div>
            <div className="details-header">
                 <h1 id="company-name">{companyName} - {companyICO}</h1>
                 <Button className="company-details-delete-button" variant="contained" onClick={deleteCompany}>Smazat</Button>
            </div>
           <div className="details-body">
               <h2>Kontaktní osoba</h2>
               <TableContainer>
                   <Table>
                       <TableBody>
                           {contactPersons.map(person => (
                                <TableRow>
                                    <TableCell>{person.name}</TableCell>
                                    <TableCell>{person.phoneNumber}</TableCell>
                                    <TableCell>{person.email}</TableCell>
                                </TableRow>
                            ))}
                       </TableBody>
                    </Table> 
                </TableContainer>
                

                <h2>Obchodní adresa</h2>
                <span>{billingAddress}</span>

                <h2>Kontaktní adresa</h2>
                <span>{contactAddress}</span>

                <Button onClick={editCompanyDetails}>Upravit</Button>
           </div>
                <Notes data={notes}/>

                <hr/>

                <Events data={events}/>

                <hr/>

                <Orders data={orders}/>

        </div>
    )
}

export default CompanyDetails;