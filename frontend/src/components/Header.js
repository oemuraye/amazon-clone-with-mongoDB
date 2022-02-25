import { getCartItems, getUserInfo } from "../localStorage"
import {parseRequestUrl } from "../utils"

const Header = {
  after_render: () => {
    document.getElementById('search-form').addEventListener('submit', async (e) => {
      e.preventDefault()
      const searchKeyword = document.getElementById("q").value;
      document.location.hash = `/?q=${searchKeyword}`
    })

    document.getElementById('aside-open-button').addEventListener('click', async () => {
      document.getElementById('aside-container').classList.add('open')
    })
  },
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    // const {cartItems} = getCartItems()
    // let numOfItems = 0

    return `
            <div class="brand">
                <button id="aside-open-button">
                  &#9776;
                </button>
                <a href="">Pius-King </a>
            </div>
            <div class="search">
              <form class="search-form"  id="search-form">
                <input type="text" name="q" id="q" value="${value || ""}" /> 
                <button type="submit"><i class="fa fa-search"></i></button>
              </form>        
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
};

export default Header;
