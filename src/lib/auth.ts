import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import bcrypt from 'bcryptjs';
import { connectDB } from './db';
import { User } from '@/models/User';

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'Email',
    credentials: { email: {}, password: {} },
    async authorize(c) {
      if (!c?.email || !c?.password) return null;
      await connectDB();
      const u = await User.findOne({ email: c.email.toLowerCase().trim() }).select('+password');
      if (!u?.password || !(await bcrypt.compare(c.password, u.password))) return null;
      return { id: u._id.toString(), name: u.name, email: u.email };
    },
  }),
];
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  providers.push(GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }));
if (process.env.APPLE_ID && process.env.APPLE_SECRET)
  providers.push(AppleProvider({ clientId: process.env.APPLE_ID, clientSecret: process.env.APPLE_SECRET }));

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: '/login' },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider && account.provider !== 'credentials' && user.email) {
        await connectDB();
        await User.updateOne({ email: user.email.toLowerCase() }, { $setOnInsert: { name: user.name ?? user.email, provider: account.provider } }, { upsert: true });
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === 'update' && session?.name) token.name = session.name;
      if (!token.id && token.email) {
        await connectDB();
        const u = await User.findOne({ email: token.email.toLowerCase() }).select('_id name');
        if (u) { token.id = u._id.toString(); token.name = u.name; }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id;
      if (token.name) session.user.name = token.name;
      return session;
    },
  },
};
