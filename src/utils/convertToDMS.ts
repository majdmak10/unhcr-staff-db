export const convertToDMS = (decimal: number, isLatitude: boolean): string => {
  const degrees = Math.floor(Math.abs(decimal));
  const minutesDecimal = (Math.abs(decimal) - degrees) * 60;
  const minutes = Math.floor(minutesDecimal);
  const seconds = ((minutesDecimal - minutes) * 60).toFixed(2);

  const direction =
    decimal >= 0 ? (isLatitude ? "N" : "E") : isLatitude ? "S" : "W";

  return `${degrees}°${minutes}'${seconds}" ${direction}`;
};
