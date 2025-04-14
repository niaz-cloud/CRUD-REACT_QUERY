import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '../api/posts'; // This should be a function that fetches post by ID

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: post, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default Post;
