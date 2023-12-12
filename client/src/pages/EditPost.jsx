import { useState,useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";



export default function EditPost(){

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
     const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/postAPI/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setSummary(postInfo.summary);
                    setContent(postInfo.content);
                })
            });
    }, []);

    async function updatePost(ev){
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if(files?.[0]){
            data.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:4000/postAPI/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        })
        if (response.ok){
            setRedirect(true)
        }
        
    }

    if(redirect){
        return <Navigate to={`/post/${id}`}/>
    }

    return (
        <div>
            <form className='max-w-3xl mx-auto' onSubmit={updatePost}>
                <input type="text" 
                    placeholder='Title, for example: How to build secure session?' 
                    value={title} 
                    onChange = {ev => setTitle(ev.target.value)}
                    className="mt-2"
                    />
                <input type="text" 
                    placeholder='Summary'
                    value={summary}
                    onChange = {ev => setSummary(ev.target.value)}
                    className="mt-2"
                    />
                <input type="file"
                    onChange={ev => setFiles(ev.target.files)}
                    className="mt-2"
                    />
                <Editor onChange={setContent} value={content}/>
                <button className="primary mt-5">Update Post</button>
            </form>
        </div>
    )
}