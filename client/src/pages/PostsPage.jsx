import { useEffect, useState } from "react";
import Post from "../Post";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/post').then( response => {
        response.json().then(posts => {
          setPosts(posts);
        })
      })
      
    }, [])
    return(
      <>
      <div className="min-w-fit">
        {posts.length > 0 && posts.map(post => (
          <Post {...post}/>
        ))}
      </div>
      
    </>
    
    );
}