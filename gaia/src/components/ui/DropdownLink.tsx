"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine } from "react-icons/ri";
import useToggle from "@/hooks/useToggle";

type Props = {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  links: {
    href: string
    text: string
  }[]
  isMinimized: boolean;
};

const DropdownLink = ({ href, children, icon, links = [], isMinimized }: Props) => {
  const [show, toggle, setShow] = useToggle();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  const path_origin = `/${pathname.split("/")[1]}`;
  const isActive = pathname === href || path_origin === href;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef, setShow]);

  return (
    <li
      ref={dropdownRef}
      className={`w-full flex flex-col`}
    >
      <button className={`cursor-pointer relative flex ${isMinimized ? "gap-4 lg:gap-0 lg:justify-center group-hover:lg:justify-normal group-hover:lg:gap-4" : "gap-4"} rounded-lg ${show || isActive ? "bg-gray-100/30 text-white " : "bg-transparent text-gray-100/80 hover:bg-gray-100/10"} items-center min-h-10 py-3 ${isMinimized ? "px-4 lg:px-2 group-hover:lg:px-4" : "px-4"} transition-all duration-200`} onClick={toggle}>
        <div
          className={`relative [&>*]:relatve flex items-center justify-center [&>*]:top-[20px] [&>*]:w-6 [&>*]:h-6 text-inherit`}
        >
          {icon}
        </div>
        <span className="text-sm font-light">{children}</span>
        <RiArrowDownSLine
          className={`${isMinimized ? "block lg:hidden group-hover:block" : "block"} w-6 h-6 text-inherit ${show ? "rotate-180" : "rotate-0"
            } transition-transform ml-auto`}
        />
      </button>

      <div
        className={`${isMinimized ? "flex lg:hidden group-hover:flex" : "flex"} mt-1 pl-7 w-full transition-all ease-in-out ${show ? "h-full opacity-100" : "h-0 overflow-hidden opacity-0"}`}
      >
        <div className="h-[71px] max-h-[90%] rounded-full w-[2px] bg-gray-100/30"></div>
        <div className="flex flex-1 gap-1 w-full flex-col">
          {links.map((val) => {
            const linkName = val.href.split("/")[2];
            const baseRouter = pathname.split("/")[2];
            const isNestedLinkActive = baseRouter === linkName;
            return (
              <div className="flex w-full items-center">
                <div className="h-[2px] rounded-sm w-3 bg-gray-100/30"></div>
                <Link href={val.href} key={val.text} className={`w-full text-sm cursor-pointer rounded-lg py-3 px-4 text-left ${isNestedLinkActive ? "bg-gray-100/30 text-white " : "bg-transparent text-gray-100/80 hover:bg-gray-100/10"}`}>
                  <span className="font-light">
                    {val.text}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
};

export default DropdownLink;
