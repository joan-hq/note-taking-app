import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {db} from '@/db/index';
import { users } from "@/db/schema";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") ?? [];
      if (!allowedEmails.includes(user.email!)) return false;
      
      await db.insert(users)
        .values({
          email: user.email!,
          name: user.name,
          image: user.image,
        })
        .onConflictDoNothing();
      
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };