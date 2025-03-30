import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "../ui/theme-toggle";


export default function UserAvatar() {

    const { data: session } = useSession();   

    console.log("User session:", session);  

    return (
        <div className="flex items-center space-x-4 p-2 bg-gray-800 rounded-lg shadow-md">
            <img
                src={session?.user?.image ?? "https://i.pravatar.cc/300"}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-500"
            />
            <div className="flex flex-col">
                <span className="text-white text-sm font-semibold">{session?.user?.email}</span>
                <div className="mt-1 flex gap-3 justify-stretch">
                    <button
                        onClick={() => signOut()}
                        className="p-1 bg-gray-700 dark:bg-gray-800 rounded"
                        title="Sign Out"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3"
                            />
                        </svg>
                    </button>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}