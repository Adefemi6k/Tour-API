import axios from 'axios';
import { showAlert } from './alert';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51PcqnHLHRB0tFLTaKzZxkjYPB8mENf4xbwBkGVrzUZKaR8gWrUHPdfk9C3a1cgqRifUA00WaUB7mTBElMnKxxnRm00mPIhKJ8Y'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get Checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session.data.session.id);

    // 2) Create checkout form + charge credit card
    console.log('stripePromise', stripePromise);

    console.log('await stripePromise', await stripePromise);

    const stripe = await stripePromise;

    console.log('stripe', stripe);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });

    console.log('here');
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
