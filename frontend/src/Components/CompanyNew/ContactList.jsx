import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const ContactList = ({ contacts, setContacts }) => {
  const removeContact = (id) => {
    var copy = [...contacts];
    if (id !== -1){
        copy.splice(id, 1)
    }
    setContacts(copy);
  };

  return (
    <List dense>
      {contacts.map((contact, id) => (
        <ListItem>
          <ListItemText
            key={id}
            primary={contact.name + " " + contact.surname}
            secondary={contact.email + " " + contact.tel}
          />
          <ListItemSecondaryAction onClick={() => removeContact(id)}>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
