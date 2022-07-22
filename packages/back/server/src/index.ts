import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";

import { Server } from "./Server";

async function bootstrap() {
  try {
    const platform = await PlatformExpress.bootstrap(Server);
    await platform.listen();

    const close = () => {
      $log.warn("Stop server gracefully...");

      platform
        .stop()
        .then(() => process.exit(0))
        .catch((error) => {
          console.error(error);
          process.exit(-1);
        });
    };

    process.on("SIGINT", close);
    process.on("SIGTERM", close);
  } catch (error) {
    $log.error({ event: "SERVER_BOOTSTRAP_ERROR", message: error.message, stack: error.stack });
  }
}

bootstrap();
