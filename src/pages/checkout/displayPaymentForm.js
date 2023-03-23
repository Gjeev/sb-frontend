function dropPaymentForm(sessionId) {
  const paymentSessionId = sessionId;
  const cashfree = new Cashfree(paymentSessionId);
  return cashfree.redirect();
}

export { dropPaymentForm };
