import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
const navitem = [
    { path: "/", name: "Home" },
    { path: "/blogs", name: "Blogs" },
    { path: "/create", name: "Create New Blog" },
    { path: "/search", name: "Search" },
];
function Navbar() {
    const [toggle, setToggleNav] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const linkRef = useRef();
    const linksContainerRef = useRef();
    const menuRef = useRef();
    //const [height, setHeight] = useState("0px");
    function toggleHandler() {
        setToggleNav((prev) => !prev);
    }
    useEffect(() => {
        const linksHeight = linkRef.current.getBoundingClientRect().height;
        //console.log(linksHeight);
        if (toggle) {
            linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
            linksContainerRef.current.style.height = `0px`;
        }
    }, [toggle]);

    useEffect(() => {
        const handler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setShowProfile(false);
            }
            // console.log(menuRef.current);
            // console.log(event.target);
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <nav className="border-b px-6 py-2 relative flex justify-between md:gap-8 items-center">
            <h1 className="font-bold text-3xl order-2 md:order-1">Logo</h1>

            {
                <button
                    className="md:hidden order-1 h-8 w-8 flex justify-center items-center"
                    onClick={toggleHandler}
                >
                    {!toggle && <FiMenu className="w-full h-full" />}
                    {toggle && <FiX className="w-full h-full" />}
                </button>
            }
            <div
                id="collapsable-nav"
                className="md:ml-auto absolute w-full md:w-auto top-full left-0 md:static flex flex-col md:order-2 overflow-hidden border-b md:border-b-0"
                ref={linksContainerRef}
            >
                <ul
                    className="flex flex-col  md:gap-4 md:flex-row text-center md:border-b-0"
                    ref={linkRef}
                >
                    {navitem.map((item, index) => {
                        return (
                            <li className=" flex flex-col" key={index}>
                                <a
                                    className="inline-block  p-4 md:p-0 hover:text-purple-600"
                                    href={item.path}
                                >
                                    {item.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="order-3">
                <div className="relative h-12 w-12" ref={menuRef}>
                    <button
                        onClick={() => setShowProfile((prev) => !prev)}
                        className={`h-12 w-12 rounded-full ring-offset-1 ${
                            showProfile ? "ring-purple-600 ring-2" : ""
                        } `}
                    >
                        <img
                            className="w-full h-full rounded-full"
                            src="https://randomuser.me/api/portraits/men/3.jpg"
                            alt="user img"
                        />
                    </button>
                    <ul
                        className="absolute top-[115%] text-black bg-white border-x border-b right-0 min-w-[256px] max-w-[300px] break-words text-center rounded-lg"
                        style={{ display: showProfile ? "block" : "none" }}
                    >
                        <li className="border-t">
                            <a
                                className="px-2 py-4 flex items-center justify-center gap-2"
                                href="/"
                            >
                                <FiUser />
                                <span>Tanmay Maheshwari</span>
                            </a>
                        </li>
                        <li className="border-t">
                            <button className="w-full h-full flex justify-center items-center gap-2 p-2">
                                <span>Logout</span>
                                <FiLogOut />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
