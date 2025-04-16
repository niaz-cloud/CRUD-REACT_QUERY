import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, deletePost } from "../api/posts";
import AddPost from "../components/AddPost";
import { useNavigate } from 'react-router-dom';

const PostLists = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, isError, data: posts, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    });

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    const handleDelete = (id) => {
        deletePostMutation.mutate(id);
    };

    if (isLoading) return 'Loading...';
    if (isError) return `Error: ${error.message}`;

    return (
        <div>
            <AddPost />
            {posts.map((post) => (
                <div key={`${post.id}-${post.title}`} style={{ background: "#777", marginBottom: '10px', padding: '10px' }}>
                    <h4
                        style={{ cursor: "pointer", color: "#fff" }}
                        onClick={() => navigate(`/post/${post.id}`)}
                    >
                        {post.title}
                    </h4>
                    <button onClick={() => navigate(`/post/${post.id}/edit`)} style={{ marginRight: '10px' }}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostLists;
