"use client";

import { useState, useEffect } from "react";

import PostCard from "@components/PostCard";

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 block w-full rounded-md border border-gray-200 bg-white py-2.5 font-serif pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0'>
      {data.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.disasterType) ||
        regex.test(item.description)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (disasterType) => {
    setSearchText(disasterType);

    const searchResult = filterPosts(disasterType);
    setSearchedResults(searchResult);
  };

  return (
    <section className='mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2'>
      <form className='relative w-full flex justify-center'>
        <input
          type='text'
          placeholder='Search for disaster'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PostCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PostCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
