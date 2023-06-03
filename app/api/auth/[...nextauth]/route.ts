import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/utils/db.server";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await prisma.User.findUnique({
        where: { email: session.user.email },
      });
      session.user.id = sessionUser.user_id.toString();
      // session.user have all the information from the database and inaddition we send the mongoose id
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        console.log("user");
        const userExists = await prisma.User.findUnique({
          where: { email: profile.email },
        });
        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          throw new Error("User not found in the database");
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
