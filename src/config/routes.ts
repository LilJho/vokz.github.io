import { IconType } from "@/lib/types";
import { RiDashboardLine, RiTeamLine } from "react-icons/ri";

export interface Route {
  title: string;
  icon: string;
  href: string;
}

export interface Routes {
  routes: {
    doctor: Route[];
    patient: Route[];
  };
}

export const routesConfig: Routes = {
  routes: {
    doctor: [
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
      {
        title: "Sample Page",
        icon: "patients",
        href: "/sample",
      },
    ],
    patient: [
      {
        title: "Dasboard",
        icon: "dashboard",
        href: "/",
      },
      {
        title: "My Profile",
        icon: "patients",
        href: "/patients",
      },
      {
        title: "Sample Page",
        icon: "patients",
        href: "/sample",
      },
    ],
  },
};

export const Icons: IconType = {
  dashboard: RiDashboardLine,
  patients: RiTeamLine,
};
