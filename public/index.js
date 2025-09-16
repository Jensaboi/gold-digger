const priceDisplayEl = document.getElementById("price-display");
const connectionStatusEl = document.getElementById("connection-status");
const investInputEl = document.getElementById("investment-amount");
const form = document.querySelector("form");

const eventSource = new EventSource("/api/gold/live");

eventSource.onmessage = event => {
  const data = JSON.parse(event.data);
  connectionStatusEl.textContent = "Live Price 🟢";
  priceDisplayEl.textContent = data.price;
  console.log(data.price);
};

eventSource.onerror = event => {
  connectionStatusEl.textContent = "Disconnected 🔴";
};

form.addEventListener("submit", e => {
  e.preventDefault();

  const fd = new FormData(form);

  const investment = {
    date: new Date().toISOString(),
    goldPrice: priceDisplayEl.textContent,
    buyPrice: fd.get("investment-amount"),
  };

  console.log(investment);
});
