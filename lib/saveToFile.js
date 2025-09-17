import path from "node:path";
import fs from "node:fs/promises";

export async function saveToFile(investment, dirname) {
  const dataStr = `${investment.now}, amount paid: £${investment.amountPaid}, price per Oz: £${investment.goldPrice}, gold sold: ${investment.goldAmountBought} Oz`;

  try {
    const pathToFile = path.join(dirname, "data", "data.text");
    let file = await fs.readFile(pathToFile);
    file += `${dataStr}\n`;
    await fs.writeFile(pathToFile, file);
  } catch (err) {
    console.error(err);
  }
}
