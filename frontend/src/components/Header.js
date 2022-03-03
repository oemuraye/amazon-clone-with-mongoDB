import { getCartItems, getUserInfo } from "../localStorage.js";
import {parseRequestUrl } from "../utils.js"

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
    const cartItems = getCartItems();
    if (cartItems.length >= 1) {
      
      document.getElementById('shop-cart').classList.add('badge')
    }
  },
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    const cartItems = getCartItems()
    const cartNum = () => {
      let numOfItems = ''
      if (cartItems.length === 0) {
        numOfItems
      } else {
        numOfItems = cartItems.length
      }
      return numOfItems
    }

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
                    ? `<a href="/#/profile">${name.substring(0, 5)}.</a>`
                    : `<a href="http:/#/signin">Sign-In <Span class="fa fa-user"></Span> </a>`
                }
                <a href="http:/#/cart">Cart <span class="fa fa-cart-plus"><i id="shop-cart" class="">${cartNum()}</i> </span> </a>
                ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ""}
            </div>
            <div class="search-mobile search ">
              <form class="search-form"  id="search-form">
                <input type="text" name="q" id="q" value="${value || ""}" /> 
                <button type="submit"><i class="fa fa-search"></i></button>
              </form>        
            </div>
        `;
  },
};

export default Header;
