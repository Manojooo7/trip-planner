import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./client";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    emailAndPassword:{
        enabled: true,
    },
    session:{
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 minutes
        },
    },
    plugins: [
        nextCookies(),
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
});