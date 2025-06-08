import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import authConfig from "./auth.config";

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [GitHubProvider({clientId: "...", clientSecret: "...",}),...authConfig.providers],
  session: {strategy: "jwt"},
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) session.user.id = token.sub;
      return session;
    },
    async jwt({token}){
      return token;
    },
  },
  
});