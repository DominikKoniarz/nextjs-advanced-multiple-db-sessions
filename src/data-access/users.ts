import "server-only";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getUserById = (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
};

export const getUserByEmail = (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const getUserByGoogleId = (googleId: string) => {
    return prisma.user.findUnique({
        where: {
            googleId,
        },
    });
};

export const createUser = (data: Prisma.UserCreateInput) => {
    return prisma.user.create({
        data,
    });
};

export const updateUser = (id: string, data: Prisma.UserUpdateInput) => {
    return prisma.user.update({
        where: {
            id,
        },
        data,
    });
};
