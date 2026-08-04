import { Bell } from "lucide-react";

const Navbar = () => {
    return (
        <header className="h-16 bg-white shadow px-8 flex items-center justify-between">

            <div>
                <h2 className="text-xl font-semibold">
                    Dashboard
                </h2>
            </div>

            <div className="flex items-center gap-6">

                <button className="relative">

                    <Bell size={22} />

                    <span className="absolute -top-1 -right-1 bg-red-500 h-2 w-2 rounded-full"></span>

                </button>

                <div className="text-right">

                    <p className="font-semibold">
                        Amogh
                    </p>

                    <p className="text-sm text-gray-500">
                        Stay Healthy 💙
                    </p>

                </div>

            </div>

        </header>
    );
};

export default Navbar;