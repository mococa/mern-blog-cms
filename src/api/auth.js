import { request } from ".";

export class AuthAPI {
  static async login({ username, password }) {
    return request.post("/auth/sign-in", { username, password });
  }
  static async byJWT() {
    return request.get("/auth");
  }
}
