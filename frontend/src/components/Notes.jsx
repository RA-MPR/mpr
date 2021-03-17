const Notes = ({data}) => {

    return (
        <div className="notes">
            {data.map(note => (
                
                <div className="note">
                    <span className="note-title">{note.title}</span>
                    <div className="note-content">{note.content}</div>
                    <span className="note-date">{note.date}</span>
                </div>
            ))}
        </div>
    )
}

export default Notes;