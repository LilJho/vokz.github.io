export const formatFileSize = (size: number | undefined): string => {
  if (!size) return "";
  return `${(size / 1000000).toFixed(2)} MB`;
};
