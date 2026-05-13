import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity("todos")
export class TodoOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
