import express from 'express';
import ContactsController from '../controllers/contactsController.js';
import validateBody from '../helpers/validateBody.js';
import ContactsSchemas from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter
.route('/')
.get(ContactsController.getAllContacts)
.post(validateBody(ContactsSchemas.create), ContactsController.createContact);

contactsRouter
.route('/:id')
.get(ContactsController.getOneContact)
.put(validateBody(ContactsSchemas.update), ContactsController.updateContact)
.delete(ContactsController.deleteContact);

// contactsRouter.put('/:id', updateContact);

export default contactsRouter;
