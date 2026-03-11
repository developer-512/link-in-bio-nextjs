"use server"
import { prisma } from "./prisma"
import bcrypt from 'bcrypt';
import {AuthError} from "next-auth";
import {auth, signIn} from "@/auth";
import {objectInputType, objectOutputType, ZodTypeAny} from "zod";

export async function signup(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const errors: Record<string, string> = {}

    if (!name || name.length < 2) {
        errors.name = "Name must be at least 2 characters"
    }

    if (!email || !email.includes("@")) {
        errors.email = "Invalid email"
    }
    if(email && errors.email === undefined){
        const existingEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (existingEmail) {
            errors.email = "Email already in use"
        }
    }
    if (!password || password.length < 6) {
        errors.password = "Password must be at least 6 characters"
    }

    if(!!username && username.length < 3){
        errors.username = "Username must be at least 3 characters"
    }
    if(!!username && username.length > 20){
        errors.username = "Username must be less than 20 characters"
    }
    if(!!username && !/^[a-zA-Z0-9_]+$/.test(username)){
        errors.username = "Username can only contain letters, numbers, and underscores"
    }
    if(!!username && username.includes(" ")){
        errors.username = "Username cannot contain spaces"
    }
    if(username && errors.username === undefined){
        // check if username exists
        const existingUsername = await prisma.profile.findUnique({
            where: {
                username: username
            }
        })

        if (existingUsername) {
            //throw new Error("Username already taken")
            errors.username = "Username already taken"
        }
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
        }
    }
    console.log({ name, email, password })
    const hashed=await bcrypt.hash(password,10);
    await prisma.user.create({
        data: {
            email: email,
            passwordHash: hashed,
            name:name,
            profile: {
                create: {
                    username: username,
                    displayName: name,
                }
            }
        }
    });
    return {
        success: true,
    }
}
export async function authenticate(identifier: string, password: string) {
    try {
        const res = await signIn("credentials", {
            identifier: identifier,
            password: password,
            redirect: false, // Prevents automatic redirect to handle errors via toast
        })
        return null;
    }catch (error){
        if (error instanceof AuthError) {

            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
export async function getSessionUser() {
    const session = await auth()

    if (!session?.user) return null

    return session.user
}