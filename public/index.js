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

  const investmentAmount = fd.get("investment-amount");
  const goldPriceFloat = parseFloat(priceDisplayEl.textContent);
  const amountPaidFloat = parseFloat(investmentAmount);

  const investment = {
    amountPaid: amountPaidFloat,
    goldPrice: goldPriceFloat,
  };

  fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(investment),
  })
    .then(res => res.json())
    .then(data => {
      //console.log(data)
    });
});
