export const racesData = [
  "Hispanic",
  "Latino",
  "American Indian",
  "Alaska Native",
  "Asian",
  "Black",
  "African American",
  "Native Hawaiian",
  "Other Pacific Islander",
  "White",
  "U.S. Nonresident",
  "U.S. Resident ",
  "Race/ethnicity unknown",
];

export const relationshipData = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Separated",
];

export const pittsburgOption1 = [
  "Not during past month",
  "Less than once a week",
  "Once or twice a week",
  "Three  or more times a week",
];

export const pittsburgOption2 = [
  "No problem at all",
  "Only a very slight problem",
  "Somewhat of a problem",
  "A very big problem",
];

export const pittsburgOption3 = [
  "Very good",
  "Fairly good",
  "Fairly bad",
  "Very bad",
];

export const pittsburgOption4 = [
  "No bed partner or room mate",
  "Partner/room mate in other room",
  "Partner/room mate in same room, but not same bed",
  "Partner in same bed",
];

export const pittsburgOption5 = [
  "Not during past month",
  "Less than once a week",
  "Once or twice a week",
  "Three  or more times a week",
];

export const formDefaultData = {
  first_name: "",
  middle_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  city: "",
  email: "",
  mailing_address: "",
  contact_number: "",
  alt_contact_number: "",
  race: "Asian",
  relationship_status: "",
  current_address: "",
  currently_living_with: "",
  children: [
    {
      first_name: "",
      last_name: "",
      age: "",
    },
  ],
  grandchildren: [
    {
      first_name: "",
      last_name: "",
      age: "",
    },
  ],
  occupation: "",
  work_hours_per_week: "",
  allergies: [
    {
      cause: "",
      reaction: "",
    },
  ],
  prescription_medication: [
    {
      medication_name: "",
      dosage: "",
      purpose: "",
      start_date: "",
      remarks: "",
    },
  ],
  over_the_counter_medication: [
    {
      medication_name: "",
      dosage: "",
      purpose: "",
      start_date: "",
      remarks: "",
    },
  ],
  women_data: {
    menses_began_at_age: "",
    post_menopausal_last_period: "",
    first_child_birth: "",
    number_of_pregnancies: "",
    miscarraiges: "",
  },
  health_conditions: [" "],
  surgeries: [
    {
      procedure: "",
      date: "",
    },
  ],
  vaccinations: [
    {
      vaccine: "",
      status: "",
    },
  ],
  family_history: {
    cancerIllness: [
      {
        family_member: "",
        maternal_paternal: "",
      },
    ],
    dementiaIllness: [
      {
        family_member: "",
        maternal_paternal: "",
      },
    ],
    diabetesIllness: [
      {
        family_member: "",
        maternal_paternal: "",
      },
    ],
    highBloodPressureIllness: [
      {
        family_member: "",
        maternal_paternal: "",
      },
    ],
  },
  marital_status: "",
  is_using_tobacco: "",
  is_using_tobacco_in_past: "",
  tobacco_product_type: "",
  years_of_using_tobacco: "",
  year_of_tobacco_cessation: "",
  drinking_alcohol: "",
  alcohol_consumption_frequency: "",
  is_using_recreational_drugs: "",
  recreational_drug_type: "",
  recreational_drug_usage_frequency: "",
  additional_comment: "",
  nutrition_problem: "",
  reason_for_participating: "",
  motivation_survey: {
    survey_Questions: [
      {
        question: "I know what mindfulness is and I practice it regularly.",
        rating_answer: "",
      },
      {
        question:
          "I have quite time at least once a day (e.g. meditation, prayer).",
        rating_answer: "",
      },
      {
        question: "I believe in higher power (e.g. God).",
        rating_answer: "",
      },
      {
        question: "I have effective coping mechanism for dealing with stress",
        rating_answer: "",
      },
      {
        question: "I respond to setbacks or failure with a growth mindset.",
        rating_answer: "",
      },
      {
        question:
          "I make sure that I have self-care practices on a regular basis.",
        rating_answer: "",
      },
      {
        question: "I follow and do a progressive exercise program",
        rating_answer: "",
      },
      {
        question:
          "I have the energy to do the things I want even after a day's work",
        rating_answer: "",
      },
      {
        question: "I feel connected to the important people in my life.",
        rating_answer: "",
      },
      {
        question: "I manage my time and have laser-focus priority areas",
        rating_answer: "",
      },
      {
        question:
          "I feel I am consistently growing personally and professionally.",
        rating_answer: "",
      },
      {
        question:
          "I have a clear vision of the life I want to live for the rest of my days",
        rating_answer: "",
      },
    ],
    additional_comment: "",
  },
  pittsburge_sleep_quality_index: {
    given_question: [
      {
        question:
          "During the past month, what time have you usually gone to bed at night?",
        rating_answer: "",
      },
      {
        question:
          "During the past month, how long (in minutes) has it usually taken you to fall asleep each night?",
        rating_answer: "",
      },
      {
        question:
          "During the past month, what time have you usually gotten up in the morning?",
        rating_answer: "",
      },
      {
        question:
          "During the past month, how many hours of actual sleep did you get at night? (This may be different than the number of hours you spent in bed)",
        rating_answer: "",
      },
      {
        question: "Cannot get to sleep with 30 minutes.",
        rating_answer: "",
      },
      {
        question: "Wake up in the middle of the night or early morning.",
        rating_answer: "",
      },
      {
        question: "Have to get up to use the bathroom.",
        rating_answer: "",
      },
      {
        question: "Cannot breathe comfortably.",
        rating_answer: "",
      },
      {
        question: "Cough or snore loudly.",
        rating_answer: "",
      },
      {
        question: "Feel too cold.",
        rating_answer: "",
      },
      {
        question: "Feel too hot.",
        rating_answer: "",
      },
      {
        question: "Have bad dreams.",
        rating_answer: "",
      },
      {
        question: "Have pain.",
        rating_answer: "",
      },
      {
        question:
          "During the past month, how often have you taken medicine to help you sleep (prescribed or &quot;over the counter&quot;)?",
        rating_answer: "",
      },
      {
        question:
          "During the past month, how often have you had trouble staying awake while driving, eating meals, or engaging in social activity?",
        rating_answer: "",
      },
      {
        question:
          "During the past month, how much of a problem has it been for you to keep up enthusiasm to get things done?",
        rating_answer: "",
      },
      {
        question:
          "During the past month, how would you rate your sleep quality overall?",
        rating_answer: "",
      },
      {
        question: "Do you have a bed parter or room mate?",
        rating_answer: "",
      },
      {
        question: "Loud snoring",
        rating_answer: "",
      },
      {
        question: "Long pauses in breathing while asleep",
        rating_answer: "",
      },
      {
        question: "Legs twitching or jerking while asleep",
        rating_answer: "",
      },
      {
        question: "Episodes of disorientation or confusion during the night",
        rating_answer: "",
      },
    ],
    sleeping_optional: {
      question: "",
      rating_answer: "",
    },
    partner_optional: {
      question: "",
      rating_answer: "",
    },
  },
  status: "unauthorized",
};
