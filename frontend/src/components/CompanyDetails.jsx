import Notes from "./Notes"
import Events from "./Events"
import Orders from "./Orders"

const CompanyDetails = ({companyDetails, contactPersons, notes, events, orders}) => {

    const {companyName, companyICO, billingAddress, contactAddress} = companyDetails;

    return (
        <div>
            <div className="detail-header">
                 <h1 id="company-name">{companyName} - {companyICO}</h1>
                 <button>Smazat</button>
            </div>
           <div className="details-body">
               <h2>Kontaktní osoba</h2>
                <table>
                    {contactPersons.map(person => (
                        <tr>
                            <td>{person.name}</td>
                            <td>{person.phoneNumber}</td>
                            <td>{person.email}</td>
                        </tr>
                    ))}
                </table> 

                <h2>Obchodní adresa</h2>
                <span>{billingAddress}</span>

                <h2>Kontaktní adresa</h2>
                <span>{contactAddress}</span>

                <button>Upravit</button>
           </div>
            <h2>Poznámky</h2>
                <Notes data={notes}/>

                <hr/>

                <h2>Aktivity</h2>
                <Events data={events}/>

                <hr/>

                <h2>Podepsané objednávky</h2>
                <Orders data={orders}/>

        </div>
    )
}

export default CompanyDetails;