import { createContext, useContext, useState } from 'react';

const defaultState = {
    posts: [],
    postsLoading: true,
    post: null,
    postLoading: true,
    comments: [],
    commentsLoading: true,
    getPosts: (search) => {},
    getPost: () => {},
    createPost: (post) => {},
    updatePost: (id, post) => {},
    deletePost: (id) => {},
    createComment: (id, comment) => {},
}

const BlogContext = createContext(defaultState);

const BlogProvider = ({ children }) => {
    const [posts, setPosts] = useState(defaultState.posts);
    const [postsLoading, setPostsLoading] = useState(defaultState.postsLoading);
    const [post, setPost] = useState(defaultState.post);
    const [postLoading, setPostLoading] = useState(defaultState.postLoading);
    const [comments, setComments] = useState(defaultState.comments);
    const [commentsLoading, setCommentsLoading] = useState(defaultState.commentsLoading);

    const getPosts = async (search) => {
        setPostsLoading(true);
        try {
            const response = await Axios.get(`/posts${search ? `?search=${search}` : ""}`);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setPostsLoading(false);
        }
    }

    const getPost = async (id) => {
        setPostLoading(true);
        try {
            const response = await Axios.get(`/posts/${id}`);
            setPost(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setPostLoading(false);
        }
    }

    const createPost = async (data) => {
        try {
            const response = await Axios.post("/posts", data);
            setPosts([...posts, response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    const updatePost = async (id, data) => {
        try {
            const response = await Axios.put(`/posts/${id}`, data);
            setPosts(posts.map((post) => post.id === id ? response.data : post));
        } catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (id) => {
        try {
            await Axios.delete(`/posts/${id}`);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const createComment = async (id, data) => {
        try {
            const response = await Axios.post(`/posts/${id}/comments`, data);
            setComments([...comments, response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <BlogContext.Provider
            value={{
                posts,
                postsLoading,
                post,
                postLoading,
                comments,
                commentsLoading,
                getPosts,
                getPost,
                createPost,
                updatePost,
                deletePost,
                createComment,
            }}
        >
            {children}
        </BlogContext.Provider>
    );

}

const useBlog = () => {
    const context = useContext(BlogContext);
    if (context === undefined) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    return context;
}
    

export { BlogProvider, useBlog}