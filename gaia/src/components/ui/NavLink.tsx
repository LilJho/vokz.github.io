"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isMinimized: boolean;
};

const NavLink = ({ href, children, icon, isMinimized }: Props) => {
  const pathname = usePathname();

  const path_origin = `/${pathname.split("/")[1]}`;
  const isActive = pathname === href || path_origin === href;

  return (
    <Link href={href}>
      <li
        className={`relative flex ${isMinimized ? "gap-4 lg:gap-0 lg:justify-center group-hover:lg:justify-normal group-hover:lg:gap-4" : "gap-4"} rounded-lg ${isActive ? "bg-gray-100/30 text-white " : "bg-transparent text-gray-100/80 hover:bg-gray-100/10"}  items-center min-h-10 py-3 ${isMinimized ? "px-4 lg:px-2 group-hover:lg:px-4" : "px-4"} transition-all duration-200`}
      >
        {/* {isActive && <div className="w-[2px] h-[24px] left-0 bg-white absolute my-auto"></div>} */}
        <div
          className={`relative [&>*]:relatve flex items-center justify-center [&>*]:top-[20px] [&>*]:w-6 [&>*]:h-6 text-inherit`}
        >
          {icon}
        </div>
        <span className="text-sm font-light">{children}</span>
      </li>
    </Link>
  );
};

export default NavLink;
