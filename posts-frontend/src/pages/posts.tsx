import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPost, createPost, deletePost, updatePost } from "@/api/postApi";
import { useState } from "react";

interface Post {
  id?: number;
  title: string;
  body: string;
  img: string;
  adminId: number;
}

export default function PostsPage() {
  const queryClient = useQueryClient();

  const [newPost, setNewPost] = useState<Post>({
    id: undefined,
    title: "",
    body: "",
    img: "",
    adminId: 1,
  });

  // Fetch posts
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPost,
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: (post: Post) =>  createPost(post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
  

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: ({ id, post }: { id: number; post: Post }) => updatePost(id, post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Posts</h1>

      {/* Add/Update Post Form */}
      <div className="mt-4">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Image URL"
          value={newPost.img}
          onChange={(e) => setNewPost({ ...newPost, img: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Admin ID"
          value={newPost.adminId}
          onChange={(e) => setNewPost({ ...newPost, adminId: Number(e.target.value) })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => {
            if (newPost.id) {
              updatePostMutation.mutate({ id: newPost.id, post: newPost });
            } else {
              createPostMutation.mutate(newPost);
            }
            setNewPost({ id: undefined, title: "", body: "", img: "", adminId: 1 });
          }}
        >
          {newPost.id ? "Update Post" : "Add Post"}
        </button>
      </div>

      {/* Posts List */}
      <ul className="mt-4">
        {posts?.map((post) => (
          <li key={post.id} className="flex justify-between border p-2">
            <span>{post.title}</span>
            <p>{post.body}</p>
            <div>
              <button
                className="bg-yellow-500 text-white px-2 py-1 mr-2"
                onClick={() => setNewPost(post)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => deletePostMutation.mutate(post.id!)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
