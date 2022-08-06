import { GraphQLTestClient } from "./GraphQLTestClient";
import { AppDataSource } from "../src/data-source/AppDataSource";
import { login_mutation, register_mutation } from "./query";
import { GraphQLError } from "graphql";

test("login resolver should return user", async () => {
  await AppDataSource.initialize();
  const response = await GraphQLTestClient(login_mutation, {
    username: "dude",
    password: "password",
  });
  expect(response.data?.login).toHaveProperty("username", "dude");
});

test("login resolver result should include token", async () => {
  const response = await GraphQLTestClient(login_mutation, {
    username: "dude",
    password: "password",
  });
  expect(response.data?.login).toHaveProperty("token");
});

test("login resolver should throw error for wrong password", async () => {
  const response = await GraphQLTestClient(login_mutation, {
    username: "dude",
    password: "passwords",
  });
  expect(response.errors).toStrictEqual([
    new GraphQLError("Login: Incorrect password"),
  ]);
});

test("login resolver should throw error for non existent user", async () => {
  const response = await GraphQLTestClient(login_mutation, {
    username: "notuser",
    password: "password",
  });
  expect(response.errors).toStrictEqual([
    new GraphQLError("Login: User does not exist"),
  ]);
});

test("register already existing user should throw error", async () => {
  const response = await GraphQLTestClient(register_mutation, {
    registerInput: {
      username: "new_user",
      password: "password",
      email: "newuser@email.com",
      age: 24,
    },
  });

  expect(response.errors).toStrictEqual([
    new GraphQLError("Register: Username has already been taken"),
  ]);
});
