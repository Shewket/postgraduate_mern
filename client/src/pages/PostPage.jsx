import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {formatISO9075} from 'date-fns';

export default function PostPage(){
    const [postInfo, setPostInfo] = useState(null);
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
                <div className="max-w-3xl max-h-48 flex overflow-hidden">
                    <img className="object-cover" src={`http://localhost:4000/${postInfo.cover}`} alt="" />
                </div>
                <div dangerouslySetInnerHTML={{__html: postInfo.content}}/>

            </div>
            
            
        </div>
    );
}