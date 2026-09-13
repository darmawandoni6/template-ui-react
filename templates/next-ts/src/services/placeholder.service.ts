import { http } from '@/lib/axios';
import { type CreatePostInput, type Post, postListSchema, postSchema } from '@/validators/placeholder.schema';

export const placeholderService = {
  /**
   * Fetch all posts and validate response schema with Zod
   */
  async getPosts(): Promise<Post[]> {
    const response = await http.get<Post[]>('/posts');
    return postListSchema.parse(response.data);
  },

  /**
   * Fetch a single post by ID
   */
  async getPostById(id: number): Promise<Post> {
    const response = await http.get<Post>(`/posts/${id}`);
    return postSchema.parse(response.data);
  },

  /**
   * Create a new post
   */
  async createPost(input: CreatePostInput): Promise<Post> {
    const response = await http.post<Post>('/posts', input);
    return postSchema.parse(response.data);
  },
};
