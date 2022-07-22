import { PlatformTest } from "@tsed/common";
import { join } from "path";

import { VersionController } from "./VersionController";

describe("VersionCtrl", () => {
  beforeEach(() =>
    PlatformTest.create({
      rootDir: join(__dirname, "..", "..", ".."),
      version: "1.0.0"
    })
  );
  afterEach(() => PlatformTest.reset());
  it("should return version", async () => {
    const controller = PlatformTest.get<VersionController>(VersionController);

    expect(await controller.get()).toEqual({
      version: "1.0.0"
    });
  });
});
