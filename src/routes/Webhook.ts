import { FastifyApp, Services } from "../types/common";
import { WebhookPostIRoute } from "../types/WebhookTypes";
import {
  cardEventCreateBranch,
  cardEventCreatePullRequest
} from "../utils/Trello/CardEvents";

export function initWebhookRoutes(app: FastifyApp, {}: Services) {
  app.head<{}>(
    "/",
    {
      prefixTrailingSlash: "no-slash",
      schema: {},
    },
    async (req, res) => {
      return res.status(200).send({
        status: "ok",
      });
    }
  );

  app.post<{ Body: WebhookPostIRoute }>(
    "/",
    {
      prefixTrailingSlash: "no-slash",
      schema: {},
    },
    async (req, res) => {
      console.log("webhook!");
      const webhookData = req.body.action.data;

      const { listBefore, listAfter } = webhookData;

      let status: any;
      // If a card is moving from "To do" to "Doing"
      if (listBefore.name === "To do" && listAfter.name === "Doing") {
        status = await cardEventCreateBranch(webhookData);
      } else if (listBefore.name === "Doing" && listAfter.name === "Review") {
        status = await cardEventCreatePullRequest(webhookData);
      }

      return res.status(200).send({
        status,
      });
    }
  );
}
