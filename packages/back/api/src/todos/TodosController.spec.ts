import { PlatformTest } from "@tsed/common";

import { TodosController } from "./TodosController";

describe("TodosController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<TodosController>(TodosController);
    // const instance = PlatformTest.invoke<TodosController>(TodosController); // get fresh instance

    expect(instance).toBeInstanceOf(TodosController);
  });
});
