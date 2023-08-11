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
        className={`flex gap-4 ${isActive ? "bg-primary-600 hover:bg-primary-700 text-white" : "text-secondary-800 hover:bg-gray-100 "
          }  items-center min-h-10 py-3 px-5 rounded-md transition-all duration-200 active:scale-95`}
      >
        <div
          className={`[&>*]:relatve flex items-center justify-center [&>*]:-top-[1px] [&>*]:w-5 [&>*]:h-5 ${isActive ? "text-white" : "text-secondary-800"
            }`}
        >
          {icon}
        </div>
        <span>{children}</span>
      </li>
    </Link>
  );
};

export default NavLink;
