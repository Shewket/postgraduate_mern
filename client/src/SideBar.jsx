import { GiChatBubble } from "react-icons/gi";
import { BsArrowLeftShort, BsPostcardFill, BsChevronDown } from "react-icons/bs";
import { GiAbstract066 } from "react-icons/gi";
import {useState} from "react";
import { RiDashboardFill} from "react-icons/ri";
import { HiChatBubbleLeftRight} from "react-icons/hi2";


export default function sideBar(){
    const [open, setOpen] = useState(true); 
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const Menus = [
        {title: "Dashboard"},
        {title: "Posts", icon: <BsPostcardFill/>, link: "/posts"},
        {title: "Chatting", icon: <HiChatBubbleLeftRight/>},
        {title: "menuElement1", link: "/login"},
        {
            title: "Upcoming",
            submenu: true,
            submenuItems: [
                {title: "Work"},
                {title: "Research"},
            ]
        },
        {title: "menuElement3"},
    ];
    return (
        <div className="flex">
            <div className={`bg-light-Emerald h-screen  p-5 pt-8 ${open?"w-50":"w-20"} duration-300
                            mt-4 border border-emerald-200 rounded-md relative`}>
                <div>
                    <BsArrowLeftShort className={`bg-white text-emerald-800 text-2xl 
                                                rounded-full absolute -right-3 top-3 border border-md-Cyan cursor-pointer ${!open && "rotate-180"}`}
                                onClick={() => setOpen(!open)}/>
                </div>
                <div className="inline-flex">
                    <GiAbstract066 className={` text-4xl rounded-md cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`} onClick={() => setOpen(!open)}/>
                    <h1 className={`text-orange-500 font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Menu</h1>
                </div>
                
                <ul className="pt-2">
                    {Menus.map( (menu, index) => (
                        <>
                            <li key={index} className=" text-teal-700 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-emerald-300"
                                onClick={() => {
                                    if (!menu.submenu){
                                        window.location.href = menu.link
                                    } else{
                                        setSubmenuOpen(!submenuOpen)
                                    }
                                }}
                            >
                                <span className="text-2xl block">
                                    {menu.icon ? menu.icon : <RiDashboardFill />}
                                </span>
                                <span className={`text-base font-medium flex-1 ${!open && 'hidden'} duration-200`}>{menu.title}</span>
                                {menu.submenu && (<BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() => setSubmenuOpen(!submenuOpen)}/>)}
                            </li>
                            {menu.submenu && submenuOpen && open &&(
                                <ul>
                                    {menu.submenuItems.map((submenuItem, index) => (
                                        <li key={index} className=" text-teal-700 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-emerald-300"
                                            onClick={() => {
                                                window.location.href = submenuItem.link
                                            }
                                        }>
                                            {submenuItem.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    ))}
                </ul>
                
            </div>
        </div>
    )
}

