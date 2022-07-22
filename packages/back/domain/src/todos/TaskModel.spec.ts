import { PlatformTest } from "@tsed/common";
import { getJsonSchema } from "@tsed/schema";

import { TaskModel } from "./TaskModel";

describe("TaskModel", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("generate the expected schema", () => {
    const schema = getJsonSchema(TaskModel);

    expect(schema).toMatchSnapshot();
  });
});
