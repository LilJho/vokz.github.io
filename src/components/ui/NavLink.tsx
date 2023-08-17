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
        className={`relative flex gap-4 hover:bg-white/30 text-white items-center min-h-10 py-3 px-5 transition-all duration-200 active:scale-95`}
      >
        {isActive && <div className="absolute left-0 h-[28px] w-[2px] bg-white"></div>}
        <div
          className={`[&>*]:relatve flex items-center justify-center [&>*]:-top-[1px] [&>*]:w-6 [&>*]:h-6 text-white`}
        >
          {icon}
        </div>
        <span className={`text-lg`}>{children}</span>
      </li>
    </Link>
  );
};

export default NavLink;
