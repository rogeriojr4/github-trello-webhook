import { FastifyApp, Services } from "../types/common";

export function initExampleRoutes(app: FastifyApp, {}: Services) {
  app.head<{
  }>(
    "/",
    {
      schema: {
      },
    },
    async (req, res) => {
      return res.status(200).send({
        status: 'ok',
      });
    }
  );
  app.post<{
  }>(
    "/",
    {
      schema: {
      },
    },
    async (req, res) => {
      //@ts-ignore
      console.log('type', req.body.action.type);
      //@ts-ignore
      console.log('data', req.body.action.data);
      //@ts-ignore
      console.log('display', req.body.action.display);
      console.log('allData', req.body);
      return res.status(200).send({
        status: 'ok',
      });
    }
  );
}
