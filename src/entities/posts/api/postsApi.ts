import { $instance } from "../../../shared/api";
import { IPost } from "../model/types";

export class PostsApi {
  static async getPosts() {
    const { data } = await $instance.get<IPost[]>("/posts");
    return data;
  }
}

