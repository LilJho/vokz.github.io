import * as z from "zod";

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

export const UserAccountSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string(),
  role: z.string(),
  uuid: z.string().optional(),
  id: z.string().optional(),
  created_at: z.date().optional(),
});

export type UserType = z.infer<typeof UserAccountSchema>;
export interface IUserSessionData extends UserType {
  email: string;
}

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
