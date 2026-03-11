import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request:{nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = !!auth?.user;
            if(isOnDashboard){
                return isLoggedIn;
            } else if(isLoggedIn){
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        }
    },
    providers: [],
} satisfies NextAuthConfig;