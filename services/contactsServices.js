import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const contactsPath = path.resolve('db', 'contacts.json');

const readContacts = async () => {
  const contacts = await fs.readFile(contactsPath, {
    encoding: 'utf-8',
  });

  return JSON.parse(contacts);
};

const writeContacts = async (contacts) => await fs.writeFile(contactsPath,
  JSON.stringify(contacts, null, 2),
);

const listContacts = async () => await readContacts();

const getContactById = async (contactId) => {
  const contacts = await readContacts();

  const contact = contacts.find(({ id }) => contactId === id);

  if (typeof contact === 'undefined') {
    return null;
  }

  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await readContacts();

  const addedContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(addedContact);

  await writeContacts(contacts);

  return addedContact;
};

const updateContactById = async (contactId, name, email, phone) => {
  const contacts = await readContacts();

  const contactIndex = contacts.findIndex(({ id }) => contactId === id);

  if (contactIndex === -1) {
    return null;
  }

  const updatedContact = {
    ...contacts[contactIndex],
    name: name ?? contacts[contactIndex].name,
    email: email ?? contacts[contactIndex].email,
    phone: phone ?? contacts[contactIndex].phone,
  };

  contacts[contactIndex] = updatedContact;

  await writeContacts(contacts);

  return updatedContact;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();

  const contactIndex = contacts.findIndex(({ id }) => contactId === id);

  if (contactIndex === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(contactIndex, 1);

  await writeContacts(contacts);

  return deletedContact;
};

const ContactsModel = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};

export default ContactsModel;
