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
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    const stripe = await stripePromise;

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });

  } catch (err) {
    console.log('error', err)
    showAlert('error', err);
  }
};
