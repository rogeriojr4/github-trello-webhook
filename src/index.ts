import fastify from "fastify";
import { initWebhookRoutes } from "./routes/Webhook";
import { initDocumentation } from "./services/Documentation";
import fastifyCors from "fastify-cors";
import { Route } from "./types/common";
import { initBranchRoutes } from "./routes/Branches";
import { initWebhooks } from "./services/CreateWebHook";

/**
 * Main server:
 *
 * Initialize the services, pass it to the routes and initialize
 * the routes.
 */

const app = fastify();
app.register(fastifyCors);

const API_VERSION = "v0.1.0";

async function main() {
  await initWebhooks();
  initDocumentation(app, API_VERSION);

  /**
   * Route array with prefixes
   */
  const Routes: Route[] = [
    {
      init: initBranchRoutes,
      prefix: "/branch",
    },
    {
      init: initWebhookRoutes,
      prefix: "/",
    },
  ];

  // Initialize all the routes in the array, passing the db for
  // operations and the app for creating handlers
  Routes.forEach((route) => {
    app.register(
      (app, opts, done) => {
        route.init(app, {});
        console.log(`Initialized ${route.prefix}!`);
        done();
      },
      {
        prefix: route.prefix,
      }
    );
  });

  await app.ready();
  app.swagger();

  let listeningResult = await app.listen(8100, "0.0.0.0");
  console.log(`Fastify initialized at ${listeningResult}`);
}

main();
