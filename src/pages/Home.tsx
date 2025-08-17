import HeroSection from "../components/HeroSection"

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <div className="flex flex-col items-center">
        <p className="text-3xl sm:text-5xl py-5 sm:py-10 text-gray-500 font-light">About <span className="text-gray-700 font-medium">Website</span></p>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, voluptas. Harum assumenda delectus mollitia blanditiis natus inventore vitae corrupti dolores.</p>
      </div>
    </div>
  )
}

export default Home
