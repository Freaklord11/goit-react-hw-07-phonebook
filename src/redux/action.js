import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

// Create actions with payload creators
export const addContact = createAction('contacts/addContact', (name, number) => ({
  payload: {
    id: nanoid(),
    name,
    number,
  },
}));

export const deleteContact = createAction('contacts/deleteContact');
export const setFilter = createAction('filter/setFilter');