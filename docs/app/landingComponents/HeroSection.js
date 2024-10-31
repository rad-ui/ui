
"use client"


import Button from "@radui/ui/Button"
import Heading from "@radui/ui/Heading"




const HeroSection = () => {
  return <div>
    <div className='py-20 mb-10 relative'>

      <div className='relative z-10'>
        <Heading className="text-center text-transparent bg-clip-text bg-gradient-to-t from-gray-900 to-gray-1000">
           Build <div className='inline-block text-transparent bg-clip-text bg-gradient-to-t from-green-800 to-green-950'>Effortless, </div> <br/>
          No <div className='inline-block text-transparent bg-clip-text bg-gradient-to-t from-crimson-700 to-crimson-950'> Compromise UI</div> Fast.
        </Heading>
        <div className='flex justify-center mt-3 space-x-2'>
          <Button color="blue" variant="soft" onClick={() => {
            location.href = '/playground'
          }}>Go to playground</Button>

          <Button color="blue" variant="ghost" onClick={() => {
            location.href = '/colors'
          }}>Check out Colors</Button>
        </div>
      </div>
    </div>
  </div>
}

export default HeroSection;