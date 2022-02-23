import { getOrder, getPayStackID, payOrder } from "./api"
import { getUserInfo } from "./localStorage"
import OrderScreen from "./screens/OrderScreen"
// import PaystackPop from '@paystack/inline-js'

export const parseRequestUrl = () => {
    const address = document.location.hash.slice(1).split("?")[0];
    const queryString =
      document.location.hash.slice(1).split("?").length === 2
        ? document.location.hash.slice(1).split("?")[1]
        : "";

    const url = address.toLowerCase() || "/";
    const r = url.split("/");
    const q = queryString.split("=");
    return {
      resource: r[1],
      id: r[2],
      verb: r[3],
      name: q[0],
      value: q[1],
    };
}
export const rerender = async (component) => {
    document.getElementById("main-container").innerHTML = await component.render();
    await component.after_render()
}

export const showLoading = () => {
  document.getElementById("loading-overlay").classList.add("active");
};

export const hideLoading = () => {
  document.getElementById("loading-overlay").classList.remove("active");
};

export const showMessage = (message, callback) => {
  document.getElementById("message-overlay").innerHTML = `
    <div>
        <div id="message-overlay-content">${message}</div>
        <button id="message-overlay-close-button">OK</button>
    </div>
  `;
  document.getElementById("message-overlay").classList.add("active");
  document.getElementById('message-overlay-close-button').addEventListener('click', () => {
      document.getElementById('message-overlay').classList.remove('active')
      if (callback) {
          callback()
      }
  })
};

export const redirectUser = () => {
  if (getCartItems().length !== 0) {
    document.location.hash = "/shipping";
  } else {
    document.location.hash = "/";
  }
};

  export const payWithPaystack = async () => {
    const request  = parseRequestUrl()
    const payStackID = await getPayStackID()
    const { _id, totalPrice } = await getOrder(request.id);
    const {email, name} = await getUserInfo(request.id)
    const paystack =  new PaystackPop()
    paystack.newTransaction({
      key: payStackID,
      email: email,
      amount: totalPrice * 100,
      // ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: name,
            orderID: _id,
          },
        ],
      },
      onSuccess: async (transaction) => {
        showLoading();
        await payOrder(parseRequestUrl().id, {
          orderID: transaction.orderID,
          payerID: transaction.payerID,
          paymentID: transaction.paymentID,
        });
        hideLoading();
        rerender(OrderScreen);
      },
      onCancel: () => {
        showMessage("Transaction Unsuccessful");
        rerender(OrderScreen);
      },
    });
  }
