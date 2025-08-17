const HeroSection = () => {
  return (
    <div className="flex flex-col sm:flex-row border-gray-400 border">
      {/* left hero section */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-6">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2 py-2">
            <p className="bg-gray-700 h-[2px] w-8"></p>
            <p className="font-medium text-sm md:text-base">Charity Loop</p>
          </div>
        </div>

        <h1 className="caveat-bold text-3xl lg:text-5xl font-bold sm:py-3">KU Give & Get</h1>

        <div className="text-[#414141]">
          <div className="flex items-center gap-2 py-2">
            <p className="font-medium text-sm md:text-base">Kind Trade</p>
            <p className="bg-gray-700 h-[2px] w-8"></p>
          </div>
        </div>

      </div>

      {/* right hero section */}
      <img className="w-full sm:w-1/2" src="images/charity.png" alt="" />
    </div>
  )
}

export default HeroSection
