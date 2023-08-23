import * as z from "zod";
import { PatientSchema } from "./validations/patient";
import { UseFormReturn } from "react-hook-form";

export const PatientActivitySchema = z.object({
  patient_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string(),
  email: z.string(),
  mobile_number: z.string(),
});

export const PatientOverviewSchema = z.object({
  patient_id: z.string(),
  report_submitted: z.string(),
  patients_name: z.string(),
  date: z.string(),
  status: z.string(),
});

export interface IUserSessionData {
  email: string;
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  role?: string;
  uuid?: string;
  created_at?: string;
}

export type UserDataType = {
  id: number;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: string;
  uuid: string;
};

export type PatientActivityType = z.infer<typeof PatientActivitySchema>;
export type PatientOverviewType = z.infer<typeof PatientOverviewSchema>;

export type IconType = {
  [key: string]: any;
};

export type CropRegionsType = {
  x: number;
  y: number;
  width: number;
  height: number;
  unit?: string;
};

export type DashboardReportDataType = {
  activity_id: string;
  total_dailySteps: string;
  total_dalySleep: string;
  diagnosis_dateandtime: Date;
  patient_id: string;
  medical_report: {
    diagnosis: string;
    diagnosis_label: string;
    diagnosis_value: string;
    diagnosis_keyValue: string;
  }[];
};

export type ToastTypes = {
  title: string;
  description: string;
  variant: "success" | "destructive" | "default";
};

export interface IPersonalInformation {
  form: UseFormReturn<z.infer<typeof PatientSchema>>;
}

export type PatientInformationType = z.infer<typeof PatientSchema>;
