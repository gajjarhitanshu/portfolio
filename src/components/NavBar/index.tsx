"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  IoIosCloseCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { RiMenu4Line } from "react-icons/ri";
import { montserrat } from "../../../public/fonts";

const navItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Projects",
    path: "/projects",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const NavBar = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // <div className="bg-blurGrey_800">
    <>
      <nav
        className={`${montserrat.className} flex row justify-between items-center h-80px w-[100%] px-10`}
      >
        <Link href="/" passHref>
          <Image
            src="/images/logo.jpeg"
            width={80}
            height={80}
            alt="Picture of the author"
            className={`cursor-pointer`}
          />
        </Link>
        <div className="hidden lg:block">
          <div className=" flex row items-center gap-10 px-6 ">
            {navItems.map((item) => (
              <Link
                href={`${item.path}`}
                key={item.path}
                className={`cursor-pointer text-blurGrey_300 hover:text-blurGrey_50 ${
                  pathname == item.path ? "text-blurGrey_50" : ""
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex lg:hidden xl:hidden 2xl:hidden">
          <div>
            {!isMenuOpen ? (
              <RiMenu4Line
                size={26}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            ) : (
              <IoIosCloseCircleOutline
                size={26}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            )}
          </div>
        </div>
      </nav>
      <div className="block sm:block md:block lg:hidden xl:hidden 2xl:hidden absolute top-0">
        <div
          className={`flex flex-col transition-height duration-700 overflow-hidden w-lvw ${
            isMenuOpen ? "h-lvh" : "h-0"
          } bg-blurGrey_800 items-center  justify-center gap-20 position-absolute top-0 right-0`}
        >
          {navItems.map((item) => (
            <Link
              href={`${item.path}`}
              key={item.path}
              className={`cursor-pointer text-blurGrey_300 hover:text-blurGrey_50 text-5xl ${
                pathname == item.path ? "text-blurGrey_50" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title.toUpperCase()}
            </Link>
          ))}

          {/* {isMenuOpen && ( */}
          <div
            className={`absolute top-10 right-10 transition-opacity duration-700 ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <IoMdCloseCircleOutline size={30} />
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
