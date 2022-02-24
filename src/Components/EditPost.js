import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ( {post, handleEdit, editBody, setEditBody, editTitle, setEditTitle}) => {
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id )
    
    useEffect( () => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.bady)
        }
    })
    return (
        <div>

        </div>
    )
}

export default EditPost;