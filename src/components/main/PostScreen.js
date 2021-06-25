import { useSelector } from "react-redux";
import Post from "./Post";

const PostScreen = () => {

    const { posts } = useSelector(state => state.posts)

    return (
        <div>
            {
                posts.map( post => <Post 
                                    key={post.id}
                                    {...post}  
                /> )
            }
        </div>
    )
}

export default PostScreen
