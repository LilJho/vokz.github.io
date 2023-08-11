import { IconType } from "@/lib/types";
import { RiDashboardLine, RiTeamLine } from "react-icons/ri";

export const routesConfig = {
  routes: [
    {
      title: "Dasboard",
      icon: "dashboard",
      href: "/",
    },
    {
      title: "Patients",
      icon: "patients",
      href: "/patients",
    },
  ],
};

export const Icons: IconType = {
  dashboard: RiDashboardLine,
  patients: RiTeamLine,
};
