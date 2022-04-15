const path = require('path');
const fs = require('fs/promises');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async contactId => {
  const allContacts = await listContacts();
  const result = allContacts.find(({ id }) => id === contactId);

  if (!result) {
    return null;
  }

  return result;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();

  const newContact = { id: v4(), name, email, phone };
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newContact;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const [removeContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return removeContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
