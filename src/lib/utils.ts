import bcrypt from 'bcryptjs';
import clsx, { ClassValue } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (datetime: string) => {
  return moment(datetime).calendar();
};

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
