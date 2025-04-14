import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { fetchPostById, updatedPost } from '../api/posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const EditPost = () => {
    const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: post, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });

  const updatedPostMutation = useMutation ({
    mutationFn: updatedPost,
    onSuccess : ()=>{
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        navigate("/")
    }

  })

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // Make sure post exists before rendering the form
  if (!post) return <div>No post data found.</div>;

  const handleSubmit = (updatedPost)=>{
     updatedPostMutation.mutate({id, ...updatedPost})
  }

  return (
    <div>
      <PostForm initialValue={post} onSubmit={(updatedPost) => {
        console.log("Updated Post:", updatedPost);
        // You can call your updatePost mutation here if needed
        navigate('/');
      }} />
    </div>
  );
};

export default EditPost;
