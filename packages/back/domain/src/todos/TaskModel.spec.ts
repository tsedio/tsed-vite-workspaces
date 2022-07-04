import { PlatformTest } from "@tsed/common";
import { getJsonSchema } from "@tsed/schema";

import { TaskModel } from "./TaskModel";

describe("TaskModel", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("generate the expected schema", () => {
    const schema = getJsonSchema(TaskModel);

    expect(schema).toEqual({
      properties: {
        done: {
          default: false,
          type: "boolean"
        },
        title: {
          examples: ["My task title"],
          maxLength: 200,
          minLength: 3,
          type: "string"
        }
      },
      required: ["title", "done"],
      type: "object"
    });
  });
});
