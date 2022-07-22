#!/usr/bin/env node
import { CliCore } from "@tsed/cli-core";
import { GenerateHttpClientCmd } from "@tsed/cli-generate-http-client";

import { config } from "../config";
import { Server } from "../Server";

CliCore.bootstrap({
  ...config,
  mongoose: [],
  server: Server,
  // add your custom commands here
  commands: [GenerateHttpClientCmd],
  httpClient: {
    transformOperationId(operationId: string) {
      return operationId.replace(/Controller/g, "");
    }
  }
}).catch(console.error);
