import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-col justify-center items-center'>
    <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center'  >
      Discover & Share
      <br className='max-md:hidden' />
      <span className='text-center text-amber-700'> risks zones & guides</span>
    </h1>
    <p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-full text-center '>
        alertnest is an open-source disaster preparedness app which is created to enhance disaster
        preparedness and response, addressing issues such as limited
        access to reliable information, insufficient education on disaster
        response, and fragmented communication channels
    </p>

    <Feed />
  </section>
);

export default Home;