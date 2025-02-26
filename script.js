let orderQueue = [];
let isProcessing = false;
let orderId = 1;

let orderData = Array(10).fill(0);
let processData = Array(10).fill(0);

const orderChartCtx = document.getElementById("orderChart").getContext("2d");
const processChartCtx = document
  .getElementById("processChart")
  .getContext("2d");

const orderChart = new Chart(orderChartCtx, {
  type: "line",
  data: {
    labels: Array(10)
      .fill("")
      .map((_, i) => `-${45 - i * 5}s`),
    datasets: [
      {
        label: "Số đơn đặt mỗi 5 giây",
        data: orderData,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true, max: 8 },
    },
  },
});

const processChart = new Chart(processChartCtx, {
  type: "line",
  data: {
    labels: Array(10)
      .fill("")
      .map((_, i) => `-${45 - i * 5}s`),
    datasets: [
      {
        label: "Số món xử lý mỗi 5 giây",
        data: processData,
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true, max: 8 },
    },
  },
});

function placeOrder() {
  const order = `Món #${orderId++}`;
  orderQueue.push(order);
  orderData[9]++;
  updateQueueDisplay();
  processOrders();
}

function updateQueueDisplay() {
  document.getElementById("orderQueue").innerHTML = orderQueue
    .map((order) => `<div class="order">${order}</div>`)
    .join("");
}

function processOrders() {
  if (isProcessing || orderQueue.length === 0) return;

  isProcessing = true;
  const currentOrder = orderQueue.shift();
  updateQueueDisplay();

  document.getElementById(
    "processingOrder"
  ).innerHTML = `<span>⏳ Đang chế biến: ${currentOrder}</span>`;

  setTimeout(() => {
    document.getElementById(
      "processingOrder"
    ).innerHTML = `✅ Hoàn thành: ${currentOrder}`;
    processData[9]++;
    isProcessing = false;
    processOrders();
  }, 2500);
}

function updateCharts() {
  orderData.shift();
  orderData.push(0);

  processData.shift();
  processData.push(0);

  orderChart.update();
  processChart.update();
}

setInterval(updateCharts, 5000);
