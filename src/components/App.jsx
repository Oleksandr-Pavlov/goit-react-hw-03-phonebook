import { Component } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

const LS_KEY = 'contacts_list'

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filteredName: '',
  };

  onChangeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filteredName: value });
  };

  getFilteredContacts = () => {
    const {contacts, filteredName} = this.state
    const normalizedFilteredName = filteredName.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilteredName)
    );
  };

  handleSubmit = (name, number) => {
    const isExist = this.state.contacts.find(contact => {
      return contact.name === name;
    });

    if (isExist) return alert(`${name} is already in contacts.`);

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), name,  number }],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem(LS_KEY)
    const parsedContacts = JSON.parse(contacts)

    parsedContacts && this.setState({contacts: parsedContacts})
  }
  
  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.onChangeFilter} />
        <ContactsList
          contacts={this.getFilteredContacts()}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
