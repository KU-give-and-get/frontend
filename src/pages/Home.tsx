import HeroSection from "../components/HeroSection"

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <div className="flex flex-col items-center">
        <p className="text-3xl sm:text-5xl py-5 sm:py-10 text-gray-500 font-light">About <span className="text-gray-700 font-medium">Website</span></p>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">KU Give & Get is a platform designed to promote sharing and kindness within Kasetsart University.
Students and staff can donate or exchange items such as books, clothes, study materials, and daily necessities conveniently and safely.

The website aims to build a culture of generosity, reduce waste through reuse, and strengthen the community spirit within the university.</p>
      </div>
    </div>
  )
}

export default Home
