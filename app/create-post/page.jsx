'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ description: "", disasterType: "" });

    const createPost = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
        const response = await fetch("/api/post/new", {
            method: "POST",
            body: JSON.stringify({
                description: post.description,
                userId: session?.user.id,
                disasterType: post.disasterType,
            }),
            });
    
            if (response.ok) {
            router.push("/");
            }
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }
      };

    return (
        <Form
          type='Create'
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createPost}
        />
    );
    
}

export default CreatePost