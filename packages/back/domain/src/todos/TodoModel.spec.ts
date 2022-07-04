import { PlatformTest } from "@tsed/common";
import { getJsonSchema } from "@tsed/schema";

import { TodoModel } from "./TodoModel";

describe("TodoModel", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("generate the expected schema", () => {
    const schema = getJsonSchema(TodoModel);
    expect(schema).toEqual({
      definitions: {
        TaskModel: {
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
        }
      },
      properties: {
        id: {
          description: "Mongoose ObjectId",
          examples: ["5ce7ad3028890bd71749d477"],
          pattern: "^[0-9a-fA-F]{24}$",
          type: "string"
        },
        status: {
          default: "CREATED",
          enum: ["CREATED", "IN_PROGRESS", "DONE"],
          minLength: 1,
          type: "string"
        },
        tasks: {
          items: {
            $ref: "#/definitions/TaskModel"
          },
          maxItems: 20,
          type: "array"
        },
        title: {
          examples: ["My todo title"],
          maxLength: 200,
          minLength: 3,
          type: "string"
        }
      },
      required: ["title", "tasks", "status"],
      type: "object"
    });
  });
});
