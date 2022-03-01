// import Chartist from 'chartist'
import { getSummary } from "../api"
import DashboardMenu from "../components/DashboardMenu"

const DashboardScreen = {
    after_render: async () => {
        const summary = await getSummary();
        new Chartist.Line(
          ".ct-chart-line",
          {
            labels: summary.dailyOrders.map((x) => x._id),
            series: [summary.dailyOrders.map((x) => x.sales)],
          },
          {
            type: Chartist.AutoScaleAxis,
            showArea: true,
            height: 300 + 20,
          }
        );
        const pieChart = new Chartist.Pie(
          ".ct-chart-pie",
          {
            labels: summary.productCategories.map((x) => x._id),
            series: summary.productCategories.map((x) => x.count),
          },
          {
            // width: 300 + 20,
            height: 300 + 20,
            donut: true,
            donutWidth: 100,
            donutSolid: true,
            startAngle: 270,
            showLabel: true,
          }
        );
        // pieChart.on("draw", function (context) {
        //   if (context.type === "pie") {
        //     context.element.attr({
        //       style:
        //         "stroke: hsl(" +
        //         Math.floor(
        //           (Chartist.getMultiValue(context.value) / max) * 100
        //         ) +
        //         ", 50%, 50%);",
        //     });
        //   }
        // });
    },
    render: async () => {
        const summary = await getSummary()
        return `
            <div class="dashboard">
                ${DashboardMenu.render({ selected: "dashboard" })}
                <div class="dashboard-content">
                    <h1>Dashboard</h1>
                    
                    <ul class="summary-items">
                        <li>
                            <div class="summary-title color1">
                            <span><i class="fa fa-users"></i> Users</span>
                            </div>
                            <div class="summary-body">${summary.users[0].numUsers}</div>
                        </li>
                        <li>
                            <div class="summary-title color2">
                            <span><i class="fa fa-users"></i> Orders</span>
                            </div>
                            <div class="summary-body">${summary.orders[0].numOrders}</div>
                        </li>
                        <li>
                            <div class="summary-title color3">
                            <span><i class="fa fa-users"></i> Sales</span>
                            </div>
                            <div class="summary-body">$${summary.orders[0].totalSales}</div>
                        </li>
                    </ul>

                    <div class="charts">
                        <div>
                            <h2>Sales</h2>
                            <div class="ct-perfect-fourth ct-chart-line"></div>
                        </div>
                        <div>
                            <h2>Categories</h2>
                            <div class="ct-perfect-fourth ct-chart-pie"></div>
                        </div>
                    </div>  
                </div>
            </div>
        `;
    }
}
export default DashboardScreen