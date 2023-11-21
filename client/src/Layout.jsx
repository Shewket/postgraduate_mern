import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex">
                <SideBar />
                <div className="flex-1">
                    <Outlet />
                </div>
                
            </div>
            
        </div>
        
    );
}