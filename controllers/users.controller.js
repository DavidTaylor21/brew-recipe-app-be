import { addUserToDb, getUserByEmail} from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const addUser = async (req, reply) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;
  const SECRET_KEY = process.env.JWT_SECRET;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      email,
      password: hash,
      createdAt: new Date().toISOString(),
    };

    const createdUser = await addUserToDb(newUser);
    const token = jwt.sign(
      {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
      },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    console.log({ createdUser, token });
    reply.code(201).send({ createdUser, token });
  } catch (error) {
    if (error.code === "P2002") {
      const existingField = error.meta.target[0];
      reply.code(500).send({ msg: `${existingField} already exists` });
    }
    reply.code(500).send({ msg: "Failed to add user", error });
  }
};

export const loginUser = async (req, reply) => {
  const { email, password } = req.body;
  const SECRET_KEY = process.env.JWT_SECRET;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return reply.code(401).send({ error: "Invalid email or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return reply.code(401).send({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ user }, SECRET_KEY, {
      expiresIn: "7d",
    });
    reply.code(200).send({ message: "Login successful", token, user });
  } catch (err) {
    console.error("Login error:", err);
    reply.code(500).send({ error: "Internal server error" });
  }
};
