import express from 'express';
import {
  createContact,
  getContacts,
  getContact,
  updateContact
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/')
  .post(createContact)
  .get(getContacts);

router.route('/:id')
  .get(getContact)
  .put(updateContact);

export default router;