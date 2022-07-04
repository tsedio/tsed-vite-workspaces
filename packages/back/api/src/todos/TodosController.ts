import { TodoModel } from "@project/domain";
import { TodosRepository } from "@project/infra";
import { Controller, Inject } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { ObjectID } from "@tsed/mongoose";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Description, Get, Groups, Name, Post, Put, Required, Returns, Summary } from "@tsed/schema";

@Controller("/todos")
@Name("Todos")
export class TodosController {
  @Inject()
  protected repository: TodosRepository;

  @Get("/:id")
  @Summary("Return a todo")
  @Returns(200, TodoModel)
  @Returns(404)
  async get(@Required() @PathParams("id") @ObjectID() id: string) {
    const todo = await this.repository.getById(id);

    if (!todo) {
      throw new NotFound("Todo not found");
    }

    return todo;
  }

  @Post("/")
  @Summary("Create a new todo")
  @Returns(201, TodoModel)
  @Returns(400)
  async post(@Required() @BodyParams() @Groups("creation") payload: TodoModel) {
    return this.repository.save(payload);
  }

  @Put("/:id")
  @Summary("Update an existing todo")
  @Description("Update an existing todo. If the id doesn't a 404 will be emitted.")
  @Returns(200, TodoModel)
  @Returns(400)
  @Returns(404)
  async put(@Required() @PathParams("id") id: string, @Required() @BodyParams() payload: TodoModel) {
    await this.get(id);

    payload._id = id;

    return this.repository.save(payload);
  }

  @Delete("/:id")
  @Summary("Delete an existing todo")
  @Returns(204)
  @Returns(404)
  async remove(@Required() @PathParams("id") id: string) {
    await this.get(id);

    return this.repository.removeById(id);
  }

  @Get("/")
  @Summary("Return all todos")
  @Returns(200, Array).Of(TodoModel)
  list() {
    return this.repository.getAll();
  }
}
