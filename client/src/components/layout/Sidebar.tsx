import {
    LayoutDashboard,
    Pill,
    User,
    Settings,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col">

            <div className="p-6 text-2xl font-bold border-b border-slate-700">
                💊 MediReminder
            </div>

            <nav className="flex-1 p-4 space-y-2">

                <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/medicines"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
                >
                    <Pill size={20} />
                    Medicines
                </NavLink>

                <NavLink
                    to="/profile"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
                >
                    <User size={20} />
                    Profile
                </NavLink>

                <NavLink
                    to="/settings"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
                >
                    <Settings size={20} />
                    Settings
                </NavLink>

            </nav>
            <div className="p-4 border-t border-slate-700">

                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition">

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>
    );
};

export default Sidebar;