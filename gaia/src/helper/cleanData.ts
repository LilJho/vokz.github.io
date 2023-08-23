type Data = {
  children?: Array<Record<string, string>>;
  family_history?: Record<string, Array<Record<string, string>>>;
  allergies?: Array<Record<string, string>>;
  grandchildren?: Array<Record<string, string>>;
  prescription_medication?: Array<Record<string, string>>;
  surgeries?: Array<Record<string, string>>;
  vaccinations?: Array<Record<string, string>>;
  health_conditions?: string[]; // Add the health_conditions field
  [key: string]: any;
};

export function cleanData(data: Data): Data {
  // Helper function to check if all properties of an object are empty
  const isObjectEmpty = (obj: Record<string, string>): boolean => {
    return Object.values(obj).every((value) => value === "");
  };

  // Clean children array
  if (data.children && data.children.every(isObjectEmpty)) {
    data.children = [];
  }

  // Clean family_history object
  if (data.family_history) {
    for (let key in data.family_history) {
      if (data.family_history[key].every(isObjectEmpty)) {
        data.family_history[key] = [];
      }
    }
  }

  // Clean other arrays with objects
  const objectArraysToClean = [
    "allergies",
    "grandchildren",
    "prescription_medication",
    "surgeries",
    "vaccinations",
  ];

  objectArraysToClean.forEach((arrayName) => {
    if (data[arrayName] && data[arrayName].every(isObjectEmpty)) {
      data[arrayName] = [];
    }
  });

  // Clean health_conditions array
  if (data.health_conditions && data.health_conditions.length > 0) {
    const trimmedValue = data.health_conditions[0].trim(); // Remove leading space
    data.health_conditions = trimmedValue !== "" ? [trimmedValue] : [];
  }

  return data;
}
