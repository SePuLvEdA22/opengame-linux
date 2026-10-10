import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // MVP Fase 0: stub. Fase 4 conecta a Neon users + hash.
        if (credentials?.email && credentials?.password) {
          return { id: "demo", email: String(credentials.email), name: "Demo" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
});
