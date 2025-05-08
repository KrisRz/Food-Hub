import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './PaymentForm.module.css';

function PaymentForm({ total, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const handleCardChange = (event) => {
    setError(null);
    setCardComplete(event.complete);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError('Payment system is not available. Please try again later.');
      return;
    }

    if (!cardComplete) {
      setError('Please complete your card details.');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment intent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        setTimeout(() => {
          onPaymentSuccess();
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      console.error('Payment error:', err);
    }

    setProcessing(false);
  };

  if (success) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>✓</div>
        <h3>Payment Successful!</h3>
        <p>Thank you for your order.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.paymentForm}>
      <div className={styles.cardElement}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          onChange={handleCardChange}
        />
      </div>
      {error && (
        <div className={styles.error}>
          <span className={styles.errorIcon}>⚠</span>
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing || !cardComplete}
        className={styles.payButton}
      >
        {processing ? (
          <span className={styles.loadingSpinner}></span>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>
    </form>
  );
}

export default PaymentForm; 