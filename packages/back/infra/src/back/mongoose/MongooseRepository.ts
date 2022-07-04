import { MongooseModel } from "@tsed/mongoose";

export abstract class MongooseRepository<Model> {
  protected abstract model: MongooseModel<Model>;

  save(input: Model) {
    const instance = new this.model(input);

    return this.model.findOneAndUpdate({ _id: instance._id }, { $set: instance }, { upsert: true, new: true });
  }

  getById(id: string) {
    return this.model.findById(id);
  }

  getAll() {
    return this.model.find();
  }

  removeById(id: string) {
    return this.model.findByIdAndRemove(id);
  }
}
