import { PlatformTest } from "@tsed/common";

import { TodosRepository } from "./TodosRepository";

describe("TodosService", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<TodosRepository>(TodosRepository);
    // const instance = PlatformTest.invoke<TodosService>(TodosService); // get fresh instance

    expect(instance).toBeInstanceOf(TodosRepository);
  });
});
