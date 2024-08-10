import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, description, disasterType } = await request.json();

    try {
        await connectToDB();
        const newPost = new Prompt({ creator: userId, description, disasterType });

        await newPost.save();
        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}