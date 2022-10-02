import { genSalt, hash, compare } from 'bcryptjs';
import { customAlphabet } from 'nanoid/async';

const nanoid = customAlphabet(
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ!$^*()|><-_',
    10
);

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    return await hash(password, salt);
};

export const validatePassword = async (
    enteredPassword: string,
    password: string
): Promise<boolean> => {
    return await compare(enteredPassword, password);
};

export const generateUrlCode = async () => {
    return await nanoid();
};

export const addDays = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};
