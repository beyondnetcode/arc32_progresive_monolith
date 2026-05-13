import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoModule } from "./infrastructure/todo.module";
import { TodoOrmEntity } from "./infrastructure/database/entities/todo.orm-entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USER || "ums_user",
      password: process.env.DB_PASSWORD || "ums_password",
      database: process.env.DB_NAME || "ums_db",
      entities: [TodoOrmEntity],
      synchronize: true, // Only for demo
    }),
    TodoModule,
  ],
})
export class AppModule {}
