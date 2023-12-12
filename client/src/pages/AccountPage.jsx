import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import CreatePost from "./CreatePost";

export default function AccountPage() {

    const [redirect, setRedirect] = useState(null);
    const {user, ready, setUser} = useContext(UserContext);
    let {subpage} = useParams();


    if(subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('userAPI/logout');
        setRedirect('/');
        setUser(null);
    }

    if(!ready){
        return 'Loading...';
    }

    if (!user && !redirect) {
        return <Navigate to={'/login'} />
    }



    function linkClasses(type=null) {
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
        if (type === subpage) {
            classes += ' bg-yellow-200  text-red-500';
        }else{
            classes += ' bg-gray-100';
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }
    return (
        <div>
            <nav className="w-full px-9 flex justify-center mt-8 mb-8 gap-4">
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    My Profile
                </Link>
                <Link className={linkClasses('posting')} to={'/account/posting'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    My Posting
                </Link>
                <Link className={linkClasses('tags')} to={'/account/tags'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                    My Tags    
                </Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'posting' && (
                <CreatePost />
            )}
        </div>
    );
}