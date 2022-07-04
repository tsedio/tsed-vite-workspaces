import { Model, ObjectID } from "@tsed/mongoose";
import { CollectionOf, Default, Enum, Example, Groups, MaxItems, MaxLength, MinLength, Required } from "@tsed/schema";

import { TaskModel } from "./TaskModel";
import { TodoStatuses } from "./TodoStatuses";

@Model({ name: "todos" })
export class TodoModel {
  @ObjectID("id")
  @Groups("!creation")
  _id: string;

  @Required()
  @MinLength(3)
  @MaxLength(200)
  @Example("My todo title")
  title: string;

  @CollectionOf(TaskModel)
  @Required()
  @MaxItems(20)
  tasks: TaskModel[] = [];

  @Enum(TodoStatuses)
  @Required()
  @Default(TodoStatuses.CREATED)
  status: TodoStatuses = TodoStatuses.CREATED;
}
