import { toast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    const toastData = {
      variant: "destructive",
      title: "Error",
      description: errors.join("\n"),
      status: "error",
    };
    toast(toastData as any);
  } else if (err instanceof Error) {
    const toastData = {
      variant: "destructive",
      title: "Error",
      description: err.message,
      status: "error",
    };
    toast(toastData as any);
  } else {
    const toastData = {
      variant: "destructive",
      title: "Error",
      description: "Something went wrong, please try again later.",
      status: "error",
    };
    toast(toastData as any);
  }
}

export const mime_types = {
  IMAGE_MIME_TYPE: [
    "image/png",
    "image/gif",
    "image/jpeg",
    "image/svg+xml",
    "image/webp",
    "image/avif",
  ],
  PDF_MIME_TYPE: ["application/pdf"],
  MS_WORD_MIME_TYPE: [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  MS_EXCEL_MIME_TYPE: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  MS_POWERPOINT_MIME_TYPE: [
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
};
