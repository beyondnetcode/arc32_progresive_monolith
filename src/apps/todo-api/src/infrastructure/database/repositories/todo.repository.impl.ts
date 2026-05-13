import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ITodoRepository } from "../../../core/interfaces/todo-repository.interface";
import { Todo } from "../../../core/entities/todo.entity";
import { TodoOrmEntity } from "../entities/todo.orm-entity";

@Injectable()
export class TodoRepositoryImpl implements ITodoRepository {
  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly ormRepository: Repository<TodoOrmEntity>,
  ) {}

  public async save(todo: Todo): Promise<Todo> {
    const ormEntity = this.ormRepository.create(todo);
    const saved = await this.ormRepository.save(ormEntity);
    return new Todo(saved.id, saved.title, saved.description, saved.completed, saved.createdAt, saved.updatedAt);
  }

  public async findAll(): Promise<Todo[]> {
    const entities = await this.ormRepository.find();
    return entities.map(e => new Todo(e.id, e.title, e.description, e.completed, e.createdAt, e.updatedAt));
  }

  public async findById(id: string): Promise<Todo | null> {
    const e = await this.ormRepository.findOneBy({ id });
    return e ? new Todo(e.id, e.title, e.description, e.completed, e.createdAt, e.updatedAt) : null;
  }
}
