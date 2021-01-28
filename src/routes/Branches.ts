import { FastifyApp, Services } from "../types/common";
import { CreateBranchIRoute, UpdateBranchIRoute } from "../types/Types";
import CreateBranch from "../schemas/CreateBranch.json";
import GetBranch from "../schemas/GetBranch.json";
import UpdateBranch from "../schemas/UpdateBranch.json";
import {
  createBranch,
  getBranchs,
  IGetBranch,
  updateBranch,
} from "../utils/Github/Branches";

export function initBranchRoutes(app: FastifyApp, {}: Services) {
  app.post<{
    Body: CreateBranchIRoute;
  }>(
    "/",
    {
      schema: {
        body: CreateBranch,
      },
    },
    async (req, res) => {
      const { owner, repo, title } = req.body;

      try {
        const response = await createBranch({
          owner,
          repo,
          title,
        });

        return res.status(200).send(response);
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    },
  );

  app.patch<{
    Body: UpdateBranchIRoute;
  }>(
    "/",
    {
      schema: {
        body: UpdateBranch,
      },
    },
    async (req, res) => {
      const {
        branchCode,
        state,
        owner,
        repo,
        title,
        body,
        assignee,
        assignees,
      } = req.body;

      try {
        const response = await updateBranch({
          branchCode,
          state,
          owner,
          repo,
          title,
          body,
          assignee,
          assignees,
        });

        return res.status(200).send(response);
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    },
  );

  app.get<{
    Params: IGetBranch;
  }>(
    "/:owner/:repo",
    {
      schema: {
        params: GetBranch,
      },
    },
    async (req, res) => {
      const { owner, repo } = req.params;

      try {
        const response = await getBranchs({
          owner,
          repo,
        });

        return res.status(200).send(response);
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    },
  );
}
