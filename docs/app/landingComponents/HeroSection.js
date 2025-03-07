
"use client"
import Button from "@radui/ui/Button"
import Heading from "@radui/ui/Heading"
import Code from "@radui/ui/Code"
import Text from "@radui/ui/Text"
import ToolbarDemo from "./ToolbarDemo"
import MusicAppPlayerDemo from "./MusicAppPlayerDemo"
import AddToCartDemo from "./AddToCartDemo"
import TrafficAnalyticsDemo from "./TrafficAnalyticsDemo"
import YourTeamDemo from "./YourTeamDemo"

const HeroSection = () => {

  return <div className="py-20 mb-10 relative">
    <div className="relative z-10 lg:block md:w-[768px] mx-auto w-full px-4">
      <Heading className="text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-1000 to-gray-600">
        Accelerate Your <span className="text-green-900">UI Development</span> with <span className="text-green-900">Prebuilt Components</span>
      </Heading>
      <Text className="text-center text-gray-900 mb-10">
        Empowering creators with the tools to design and build modern UIs effortlessly.
        Dive in and bring your ideas to life.
      </Text>

      <div>
        <div className='flex justify-center mt-5 space-x-2'>
          <Button color="green" variant="solid" onClick={() => {
            location.href = '/playground'
          }}>Go to playground</Button>

          <Button color="blue" variant="ghost" onClick={() => {
            location.href = '/colors'
          }}>Check out Colors</Button>
        </div>
        <div className="flex justify-center mt-6">
          <Code>console.log('Pstt.. We are actively looking for rad maintainers')</Code>
        </div>
      </div>
    </div>
    {/*  */}
  <div className="hidden lg:block">
  <div className="absolute top-[-100px] right-[-180px] z-2 scale-75">
      <MusicAppPlayerDemo />
    </div>
    <div className="absolute top-[-10px] left-[-300px] z-2 ">
      <ToolbarDemo />
    </div>

    <div className="absolute top-[100px] left-[-50px] z-2 w-[220px]">
      <AddToCartDemo />
    </div>

    <div className="absolute top-[500px] left-[-150px] z-2 w-[420px]">
       <TrafficAnalyticsDemo />
    </div>

    <div className="absolute top-[540px] left-[640px] z-2 w-[420px]">
      <YourTeamDemo />
    </div>
  </div>

  </div>

  {/* Old Hero Section */ }
  return <div>
    <div className='py-20 mb-10 relative'>
      <div className='relative z-10'>
        <Heading className="text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-1000">
          Build <div className='inline-block text-transparent bg-clip-text bg-gradient-to-t from-green-800 to-green-950'>Effortless, </div> <br />
          No <div className='inline-block text-transparent bg-clip-text bg-gradient-to-t from-crimson-700 to-crimson-950'> Compromise UI</div> Fast.
        </Heading>
      </div>
    </div>
  </div>
}

export default HeroSection;