import { PlatformTest } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { TestMongooseContext } from "@tsed/testing-mongoose";
import { readJsonSync } from "fs-extra";
import SuperTest, { SuperTest as Request, Test } from "supertest";

import { Server } from "./Server";

describe("Server", () => {
  let request: Request<Test>;

  beforeEach(TestMongooseContext.bootstrap(Server, { platform: PlatformExpress }));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(TestMongooseContext.reset);

  it("should call GET /rest", async () => {
    const response = await request.get("/rest").expect(404);

    expect(response.body).toEqual({
      errors: [],
      message: 'Resource "/rest" not found',
      name: "NOT_FOUND",
      status: 404
    });
  });
  it("should call GET /rest/version", async () => {
    const response = await request.get("/rest/version").expect(200);

    expect(response.body).toEqual({
      version: readJsonSync("./package.json").version
    });
  });
});
