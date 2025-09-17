import path from "node:path";
import fs from "node:fs/promises";

export async function handlePost(req, res, dirname) {
  let body = "";
  try {
    req.on("data", chunk => {
      body += chunk;
    });
    await req.on("end", () => console.log(body));

    const investment = JSON.parse(body);
    const goldPricePerOz = investment.goldPrice;
    const amountPaid = investment.amountPaid;
    const now = new Date();

    const dataStr = `${now.toISOString()} amount paid: ${amountPaid}, price per oz: ${goldPricePerOz},`;
  } catch (err) {
    throw new Error(err);
  }
}

export async function handleGet(req, res, dirname) {}
