import { getCartItems, getUserInfo } from "../localStorage";

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    // const {cartItems} = getCartItems()
    // let numOfItems = 0

    return `
            <div>
                <a href="">Pius-King </a>
            </div>
            <div>
                ${
                  name
                    ? `<a href="/#/profile">${name}</a>`
                    : `<a href="http:/#/signin">Sign-In</a>`
                }
                <a href="http:/#/cart">Cart</a>
                ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ""}
            </div>
        `;
  },
  after_render: () => {},
};

export default Header;
