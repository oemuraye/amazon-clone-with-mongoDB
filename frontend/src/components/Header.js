import { getUserInfo } from "../localStorage";

const Header = {
  render: () => {
    const { name } = getUserInfo();
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
            </div>
        `;
  },
  after_render: () => {},
};

export default Header;
