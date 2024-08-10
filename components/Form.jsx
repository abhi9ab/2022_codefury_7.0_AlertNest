import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full justify-start flex-col'>
      <h1 className='mt-5 text-3xl font-extrabold leading-[1.15] text-black sm:text-4xl text-left'>
        <span className='text-indigo-500 font-serif'>{type} Post</span>
      </h1>
      <p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-left'>
        {type} and share disaster prevention protocol
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 rounded-xl border border-gray-200 bg-white shadow-lg p-5'
      >
        <label>
          <span className='font-serif font-semibold text-base text-gray-700'>
            Your Post
          </span>

          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder='Write your post here'
            required
            className='w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500'
          />
        </label>

        <label>
          <span className='font-serif font-semibold text-base text-gray-700'>
            Disaster Type{" "}
            <span className='font-normal'>
              (Tsunami, Earthquake, Forest fire, etc)
            </span>
          </span>
          <input
            value={post.disasterType}
            onChange={(e) => setPost({ ...post, disasterType: e.target.value })}
            type='text'
            placeholder='disaster'
            required
            className='w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500'
          />
        </label>

        <div className='flex justify-end mx-3 mb-5 gap-4'>
          <Link href='/' className='rounded-full border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className=' rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;