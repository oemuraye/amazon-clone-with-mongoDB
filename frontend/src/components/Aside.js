const Aside = {
    after_render: async () => {
      document.getElementById("main-container").addEventListener('click', () => {
        document.getElementById("aside-container").classList.remove("open")
      })
      document
        .getElementById("aside-close-button")
        .addEventListener("click", async () => {
          document.getElementById("aside-container").classList.remove("open");
        });
    },
  render: async () => {
    return `
      <div class="aside-header">
          <div>SHOP BY CATEGORY</div>
          <button class="aside-close-button" id="aside-close-button">x</button>
      </div>
      <div class="aside-body">
          <ul class="categories">
            <li>
                <a href="/#/?q=shirt"
                >Shirts
                <span><i class="fa fa-chevron-right"></i></span>
                </a>
            </li>
            <li>
                <a href="/#/?q=pant"
                >Pants
                <span><i class="fa fa-chevron-right"></i></span>
                </a>
            </li> 
            <li>
                <a href=""
                >All Categories
                <span><i class="fa fa-chevron-right"></i></span>
                </a>
            </li> 
          </ul>
      </div>`;
  }
};

export default Aside;
