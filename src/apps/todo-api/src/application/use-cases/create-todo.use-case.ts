import { Inject, Injectable } from "@nestjs/common";
import { CreateTodoDto } from "../dtos/create-todo.dto";
import { Todo } from "../../core/entities/todo.entity";
import { ITodoRepository } from "../../core/interfaces/todo-repository.interface";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CreateTodoUseCase {
  constructor(
    @Inject("ITodoRepository")
    private readonly todoRepository: ITodoRepository,
  ) {}

  public async execute(dto: CreateTodoDto): Promise<Todo> {
    const todo = Todo.create(uuidv4(), dto.title, dto.description);
    return await this.todoRepository.save(todo);
  }
}
