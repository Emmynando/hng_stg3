import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(credentials) {
        //Retrieve user data here.
        //Refer to https://next-auth.js.org/configuration/providers/credentials

        // checking for empty input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("No credentials");
        }

        const user = {
          // retrieving users credentials
          id: "01",
          email: "user@example.com",
          password: "1Password",
        };

        if (
          credentials?.email === user?.email &&
          credentials?.password === user?.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
  // callbacks: {
  //   async session({ session, user }) {
  //     if (session.user) {
  //       (session.user as any).id = user.id;
  //     }
  //     return Promise.resolve(session);
  //   },
  // },
});
