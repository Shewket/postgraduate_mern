import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {formatISO9075} from 'date-fns';
import { UserContext } from "../UserContext";

export default function PostPage(){
    const [postInfo, setPostInfo] = useState(null);
    const {user} = useContext(UserContext);
    const {id} = useParams();
    useEffect(() => {
        
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });


            });
    }, []);

    if (!postInfo) return '';
    return (
        <div className="flex justify-center">
            <div className="w-1/2">
                <h1 className="font-bold text-center text-3xl">{postInfo.title}</h1>
                <p className='text-stone-400 text-center block text-sm mb-4'>
                    <time>{formatISO9075(new Date(postInfo.createdAt))}</time><br/>
                    <a className="font-bold">by {postInfo.author.name}</a>
                </p>
                {user.id === postInfo.author._id && (
                    <div className="text-center">
                        <Link to={`/post/edit/${postInfo._id}`} className="inline-flex gap-1 bg-yellow-200 text-red-500 py-2 px-6 rounded-full mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit this post
                        </Link>
                    </div>
                )}
                <div className="max-w-3xl max-h-48 flex overflow-hidden mb-2"> 
                    <img className="object-cover" src={`http://localhost:4000/${postInfo.cover}`} alt="" />
                </div>
                <div dangerouslySetInnerHTML={{__html: postInfo.content}}/>

            </div>
            
            
        </div>
    );
}