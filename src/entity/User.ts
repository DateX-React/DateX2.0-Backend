import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "integer" })
  age: number;
}
