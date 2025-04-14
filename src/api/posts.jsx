// For fetching all posts
export async function fetchPosts() {
    const response = await fetch('http://localhost:3001/posts');
    return response.json();
}

// For fetching a single post by ID
export async function fetchPostById(id) {
    const response = await fetch(`http://localhost:3001/posts/${id}`);
    if (!response.ok) {
        throw new Error("Post not found");
    }
    return response.json();
}

export async function createPost(newPost) {
    const response = await fetch(`http://localhost:3001/posts/${id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newPost)
    });
    if (!response.ok) {
        throw new Error("Post not found");
    }
    return response.json();
}

export async function updatedPost(updatedPost) {
    const response = await fetch(`http://localhost:3001/posts/${updatedPost.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(updatedPost)
    });
    if (!response.ok) {
        throw new Error("Post not found");
    }
    return response.json();
}




