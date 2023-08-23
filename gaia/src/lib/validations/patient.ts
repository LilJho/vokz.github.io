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

const dementiaIllness = z.object({
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
  cancerIllness: z.array(cancerIllness).optional(),
  dementiaIllness: z.array(dementiaIllness).optional(),
  diabetesIllness: z.array(diabetesIllness).optional(),
  highBloodPressureIllness: z.array(highBloodPressureIllness).optional(),
});

const survey_Questions = z.object({
  question: z.string().optional(),
  rating_answer: z.string().nonempty({
    message: "This field is required. Please provide an answer.",
  }),
});

const survey_Questions_PSQI = z.object({
  question: z.string().optional(),
  rating_answer: z.string().nonempty({
    message: "This field is required. Please provide an answer.",
  }),
});

export const PatientSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().nonempty({ message: "Please enter your first name" }),
  middle_name: z.string(),
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
  current_address: z
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
  women_data: z.object({
    menses_began_at_age: z.string().optional(),
    post_menopausal_last_period: z.string().optional(),
    first_child_birth: z.string().optional(),
    number_of_pregnancies: z.string().optional(),
    miscarraiges: z.string().optional(),
  }),
  health_conditions: z.array(z.string()).optional(),
  surgeries: z.array(surgeries).optional(),
  vaccinations: z.array(vaccinations).optional(),
  family_history: family_history.optional(),
  marital_status: z
    .string()
    .nonempty({ message: "Please select your marital status" }),
  is_using_tobacco: z
    .string()
    .nonempty({ message: "Please select if yes or no" }),
  tobacco_usage_frequency: z.string().optional(),
  is_using_tobacco_in_past: z
    .string()
    .nonempty({ message: "Please select if yes or no" }),
  tobacco_product_type: z.string().optional(),
  years_of_using_tobacco: z.string().optional(),
  year_of_tobacco_cessation: z.string().optional(),
  drinking_alcohol: z
    .string()
    .nonempty({ message: "Please select if yes or no" }),
  alcohol_consumption_frequency: z.string().optional(),
  is_using_recreational_drugs: z
    .string()
    .nonempty({ message: "Please select if yes or no" }),
  recreational_drug_type: z.string().optional(),
  recreational_drug_usage_frequency: z.string(),
  additional_comment: z.string().optional(),
  nutrition_problem: z
    .string()
    .nonempty({ message: "Please select if yes or no" }),
  reason_for_participating: z.string().optional(),
  motivation_survey: z.object({
    survey_Questions: z.array(survey_Questions),
    additional_comment: z.string().optional(),
  }),
  pittsburge_sleep_quality_index: z.array(survey_Questions_PSQI),
  status: z.string().optional(),
});
