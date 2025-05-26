export const cleanMobile = (value: string | undefined): string | null => {
  const digitsOnly = value?.replace(/\D/g, "");
  return digitsOnly && /^0[0-9]{9}$/.test(digitsOnly) ? digitsOnly : null;
};
