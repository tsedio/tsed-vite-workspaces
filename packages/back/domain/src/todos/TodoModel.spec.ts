import { PlatformTest } from "@tsed/common";
import { getJsonSchema } from "@tsed/schema";

import { TodoModel } from "./TodoModel";

describe("TodoModel", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("generate the expected schema", () => {
    const schema = getJsonSchema(TodoModel);
    expect(schema).toMatchSnapshot();
  });
});
