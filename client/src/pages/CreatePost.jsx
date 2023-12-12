import {Link, useParams} from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

export default function createPostPage(){
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
 
    async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/postAPI/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }
    
    return (

        <div>
            {action !== 'new' && (
                <div className='text-center'>
                <Link className='inline-flex gap-1 bg-yellow-200 text-red-500 py-2 px-6 rounded-full' to={'/account/posting/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                    Create new post
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div>
                <form className='max-w-3xl mx-auto' onSubmit={createNewPost}>
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
                    <Editor value={content} onChange={setContent}/>
                    <button className="primary mt-5">Create Post</button>
                </form>
                </div>
                
            )}
            
        </div>
    );
}