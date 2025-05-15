import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  getAvailability
} from '../controllers/appointmentController.js';

const router = express.Router();

router.route('/')
  .post(createAppointment)
  .get(getAppointments);

router.route('/availability/:date')
  .get(getAvailability);

router.route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(cancelAppointment);

export default router;