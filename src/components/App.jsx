import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Form } from 'components/Form/Form';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';

import { Container, MainTitle, Title } from './App.styled';

// const defaultContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ]

// const useLocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
//   })

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(state))
//   }, [key, state])

//   return [state, setState]
// }

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  // const [contacts, setContacts] = useLocalStorage('contacts', defaultContacts)
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const sameContact = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
    if (sameContact) {
      alert(name + ' is already in contacts.');
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prev => [...prev, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getFilteredContacts();

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>

      <Form onSubmit={addContact} />

      <Title>Contacts</Title>

      <Filter filter={filter} onFilterChange={changeFilter} />

      {visibleContacts.length ? (
        <Contacts contactList={visibleContacts} onDeleteBtn={deleteContact} />
      ) : (
        <p>There are no contacts</p>
      )}
    </Container>
  );
};
