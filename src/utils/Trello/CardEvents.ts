import { config } from "../../services/CreateWebHook";
import { CardInfo } from "../../types/Card";
import { WebhookPostIRoute } from "../../types/WebhookTypes";
import { formatTitle } from "../Formatting";
import { createBranch, createBranchPullRequest } from "../Github/Branches";
import fetch from "node-fetch";

export async function getCardInfo(id: string) {
  console.log({ id });
  let response = await fetch(
    `https://api.trello.com/1/cards/${id}?token=${config.TRELLO_TOKEN}&key=${config.TRELLO_KEY}`
  );

  let responseJSON: CardInfo = await response.json();

  return responseJSON;
}

export async function mapLabelsFromConfig() {}

export async function updateCardInfo(id: string, newDescription: string) {
  let response = await fetch(
    `https://api.trello.com/1/cards/${id}?token=${config.TRELLO_TOKEN}&key=${config.TRELLO_KEY}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        desc: newDescription,
      }),
    }
  );

  let responseJSON: CardInfo = await response.json();

  return responseJSON;
}

export async function cardEventCreateBranch(
  webhookData: WebhookPostIRoute["action"]["data"]
) {
  let cardInfo = await getCardInfo(webhookData.card.id);

  console.log({ cardInfo });

  /**
   * For each label that this card has, create a branch.
   *
   * The information that maps each label name
   * into the repository whose branch is going to be
   * created is found in config.json.
   *
   * For the schema to this .json, check types/Config.d.ts
   */
  let status = await Promise.all(
    cardInfo.labels.map(async (label) => {
      let { name } = label;

      // Maps the config repo to the one from the webhook
      let repoFromConfig = config.BOARDS.find(
        (b) => b.id === webhookData.board.id
      );

      console.log({ repoFromConfig });

      if (!repoFromConfig)
        return {
          message: `Repository with board id ${webhookData.board.id} not found! Check config.json.`,
        };

      // Inside the config repo, find the label
      let labelFromConfig = repoFromConfig.labels.find((l) => l.name === name);

      console.log({ labelFromConfig });

      if (!labelFromConfig)
        return {
          message:
            `Repository with board id ${webhookData.board.id} doesn't` +
            ` have a label with the name ${name}! Check config.json.`,
        };

      console.log({
        ...labelFromConfig,
        title: formatTitle(webhookData.card.name),
      });

      try {
        let branchTitle = formatTitle(webhookData.card.name);

        await updateCardInfo(
          cardInfo.id,
          `https://github.com/${labelFromConfig.owner}/${
            labelFromConfig.repo
          }/tree/${encodeURIComponent(branchTitle)}`
        );

        // Create the branch in the repo!
        return await createBranch({
          ...labelFromConfig,
          title: branchTitle,
        });
      } catch (err) {
        console.log({ err });
      }
    })
  );

  return { status };
}

export async function cardEventCreatePullRequest(
  webhookData: WebhookPostIRoute["action"]["data"]
) {
  let cardInfo = await getCardInfo(webhookData.card.id);

  let status = await Promise.all(
    cardInfo.labels.map(async (label) => {
      let { name } = label;

      // Maps the config repo to the one from the webhook
      let repoFromConfig = config.BOARDS.find(
        (b) => b.id === webhookData.board.id
      );

      console.log({ repoFromConfig });

      if (!repoFromConfig)
        return {
          message: `Repository with board id ${webhookData.board.id} not found! Check config.json.`,
        };

      // Inside the config repo, find the label
      let labelFromConfig = repoFromConfig.labels.find((l) => l.name === name);

      console.log({ labelFromConfig });

      if (!labelFromConfig)
        return {
          message:
            `Repository with board id ${webhookData.board.id} doesn't` +
            ` have a label with the name ${name}! Check config.json.`,
        };

      console.log({
        ...labelFromConfig,
        title: formatTitle(webhookData.card.name),
      });

      try {
        // Create the branch in the repo!
        return await createBranchPullRequest({
          head: decodeURIComponent(cardInfo.desc.split("/").pop() || ""),
          repo: labelFromConfig.repo,
          owner: labelFromConfig.owner,
        });
      } catch (err) {
        console.log({ err });
      }
    })
  );

  return { status };
}
