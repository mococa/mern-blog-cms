import { request } from ".";

export class PostsAPI {
  static async create({ content, tags, subject, title }) {
    return request.post("/posts", { content, tags, subject, title });
  }
}
