import { Default, Example, MaxLength, MinLength, Required } from "@tsed/schema";

export class TaskModel {
  @Required()
  @MinLength(3)
  @MaxLength(200)
  @Example("My task title")
  title: string;

  @Required()
  @Default(false)
  done: boolean = false;
}
