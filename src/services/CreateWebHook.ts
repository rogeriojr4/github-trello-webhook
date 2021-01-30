import fetch from "node-fetch";
import { Config } from "../types/Config";
export const config: Config = require("../../config.json");

export async function initWebhooks() {
  await Promise.all(
    config.BOARDS.map(async (board) => {
      try {
        await fetch(
          `https://api.trello.com/1/webhooks/?token=${config.TRELLO_TOKEN}&key=${config.TRELLO_KEY}&callbackURL=${config.APP_URL}&idModel=${board.id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          }
        );
      } catch (err) {
      } finally {
        console.log(`${board.name} webhook initialized!`);
      }
    })
  );
}
