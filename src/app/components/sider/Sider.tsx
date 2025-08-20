"use client"

import { authFirebase } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHouse, FaMusic, FaPodcast, FaHeart, FaRightFromBracket, FaUser, FaUserPlus } from "react-icons/fa6";
import { MenuItem } from "./MenuItem";


export const Sider = () => {
    const [isLogin, setIsLogin] = useState<boolean>();

    useEffect(() => {
        onAuthStateChanged(authFirebase, (user) => {
            if (user) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        });
    }, [])

    console.log(isLogin);

    const menu = [
        {
            icon: <FaHouse />,
            title: "Trang chủ",
            link: "/"
        },
        {
            icon: <FaMusic />,
            title: "Danh Mục Bài Hát",
            link: "/categories"
        },
        {
            icon: <FaPodcast />,
            title: "Ca Sĩ",
            link: "/singers"
        },
        {
            icon: <FaHeart />,
            title: "Bài Hát Yêu Thích",
            link: "/wishlist",
            isLogin: true
        },
        {
            icon: <FaRightFromBracket />,
            title: "Đăng Xuất",
            link: "/logout",
            isLogin: true
        },
        {
            icon: <FaUser />,
            title: "Đăng Nhập",
            link: "/login",
            isLogin: false
        },
        {
            icon: <FaUserPlus />,
            title: "Đăng Ký",
            link: "/register",
            isLogin: false
        },

    ];

    return (
        <>
            <div className="bg-[#212121] h-[100vh] w-[280px] fixed">
                <div className="bg-[#1C1C1C] py-[25px] px-[20px]">
                    <Link href="/">
                        <img
                            src="/Logo.svg"
                            alt="logo"
                            className="h-[42px] w-auto"
                        />
                    </Link>
                </div>
                <div className="">
                    <nav className="py-[30px] px-[20px]">
                        <ul>
                            {menu.map((item, index) => (
                                <MenuItem item = {item} isLogin = {isLogin} key= {index}/>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}