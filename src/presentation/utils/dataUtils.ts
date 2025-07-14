import { Vehicle } from "../../entities/Vehicle";

export const getUniqueValues = (data: Vehicle[], field: keyof Vehicle): string[] => {
  const values = new Set(data.map(vehicle => vehicle[field]));
  return Array.from(values).filter(value => typeof value === 'string') as string[];
};

