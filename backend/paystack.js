import config from "./config";

export const paystack = (request) => {
  const MySecretKey = config.PAYSTACK_SECRET;
  //sk_test_xxxx to be replaced by your own secret key
  const initializePayment = (form, mycallback) => {
    const option = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        authorization: MySecretKey,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      form: {
        orderID: data.orderID,
        payerID: data.payerID,
        paymentID: paymentID,
        totalPrice: totalPrice,
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(option, callback);
  };
  const verifyPayment = (ref, mycallback) => {
    const option = {
      url:
        "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
      headers: {
        authorization: MySecretKey,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(option, callback);
  };
  return { initializePayment, verifyPayment };
}