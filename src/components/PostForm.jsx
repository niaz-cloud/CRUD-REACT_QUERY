import { useState } from "react";


const PostForm = ({ onSubmit, initialValue = {} }) => {
    const [post, setPost] = useState({
        title: initialValue.title || "",
        body: initialValue.body || ""
    });



    const handleChangeInput = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    };

    const renderField = (label) => {
        const fieldName = label.toLowerCase();

        return (
            <div style={{ marginBottom: '10px' }}>
                <label>{label}</label>
                <input
                    type="text"
                    name={fieldName}
                    value={post[fieldName]}
                    onChange={handleChangeInput}
                    style={{ marginLeft: '10px', padding: '5px' }}
                />
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(post);
        setPost({
            title: "",
            body: ""
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            {renderField("Title")}
            {renderField("Body")}
            <button type="submit">Submit</button>
        </form>
    );
};

export default PostForm;
