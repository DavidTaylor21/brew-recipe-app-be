import { addUserToDb , getUserByEmail} from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const addUser = async (req, reply) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

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

    reply.code(201).send({ createdUser });
  } catch (err) {
    console.error("Error adding user:", err);
    reply.code(500).send({ error: "Failed to add user" });
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
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });
    reply.code(200).send({ message: "Login successful", token, user });
  } catch (err){
    console.error("Login error:", err);
    reply.code(500).send({ error: "Internal server error" });
  }
};
