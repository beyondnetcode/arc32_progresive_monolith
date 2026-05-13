import { Controller, Post, Body, Get, UsePipes, ValidationPipe, HttpCode, HttpStatus } from "@nestjs/common";
import { CreateTodoUseCase } from "../../application/use-cases/create-todo.use-case";
import { CreateTodoDto } from "../../application/dtos/create-todo.dto";

@Controller("todos")
export class TodoController {
  constructor(private readonly createTodoUseCase: CreateTodoUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  public async create(@Body() dto: CreateTodoDto) {
    const todo = await this.createTodoUseCase.execute(dto);
    return { success: true, message: "Todo created successfully.", data: todo };
  }

  @Get()
  public async getSample() {
    return {
      message: "Todo API is fully operational following Clean Architecture and OWASP security practices.",
      status: "healthy",
      timestamp: new Date().toISOString(),
    };
  }
}
