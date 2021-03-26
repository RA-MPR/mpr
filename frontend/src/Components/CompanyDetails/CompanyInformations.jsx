import { Card, CardContent } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"

import "./css/CompanyInformations.css"

const CompanyInformations = ({companyICO, mainPhoneNumber, billingAddress, contactAddress}) => {

    return (
        <Card className="company-details-info comapny-details-card">
            <CardContent>
                <div className="grid">
                    <div className="ico">
                        <Typography variant="h5">IČO</Typography>
                        <span>{companyICO}</span>
                    </div>
                    
                    <div className="main-phone-number">
                        <Typography variant="h5">Hlavní kontaktní číslo</Typography>
                        <span>{mainPhoneNumber} </span>

                    </div>
                    
                    <div className="billing-address">
                        <Typography variant="h5">Obchodní adresa</Typography>
                        <span>{billingAddress.street}, {billingAddress.zip} {billingAddress.city}, {billingAddress.country}</span>

                    </div>
                    
                    <div className="contact-address">
                        <Typography variant="h5">Kontaktní adresa</Typography>
                        <span>{contactAddress.street}, {contactAddress.zip} {contactAddress.city}, {contactAddress.country}</span>

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default CompanyInformations