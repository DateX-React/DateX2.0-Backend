import jwt from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET as string;

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    age: number;
};

export function generateToken(user: User) {
    const { username, email, id } = user;

    const token = jwt.sign({ username, email, id }, secret_key, {
        expiresIn: "2h",
    });

    return token;
}

export function validateToken(token: string) {
    const user = jwt.verify(token, secret_key);

    return user;
}
