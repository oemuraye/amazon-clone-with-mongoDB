import DashboardMenu from "../components/DashboardMenu";

const OrderListScreen = {
  after_render: () => {},
  render: () => {
    return `
            <div class="dashboard">
                ${DashboardMenu.render({ selected: "orders" })}
                <div class="dashboard-content">
                    <h1>Orders</h1>
                    <div>
                        Info and Charts will be added here
                    </div>
                </div>
            </div>
        `;
  },
};
export default OrderListScreen;
