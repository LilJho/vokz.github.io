import * as z from "zod";

const children = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  age: z.string().optional(),
});

const allergies = z.object({
  cause: z.string().optional(),
  reaction: z.string().optional(),
});

const currentMedications = z.object({
  medication_name: z.string().optional(),
  dosage: z.string().optional(),
  purpose: z.string().optional(),
  start_date: z.string().optional(),
  remarks: z.string().optional(),
});

const surgeries = z.object({
  procedure: z.string().optional(),
  date: z.string().optional(),
});

const vaccinations = z.object({
  vaccine: z.string().optional(),
  status: z.string().optional(),
});

const cancerIllness = z.object({
  family_member: z.string().optional(),
  maternal_paternal: z.string().optional(),
});

const demantiaIllness = z.object({
  family_member: z.string().optional(),
  maternal_paternal: z.string().optional(),
});

const diabetesIllness = z.object({
  family_member: z.string().optional(),
  maternal_paternal: z.string().optional(),
});

const highBloodPressureIllness = z.object({
  family_member: z.string().optional(),
  maternal_paternal: z.string().optional(),
});

const family_history = z.object({
  illness: z.array(cancerIllness).optional(),
  demantiaIllness: z.array(demantiaIllness).optional(),
  diabetesIllness: z.array(diabetesIllness).optional(),
  highBloodPressureIllness: z.array(highBloodPressureIllness).optional(),
});

export const PatientSchema = z.object({
  first_name: z.string().nonempty({ message: "Please enter your first name" }),
  middle_name: z
    .string()
    .nonempty({ message: "Please enter your middle name" }),
  last_name: z.string().nonempty({ message: "Please enter your last name" }),
  date_of_birth: z
    .string()
    .nonempty({ message: "Please enter your date of birth" }),
  gender: z.string().nonempty({ message: "Please enter your gender" }),
  city: z.string().nonempty({ message: "Please enter your city" }),
  email: z.string().nonempty({ message: "Please enter your email address" }),
  mailing_address: z
    .string()
    .nonempty({ message: "Please enter your mailing address" }),
  contact_number: z
    .string()
    .nonempty({ message: "Please enter your phone number" }),
  alt_contact_number: z.string().optional(),
  race: z.string().nonempty({ message: "Please select or enter your race" }),
  relationship_status: z
    .string()
    .nonempty({ message: "Please select your relationship status" }),
  currennt_address: z
    .string()
    .nonempty({ message: "Please enter your current address" }),
  currently_living_with: z.string().optional(),
  children: z.array(children).optional(),
  grandchildren: z.array(children).optional(),
  occupation: z.string().nonempty({ message: "Please enter your occupation" }),
  work_hours_per_week: z.string().optional(),
  reason_for_care: z.string().optional(),
  allergies: z.array(allergies).optional(),
  prescription_medication: z.array(currentMedications).optional(),
  over_the_counter_medication: z.array(currentMedications).optional(),
  menses_began_at_age: z.string().optional(),
  post_menopausal_last_period: z.string().optional(),
  first_child_birth: z.string().optional(),
  number_of_pregnancies: z.string().optional(),
  miscarraiges: z.string().optional(),
  health_conditions: z.array(z.string()).optional(),
  surgeries: z.array(surgeries).optional(),
  vaccinations: z.array(vaccinations).optional(),
  family_history: z.array(family_history).optional(),
});
