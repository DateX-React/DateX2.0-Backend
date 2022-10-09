import { config } from "dotenv";
config();
import { GraphQLTestClient } from "./GraphQLTestClient";
import { login_mutation, register_mutation, get_user_query } from "./query";
import { GraphQLError } from "graphql";
import { AppDataSource } from "../src/data-source/AppDataSource";

beforeEach(() => {
    const startDb = async () => {
        await AppDataSource.initialize();
    };

    return startDb();
});

afterEach(() => {
    const closeDb = async () => {
        await AppDataSource.destroy();
    };

    return closeDb();
});

// beforeAll(() => {
//     const dropDb = async () => {
//         await AppDataSource.initialize();

//         return AppDataSource.dropDatabase();
//     };
//     return dropDb();
// });

afterAll(() => {
    const dropDb = async () => {
        await AppDataSource.initialize();

        return AppDataSource.dropDatabase();
    };
    return dropDb();
});

test("get user resolver should return user error", async () => {
    const response = await GraphQLTestClient(get_user_query, {
        username: "dio",
    });
    expect(response.errors).toStrictEqual([
        new GraphQLError("GetUser: Username(dio) not found"),
    ]);
});

test("register resolver should return new user", async () => {
    const response = await GraphQLTestClient(register_mutation, {
        registerInput: {
            username: "dio",
            password: "iamdio",
            email: "dio@email.com",
            age: 24,
        },
    });
    expect(response.data?.register).toHaveProperty("username", "dio");
    expect(response.data?.register).toHaveProperty("email", "dio@email.com");
    expect(response.data?.register).toHaveProperty("age", 24);
});

test("register resolver result should include jwt", async () => {
    const response = await GraphQLTestClient(register_mutation, {
        registerInput: {
            username: "kars",
            password: "perfect_kars",
            email: "kars1@email.com",
            age: 30,
        },
    });
    expect(response.data?.register).toHaveProperty("token");
});

test("get user resolver should return existing user", async () => {
    const response = await GraphQLTestClient(get_user_query, {
        username: "kars",
    });
    expect(response.data?.getUser).toHaveProperty("username", "kars");
    expect(response.data?.getUser).toHaveProperty("email", "kars1@email.com");
    expect(response.data?.getUser).toHaveProperty("age", 30);
});

test("login resolver should return user", async () => {
    const response = await GraphQLTestClient(login_mutation, {
        username: "dio",
        password: "iamdio",
    });
    expect(response.data?.login).toHaveProperty("username", "dio");
    expect(response.data?.login).toHaveProperty("email", "dio@email.com");
    expect(response.data?.login).toHaveProperty("age", 24);
});

test("login resolver result should include token", async () => {
    const response = await GraphQLTestClient(login_mutation, {
        username: "dio",
        password: "iamdio",
    });
    expect(response.data?.login).toHaveProperty("token");
});

test("login resolver should throw error for wrong password", async () => {
    const response = await GraphQLTestClient(login_mutation, {
        username: "dio",
        password: "passwords",
    });
    expect(response.errors).toStrictEqual([
        new GraphQLError("Login: Incorrect password"),
    ]);
});

test("login resolver should throw error for non existent username", async () => {
    const response = await GraphQLTestClient(login_mutation, {
        username: "notuser",
        password: "iamdio",
    });
    expect(response.errors).toStrictEqual([
        new GraphQLError("Login: User does not exist"),
    ]);
});

test("register resolver should return error if username exists", async () => {
    const response = await GraphQLTestClient(register_mutation, {
        registerInput: {
            username: "dio",
            password: "iamdio",
            email: "lorddio@email.com",
            age: 24,
        },
    });

    expect(response.errors).toStrictEqual([
        new GraphQLError("Register: Username has already been taken"),
    ]);
});

test("register resolver should return error if email exists", async () => {
    const response = await GraphQLTestClient(register_mutation, {
        registerInput: {
            username: "wamuu",
            password: "iamdio",
            email: "kars1@email.com",
            age: 24,
        },
    });

    expect(response.errors).toStrictEqual([
        new GraphQLError("Register: Email has already been taken"),
    ]);
});
