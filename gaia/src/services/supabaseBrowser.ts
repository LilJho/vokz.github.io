import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default () => createPagesBrowserClient();
