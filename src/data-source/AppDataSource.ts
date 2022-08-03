import { DataSource } from "typeorm";

import { User } from "../entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  username: "thinkpad",
  password: "670238",
  database: "datex",
  host: "localhost",
  entities: [User],
  synchronize: true,
});
