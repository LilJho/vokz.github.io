"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
};

const NavLink = ({ href, children, icon }: Props) => {
  const pathname = usePathname();

  const path_origin = `/${pathname.split("/")[1]}`;
  const isActive = pathname === href || path_origin === href;

  return (
    <Link href={href}>

      <li
        className={`relative flex gap-4 text-white hover:bg-gray-100/30 items-center min-h-10 py-3 px-4 transition-all duration-200 active:scale-95`}
      >
        {isActive && <div className="w-[2px] h-[24px] left-0 bg-white absolute my-auto"></div>}
        <div
          className={`relative [&>*]:relatve flex items-center justify-center [&>*]:top-[20px] [&>*]:w-6 [&>*]:h-6 text-white`}
        >
          {icon}
        </div>
        <span className="text-sm font-light">{children}</span>
      </li>
    </Link>
  );
};

export default NavLink;
