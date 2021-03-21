const Events = ({data}) => {
    return (
        <div className="events">
            <table>
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Název</th>
                        <th>Popis</th>
                        <th>Připomínka</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(event => (
                        <tr>
                            <td>{event.date}</td>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td><input type="checkbox" name="reminder" id={"reminder-" + event.id}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button>+ Nová</button>
        </div>
    )
}

export default Events;