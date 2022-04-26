const { Command } = require('commander');
const program = new Command();

const contactsOperations = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const getContact = await contactsOperations.getContactById(id);
      console.log(getContact);

      if (!getContact) {
        throw new Error(`Contact with ${id} not found`);
      }

      break;

    case 'add':
      const addContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(addContact);
      break;

    case 'remove':
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

(async () => {
  await invokeAction(argv);
})();
