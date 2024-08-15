import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import connectMongoDB from "@/app/libs/mongodb";
import Topic from "@/app/models/accounts";
const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials){
                const {email, password} = credentials;
                try{
                    await connectMongoDB();
            
                    const user = await Topic.findOne({email});
                    if (!user){
                        return null;
                    }
                    console.log(password);
                    console.log(user.password);
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    console.log(passwordsMatch);
                    if(!passwordsMatch){
                        console.log("RETURINGNULL");
                        return null;
                    }
                    console.log("RETURNING USER");
                    return user;
                } catch(error){
                    console.log("Error",error);
                }
              
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};