import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoController } from "./controllers/todo.controller";
import { CreateTodoUseCase } from "../application/use-cases/create-todo.use-case";
import { TodoOrmEntity } from "./database/entities/todo.orm-entity";
import { TodoRepositoryImpl } from "./database/repositories/todo.repository.impl";

@Module({
  imports: [TypeOrmModule.forFeature([TodoOrmEntity])],
  controllers: [TodoController],
  providers: [
    CreateTodoUseCase,
    {
      provide: "ITodoRepository",
      useClass: TodoRepositoryImpl,
    },
  ],
  exports: [CreateTodoUseCase],
})
export class TodoModule {}
