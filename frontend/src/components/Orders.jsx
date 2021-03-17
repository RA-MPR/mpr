const Orders = ({data}) => {
    return (
        <div className="orders">
            <table>
                <thead>
                    <tr>
                        <td>Datum</td>
                        <td>Číslo smlouvy</td>
                        <td>Částka</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(order => {
                        <tr>
                            <td>{order.date}</td>
                            <td>{order.contractNumber}</td>
                            <td>{order.sum}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;