import { config } from "dotenv";
config();

import { User } from "../src/util/jwt-functions";
import { generateToken, validateToken } from "../src/util/jwt-functions";

let token: string;

const user: User = {
    id: "test_id",
    username: "test_username",
    password: "test_password",
    age: 20,
    email: "test_email",
};

beforeAll(() => {
    token = "";
});

afterAll(() => {
    token = "";
});

test("generate token method should return valid token for valid user", () => {
    const jwtRes = generateToken(user);
    token = jwtRes;
    expect(jwtRes).toBeDefined();
});

test("validate token should return user object used to sign token", () => {
    const user = validateToken(token);
    expect(user).toBeDefined();
    expect(user).toHaveProperty("username", "test_username");
    expect(user).toHaveProperty("id", "test_id");
    expect(user).toHaveProperty("email", "test_email");
});
