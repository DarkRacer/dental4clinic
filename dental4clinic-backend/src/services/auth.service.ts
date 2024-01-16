import jwt from 'jsonwebtoken';
import { Login } from "../models/login";
import { Token } from "../models/token";
import { connect } from "../mongo";

const SECRET_KEY = 'ваш_секретный_ключ';

export function createToken(user) {
  console.log(user);
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  return {
      id: user._id,
      access_token: token,
      role: user.role
  };
}

export async function signIn(authData: Login): Promise<Token> {
    const db = await connect();
    const collection = db.collection("users");
  try {
    const user = await collection.findOne({ login: authData.login });
    if (!user) {
        throw new Error('Authentication failed: User not found');
    }

    if (authData.password.localeCompare(user.password) !== 0) {
      throw new Error('Authentication failed: Incorrect password');
    }

    const tokenResponse = createToken(user);
    return tokenResponse;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}