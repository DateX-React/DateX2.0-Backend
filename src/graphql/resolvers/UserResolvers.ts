import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source/AppDataSource";
import { generateToken } from "../../util/jwt-functions";

const userRepository = AppDataSource.getRepository(User);

export default {
  Query: {
    getUser: async () => {
      const users = await userRepository.find();

      return users;
    },
  },
  Mutation: {
    register: async (
      _: any,
      { registerInput: { username, email, password, age } }: any
    ) => {
      // check if username has already been taken
      const searchUsername = await userRepository.findOneBy({
        username,
      });

      if (searchUsername) {
        throw new Error("Register: Username has already been taken");
      }
      // check if password has already been taken
      const searchEmail = await userRepository.findOneBy({ email });

      if (searchEmail) {
        throw new Error("Register: Email has already been taken");
      }

      // encrypt password using bcrypt
      password = await bcrypt.hash(password, 12);

      // create a new user for saving in postgres
      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.password = password;
      newUser.age = age;
      newUser.id = uuidv4();

      // save new user in postgres
      const res = await userRepository.save(newUser);

      const token = generateToken(res);

      return {
        ...res,
        token,
      };
    },
    login: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      // check if user exists in database
      const user = await userRepository.findOneBy({ username });

      if (!user) throw new Error("Login: User does not exist");

      // check if password is correct
      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );
      if (!passwordMatch)
        throw new Error("Login: Incorrect password");

      const token = generateToken(user);

      return {
        ...user,
        token,
      };
    },
  },
};
