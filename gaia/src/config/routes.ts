import { IconType } from "@/lib/types";
import { RiDashboardLine, RiTeamLine } from "react-icons/ri";
import { HiOutlineSquares2X2, HiOutlineUserGroup } from "react-icons/hi2";
import { FiLayers } from "react-icons/fi";

export const routesConfig = {
  routes: {
    admin: [
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
        icon: "sample",
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
        icon: "sample",
        href: "/sample",
      },
    ],
  },
};

export const Icons: IconType = {
  dashboard: HiOutlineSquares2X2,
  patients: HiOutlineUserGroup,
  sample: FiLayers,
};
