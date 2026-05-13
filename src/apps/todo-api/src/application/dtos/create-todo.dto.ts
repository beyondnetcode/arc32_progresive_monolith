import { IsNotEmpty, IsString, MinLength } from "class-validator";
export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  description: string;
}
