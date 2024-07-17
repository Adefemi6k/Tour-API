const express = require('express');
// const router = require('./tourRoutes');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

router
  .route('/')
  .get(authController.protect, bookingController.getAllBooking)
  .post(bookingController.createBooking);

router.use(authController.restrictTo('admin', 'lead-guides'));
router
  .route('/:id')
  .get(authController.protect, bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
