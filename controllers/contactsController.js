import errorDecorator from '../helpers/errorDecorator.js';
import ContactsModel from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import * as crypto from 'crypto';

const getAllContacts = async (req, res) => {
  const contacts = await ContactsModel.listContacts();

  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;

  const contact = await ContactsModel.getContactById(id);

  if (contact === null) {
    throw HttpError(404);
  }

  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const deletedContact = await ContactsModel.removeContact(id);

  if (deletedContact === null) {
    throw HttpError(404);
  }

  res.json(deletedContact);
};

const createContact = async (req, res) => {
  const {
    name,
    email,
    phone,
  } = req.body;

  const createdContact = await ContactsModel.addContact(name, email, phone);

  res.status(201).json(createdContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    email,
    phone,
  } = req.body;

  const updatedContact = await ContactsModel.updateContactById(id,
    name,
    email,
    phone,
  );

  if (updatedContact === null) {
    throw HttpError(404);
  }

  res.json(updatedContact);
};

const ContactsController = {
  getAllContacts: errorDecorator(getAllContacts),
  getOneContact: errorDecorator(getOneContact),
  deleteContact: errorDecorator(deleteContact),
  createContact: errorDecorator(createContact),
  updateContact: errorDecorator(updateContact),
};

export default ContactsController;
