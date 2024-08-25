import "server-only";

import bcrypt from "bcrypt";

const SALT = 11;

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT);
};

export const comparePassword = async (
    password: string,
    hash: string,
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
