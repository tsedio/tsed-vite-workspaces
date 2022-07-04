import { TodoModel } from "@project/domain";
import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";

import { MongooseRepository } from "../mongoose/MongooseRepository";

@Injectable()
export class TodosRepository extends MongooseRepository<TodoModel> {
  @Inject(TodoModel)
  protected model: MongooseModel<TodoModel>;
}
