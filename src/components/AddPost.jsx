import React from 'react';
import PostForm from './PostForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createPost = async (post) => {
  const response = await fetch('http://localhost:3001/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};

const AddPost = () => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      console.log('Success bro!');
    },
  });

  const handleAddPost = (post) => {
    createPostMutation.mutate(post); // Removed id here
  };

  return (
    <div>
      <h2>Add new Post</h2>
      <PostForm onSubmit={handleAddPost} />
    </div>
  );
};

export default AddPost;
