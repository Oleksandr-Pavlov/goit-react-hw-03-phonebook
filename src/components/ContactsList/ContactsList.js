import { Contact } from 'components/Contact/Contact';
import css from '../ContactsList/ContactsList.module.css';

export const ContactsList = ({ contacts, onDelete }) => {
  return (
    <ul className={css.list}>
      {contacts.map(contact => {
        return (
          <li key={contact.id}>
            <Contact contact={contact} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
};
