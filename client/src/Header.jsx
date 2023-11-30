import { useContext, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';
import userImg from './assets/imgs/user_irving.jpg'

export default function Header() {
    const [open, setOpen] = useState(false);
    const {user} = useContext(UserContext);
    const [navIsVisible, setNavIsVisible] = useState(true);

    const menuRef = useRef();
    const userRef = useRef();

    const navVisibility = () => {
        setNavIsVisible((curState) => {
            return !curState;
        })
    }

    window.addEventListener('click', (e) => {
        if(e.target !== menuRef.current && e.target !== userRef.current){
            setOpen(false);
        }
    })
    return (
        <header className='p-4 flex justify-between'>
            <div className='flex ml-0 md:ml-10 flex-col items-start md:flex-row  md:items-left gap-10'>
                <Link to={'/'} className='flex item-center gap-1 relative top-0 z-[20]justify-between'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="45px" height="50px" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 -rotate-45">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                <span className="font-bold text-xl relative top-1.5">IntelliGrad</span>
                </Link>
                <div className='flex gap-3 ml-22 md:ml-80 border  border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
                    <div className='hidden relative top-2 md:flex'>Tag</div>
                    <div className='hidden border border-gray-300 md:flex'></div>
                    <div className='hidden relative top-2 md:flex'>Date</div>
                    <div className='hidden border border-gray-300 md:flex'></div>
                    <input placeholder='Search' />
                    <button className='bg-primary border text-white p-1 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="36.5" fill="#fff5cf"></circle><circle cx="39.871" cy="27.326" r="17.661" fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></circle><path fill="#fff5cf" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M65.207,46.034	c0,0-9.183-0.471-15.215,3.486c-8.164,5.355-1.231,12.713,4.388,9.797c3.603-1.87,6.987-0.501,9.128,2.795	c2.141,3.296,5.916,3.431,11.379,1.022"></path><path fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M35.66,44.532	c-3.938,2.785-4.487,6.361-2.217,9.838c3.368,5.158,8.884,6.401,11.522,3.018c2.849-3.653-1.516-8.187-4.598-9.352"></path><path fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M93.344,46.976	c0,0-13.078-0.78-20.916-3.053c-7.194-2.087-14.047-3.758-20.492-3.771"></path><path fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M32.473,52.801	c0,0-5.087,3.885-0.65,9.97s12.119,5.996,14.188,1.993s-1.608-6.704-1.608-6.704"></path><path fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M34.091,65.1	c-0.451,0.942-1.561,6.659,5.61,9.912c6.956,3.156,14.398-4.199,5.595-9.069"></path><path fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M81.571,84.884	c0,0-9.771-0.706-18.562-4.554c-11.716-5.128-18.418-4.553-18.418-4.553"></path><line x1="49.857" x2="51.94" y1="42.136" y2="48.231" fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></line><path fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M55.744,58.848	c0,0,1.43,5.096,2.42,7.819c1.698,4.669-3.995,10.003-9.04,4.886"></path><path fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M20.353,16.367	c-3.179,3.179-7.064,19.543,6.004,28.255"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div to={user?'/account' : '/login'} className='flex border-collapse gap-2  border-gray-300 rounded-full py-1 px-4 hover:border-gray-200' >
                <svg  ref={userRef} onClick={() => setOpen(!open)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 relative top-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className='hidden mt-1.5 md:flex'>
                    <>
                        {user ? <img src={userImg} alt="userImg" className='h-10 w-10 object-cover border-4 border-gray-200 rounded-full '/> : "Hi"}
                    </>
                    
                </div>
                {
                    open && (
                        <div onClick = {() => setOpen(false)} ref={menuRef}  className='bg-white p-4 w-48 shadow-lg absolute top-20 right-10 rounded '>

                                <ul>
                                    {user && (
                                        <>
                                            <Link to={'/account'} className='block hover:bg-blue-100 rounded cursor-pointer py-2 px-4'>
                                                <li>Profile</li>
                                            </Link>
                                        </>
                                    )}
                                    {!user && (
                                        <>
                                            <Link to={'/login'} className='block hover:bg-blue-100 rounded cursor-pointer py-2 px-4'>
                                                <li>Log In</li>
                                            </Link>
                                            <Link to={'/Register'} className='block hover:bg-blue-100 rounded cursor-pointer py-2 px-4'>
                                                <li>Register</li>
                                            </Link>
                                        </> 
                                    )}
                                    
                                </ul>
                                      
                            </div> 
                    )
                }
                
                {user &&(
                    <div className='relative top-2'>
                        {user.name}
                    </div>
                )}
            </div>
            
        </header>
    );
}