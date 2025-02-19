"use server";
import { signIn } from "@/auth";

export const handleLogin = async (data: FormData) => {
    await signIn("credentials", data);
};

export const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/" });
};