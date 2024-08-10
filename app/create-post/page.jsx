'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({
        description: "",
        disasterType: "",
        latitude: "",
        longitude: ""
    });

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
                latitude: Number(post.latitude),
                longitude: Number(post.longitude)
            }),
            });
    
            if (response.ok) {
            router.push("/feed");
            }
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }
    };

    const getLocation = (e) => {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setPost((prevPost) => ({
                        ...prevPost,
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                    }));
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };


    return (
        <Form
          type='Create'
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createPost}
          getLocation={getLocation}
        />
    );
    
}

export default CreatePost