export const formatAcceptedTypes = (types: string[] | undefined): string => {
  if (!types) return "";
  return types.map((type) => type.split("/")[1].toUpperCase()).join(", ");
};
