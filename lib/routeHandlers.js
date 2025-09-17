import { EventEmitter } from "events";
import { saveToFile } from "./saveToFile.js";

export const formSubmitEmitter = new EventEmitter();

export async function handlePost(req, res, dirname) {
  try {
    let body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => (data += chunk));
      req.on("end", () => resolve(data));
      req.on("error", err => reject(err));
    });

    const investment = JSON.parse(body);
    investment.now = new Date().toISOString();
    investment.goldAmountBought = (
      investment.amountPaid / investment.goldPrice
    ).toFixed(2);

    formSubmitEmitter.on("submit", saveToFile);

    formSubmitEmitter.emit("submit", investment, dirname);

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(investment));
  } catch (err) {
    console.error(err);
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: 400, message: "Bad request" }));
  }
}

export async function handleGet(req, res, dirname) {}
