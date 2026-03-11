import NextAuth, {User} from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client"
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" }, // Credentials provider requires JWT sessions
    pages: {
        signIn: "/login", // Redirects to your custom login page
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                identifier: { label: "Username or Email", type: "text" },
                password: { label: "", type: "" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.identifier || !credentials?.password) return null

                const identifier = credentials.identifier as string
                const password = credentials.password as string
                const isEmail = identifier.includes("@")
                // Querying Prisma using the identifier logic
                let user=null;
                if(isEmail){
                    user = await prisma.user.findUnique({
                        where: { email: identifier },
                        include: {
                            profile: true, // optional if you need profile data later
                        },
                    });
                }else{
                    user = await prisma.user.findFirst({
                        where:{
                            profile: {
                                username: identifier,
                            },
                    },
                        include: {
                            profile: true, // optional if you need profile data later
                        },
                    });
                    //Should check with creating profile join
                }



                // If no user or password doesn't match, return null (triggers error on client)
                if (!user || !user.passwordHash) return null
                const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

                if (!isPasswordValid) return null

                // Return the user object to be saved in the JWT/Session
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.profile?.username,
                }
            }
        })
    ],
    callbacks: {
        // Optional: Add the user ID to the session object
        async jwt({ token, user }) {
            if (user?.username) {
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            (session.user as { username?: string }).username = (token as { username?: string })?.username;
            return session
        },
    },
})