import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const jwtService = {
  async createJWT(user: any) {
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    return token;
  },
  async getAuthorizedUser(token: string) {
    try {
      const result: any = jwt.verify(token, "SECRET_KEY");
      return new ObjectId(+result.userId);
    } catch (err) {
      return null;
    }
  },
};
