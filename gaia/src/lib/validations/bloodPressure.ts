import * as z from "zod";

export const BloodPressureSchema = z.object({
  blood_pressure: z
    .string()
    .nonempty({ message: "Please enter your blood pressure" }),
  measurement_unit: z.string(),
  date_of_submission: z
    .string()
    .nonempty({ message: "Please enter the date of submission" }),
});
