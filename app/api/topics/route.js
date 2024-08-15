import Topic from "../../models/accounts";
import connectMongoDB from "../../libs/mongodb";
import {NextResponse} from "next/server";

export async function POST(request){
    const {email, password} = await request.json();
    await connectMongoDB();
    await Topic.create({email, password});
    return NextResponse.json({message: "New Account Created!"},{status: 201})
} 

export async function GET(){
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({topics});
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: "Topic deleted"},{status: 200});
}
