
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


const ForwardArrowIcon = () => {
  return <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_245_304"  maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
  <rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_245_304)">
  <path d="M16.175 13.5H5C4.71667 13.5 4.47917 13.4042 4.2875 13.2125C4.09583 13.0208 4 12.7833 4 12.5C4 12.2167 4.09583 11.9792 4.2875 11.7875C4.47917 11.5958 4.71667 11.5 5 11.5H16.175L11.275 6.6C11.075 6.4 10.9792 6.16667 10.9875 5.9C10.9958 5.63334 11.1 5.4 11.3 5.2C11.5 5.01667 11.7333 4.92084 12 4.9125C12.2667 4.90417 12.5 5 12.7 5.2L19.3 11.8C19.4 11.9 19.4708 12.0083 19.5125 12.125C19.5542 12.2417 19.575 12.3667 19.575 12.5C19.575 12.6333 19.5542 12.7583 19.5125 12.875C19.4708 12.9917 19.4 13.1 19.3 13.2L12.7 19.8C12.5167 19.9833 12.2875 20.075 12.0125 20.075C11.7375 20.075 11.5 19.9833 11.3 19.8C11.1 19.6 11 19.3625 11 19.0875C11 18.8125 11.1 18.575 11.3 18.375L16.175 13.5Z" fill="#2B9A66"/>
  </g>
  </svg>
  
}

const CommunityIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <mask id="mask0_173_1239" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
      <rect width="48" height="48" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_173_1239)">
      <path d="M0 36V33.35C0 32.0643 0.691667 31.018 2.075 30.211C3.45833 29.4037 5.273 29 7.519 29C7.92433 29 8.31417 29.0083 8.6885 29.025C9.06283 29.0417 9.43333 29.0775 9.8 29.1325C9.53333 29.7108 9.33333 30.297 9.2 30.891C9.06667 31.4847 9 32.1043 9 32.75V36H0ZM12 36V32.75C12 31.6833 12.2917 30.7083 12.875 29.825C13.4583 28.9417 14.2833 28.1667 15.35 27.5C16.4167 26.8333 17.6917 26.3333 19.175 26C20.6583 25.6667 22.2667 25.5 24 25.5C25.7667 25.5 27.3917 25.6667 28.875 26C30.3583 26.3333 31.6333 26.8333 32.7 27.5C33.7667 28.1667 34.5833 28.9417 35.15 29.825C35.7167 30.7083 36 31.6833 36 32.75V36H12ZM39 36V32.75C39 32.088 38.9417 31.4642 38.825 30.8785C38.7083 30.2928 38.5167 29.7122 38.25 29.1365C38.6167 29.0788 38.9862 29.0417 39.3585 29.025C39.7308 29.0083 40.1113 29 40.5 29C42.75 29 44.5625 29.3962 45.9375 30.1885C47.3125 30.9808 48 32.0347 48 33.35V36H39ZM15 33H33V32.7C33 31.4667 32.1583 30.4583 30.475 29.675C28.7917 28.8917 26.6333 28.5 24 28.5C21.3667 28.5 19.2083 28.8917 17.525 29.675C15.8417 30.4583 15 31.4833 15 32.75V33ZM7.4785 27.5C6.52617 27.5 5.70833 27.1573 5.025 26.472C4.34167 25.7863 4 24.9623 4 24C4 23.0333 4.34267 22.2083 5.028 21.525C5.71367 20.8417 6.53767 20.5 7.5 20.5C8.46667 20.5 9.29167 20.8417 9.975 21.525C10.6583 22.2083 11 23.0405 11 24.0215C11 24.9738 10.6583 25.7917 9.975 26.475C9.29167 27.1583 8.4595 27.5 7.4785 27.5ZM40.4785 27.5C39.5262 27.5 38.7083 27.1573 38.025 26.472C37.3417 25.7863 37 24.9623 37 24C37 23.0333 37.3427 22.2083 38.028 21.525C38.7137 20.8417 39.5377 20.5 40.5 20.5C41.4667 20.5 42.2917 20.8417 42.975 21.525C43.6583 22.2083 44 23.0405 44 24.0215C44 24.9738 43.6583 25.7917 42.975 26.475C42.2917 27.1583 41.4595 27.5 40.4785 27.5ZM24 24C22.3333 24 20.9167 23.4167 19.75 22.25C18.5833 21.0833 18 19.6667 18 18C18 16.3 18.5833 14.875 19.75 13.725C20.9167 12.575 22.3333 12 24 12C25.7 12 27.125 12.575 28.275 13.725C29.425 14.875 30 16.3 30 18C30 19.6667 29.425 21.0833 28.275 22.25C27.125 23.4167 25.7 24 24 24ZM24.0175 21C24.8725 21 25.5833 20.7108 26.15 20.1325C26.7167 19.5542 27 18.8375 27 17.9825C27 17.1275 26.7142 16.4167 26.1425 15.85C25.5708 15.2833 24.8625 15 24.0175 15C23.1725 15 22.4583 15.2858 21.875 15.8575C21.2917 16.4292 21 17.1375 21 17.9825C21 18.8275 21.2892 19.5417 21.8675 20.125C22.4458 20.7083 23.1625 21 24.0175 21Z" fill="#2B9A66" />
    </g>
  </svg>
}

const CodeIcon = ()=>{
  return <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_204_678"  maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="49">
  <rect y="0.5" width="48" height="48" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_204_678)">
  <path d="M16 36.4L4 24.4L16.1 12.3L18.25 14.45L8.3 24.4L18.15 34.25L16 36.4ZM31.9 36.5L29.75 34.35L39.7 24.4L29.85 14.55L32 12.4L44 24.4L31.9 36.5Z" fill="#2B9A66"/>
  </g>
  </svg>
  
}


const BookIcon = ()=>{
  return <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_204_668"  maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="49">
  <rect y="0.5" width="48" height="48" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_204_668)">
  <path d="M12.4 33.5C14.1857 33.5 15.9237 33.7083 17.614 34.125C19.3047 34.5417 20.9667 35.1667 22.6 36V14.65C21.1 13.65 19.473 12.875 17.719 12.325C15.965 11.775 14.192 11.5 12.4 11.5C11.1333 11.5 9.89167 11.6583 8.675 11.975C7.45833 12.2917 6.23333 12.6833 5 13.15V34.85C6.03333 34.3833 7.20833 34.0417 8.525 33.825C9.84167 33.6083 11.1333 33.5 12.4 33.5ZM25.6 36C27.2667 35.1667 28.9 34.5417 30.5 34.125C32.1 33.7083 33.8 33.5 35.6 33.5C36.8667 33.5 38.175 33.6 39.525 33.8C40.875 34 42.0333 34.2667 43 34.6V13.15C41.8667 12.5833 40.6697 12.1667 39.409 11.9C38.1483 11.6333 36.8787 11.5 35.6 11.5C33.8 11.5 32.0583 11.775 30.375 12.325C28.6917 12.875 27.1 13.65 25.6 14.65V36ZM24.1 40.5C22.4 39.2333 20.55 38.2583 18.55 37.575C16.55 36.8917 14.5 36.55 12.4 36.55C11.182 36.55 9.98583 36.7 8.8115 37C7.63717 37.3 6.46667 37.6667 5.3 38.1C4.53 38.4667 3.7875 38.4167 3.0725 37.95C2.3575 37.4833 2 36.8167 2 35.95V12.8C2 12.3 2.11667 11.8417 2.35 11.425C2.58333 11.0083 2.93333 10.6833 3.4 10.45C4.8 9.78333 6.2565 9.29167 7.7695 8.975C9.28283 8.65833 10.8263 8.5 12.4 8.5C14.5 8.5 16.5417 8.78333 18.525 9.35C20.5083 9.91667 22.3667 10.7833 24.1 11.95C25.8 10.7833 27.625 9.91667 29.575 9.35C31.525 8.78333 33.5333 8.5 35.6 8.5C37.1623 8.5 38.6945 8.65833 40.1965 8.975C41.6988 9.29167 43.15 9.78333 44.55 10.45C45.0167 10.6833 45.375 11.0083 45.625 11.425C45.875 11.8417 46 12.3 46 12.8V35.95C46 36.8797 45.625 37.5872 44.875 38.0725C44.125 38.5575 43.3833 38.5667 42.65 38.1C41.5167 37.6333 40.3628 37.2583 39.1885 36.975C38.0142 36.6917 36.818 36.55 35.6 36.55C33.5 36.55 31.4833 36.9 29.55 37.6C27.6167 38.3 25.8 39.2667 24.1 40.5Z" fill="#2B9A66"/>
  </g>
  </svg>
  
}

const ComputerIcon = () => {


  return <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_173_1245" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
      <rect width="48" height="48" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_173_1245)">
      <path d="M2 42V39H46V42H2ZM7 36C6.2 36 5.5 35.7 4.9 35.1C4.3 34.5 4 33.8 4 33V9C4 8.2 4.3 7.5 4.9 6.9C5.5 6.3 6.2 6 7 6H41C41.8 6 42.5 6.3 43.1 6.9C43.7 7.5 44 8.2 44 9V33C44 33.8 43.7 34.5 43.1 35.1C42.5 35.7 41.8 36 41 36H7ZM7 33H41V9H7V33Z" fill="#2B9A66" />
    </g>
  </svg>

}


const PenIcon = () => {
  return <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_173_1252" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
      <rect width="48" height="48" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_173_1252)">
      <path d="M24.95 35.05L43.15 16.9L39.1 12.9L20.95 31.05L24.95 35.05ZM10.95 37.45C8.01667 37.25 5.79167 36.575 4.275 35.425C2.75833 34.275 2 32.65 2 30.55C2 28.55 2.85 26.9166 4.55 25.65C6.25 24.3833 8.61667 23.6166 11.65 23.35C13.1167 23.2166 14.2083 22.95 14.925 22.55C15.6417 22.15 16 21.6 16 20.9C16 19.9333 15.5167 19.1916 14.55 18.675C13.5833 18.1583 11.9667 17.7833 9.7 17.55L9.95 14.55C12.9167 14.85 15.1667 15.5333 16.7 16.6C18.2333 17.6666 19 19.1 19 20.9C19 22.4333 18.375 23.6833 17.125 24.65C15.875 25.6166 14.1333 26.1833 11.9 26.35C9.6 26.5166 7.875 26.95 6.725 27.65C5.575 28.35 5 29.3166 5 30.55C5 31.7166 5.50833 32.625 6.525 33.275C7.54167 33.925 9.06667 34.3166 11.1 34.45L10.95 37.45ZM25.9 38.35L17.65 30.1L37.55 10.25C38.0167 9.78329 38.5417 9.55829 39.125 9.57496C39.7083 9.59163 40.2333 9.81663 40.7 10.25L45.8 15.3C46.2667 15.7666 46.5 16.3 46.5 16.9C46.5 17.5 46.2667 18.0333 45.8 18.5L25.9 38.35ZM17.95 40C17.3833 40.1333 16.8833 39.9833 16.45 39.55C16.0167 39.1166 15.8667 38.6166 16 38.05L17.65 30.1L25.9 38.35L17.95 40Z" fill="#2B9A66" />
    </g>
  </svg>

}


const StarIcon = () => {

  return <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_173_1258" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
      <rect width="48" height="48" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_173_1258)">
      <path d="M33.4 29L42 21.6L46.25 21.95L36.8 30.05L39.65 42.35L35.95 40.1L33.4 29ZM28.75 14.55L25.9 7.85L27.5 4L32.1 14.85L28.75 14.55ZM13.15 35.75L21 31.05L28.85 35.8L26.75 26.9L33.65 20.9L24.55 20.1L21 11.7L17.45 20.05L8.35 20.85L15.25 26.85L13.15 35.75ZM8.65 42L11.9 27.95L1 18.5L15.4 17.25L21 4L26.6 17.25L41 18.5L30.1 27.95L33.35 42L21 34.55L8.65 42Z" fill="#2B9A66" />
    </g>
  </svg>

}

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-green-200 rounded-lg p-6 min-w-[380px] min-h-[220px] border border-gray-700 space-y-6">
      {icon}
      <Heading as="h3" className="text-gray-1000">{title}</Heading>
      <Text className="text-gray-950">{description}</Text>
    </div>
  )
}

const IntegrationCard = ({ title, description, icon, cta="", ctaLink }) => {

  const onClickHandler = ()=>{
    // open link - > /docs/installation
    window.open(ctaLink, '_blank');
  }

  return (
    <div className="min-w-[380px] min-h-[220px] space-y-6">
      {icon}
      <Heading as="h3" className="text-gray-1000">{title}</Heading>
      <Text className="text-gray-950">{description}</Text>
      <button onClick={onClickHandler} className="flex items-center space-x-2 text-gray-900 hover:space-x-4 hover:text-gray-1000">
        <span>{cta}</span> <ForwardArrowIcon/>
      </button>
    </div>
  )
}




const HeroSection = () => {

  return <div className="pt-20 mb-10 relative">
    <div className="relative z-10 lg:block md:w-[768px] mx-auto w-full px-4">
      <Heading className="text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-1000 to-gray-600">
        Accelerate Your <span className="text-green-900">UI Development</span> with <span className="text-green-900">Prebuilt Components</span>
      </Heading>
      <Text className="text-center text-gray-900 mb-10">
        Empowering developers with the tools to design and build modern UI effortlessly.
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

      <div className="relative top-[-30px] left-[-150px] z-2 w-[420px] pb-[80px]">
        <TrafficAnalyticsDemo />

        <div className="absolute top-[120px] left-[640px] z-2 w-[420px]">
          <YourTeamDemo />
        </div>
      </div>


    </div>


    {/* Features Section */}
    <div className="py-10 mb-10 mt-20 relative lg:flex text-gray-950 px-4">
      <div className="relative z-10 lg:block w-full px-4 space-y-4 lg:w-[380px] mb-4 lg:mb-0" >
        <Text className="text-gray-900">
          About Rad UI
        </Text>
        <Heading as="h2" className="text-gray-1000">
          Core Features
        </Heading>
        <Text className="text-gray-900">
          Our features allow you to create modern, efficient UIs with ease. Focus on your projects while we provide the tools to streamline your development process.
        </Text>
      </div>

      <div>
        <div className="grid lg:grid-cols-2 gap-4">
          <FeatureCard icon={<CommunityIcon />} title="Community Driven" description="We believe in the power of community. We are always looking for feedback and suggestions." />
          <FeatureCard icon={<ComputerIcon />} title="Fast Development" description="Don't waste time in building components, focus on solving your business problems " />
          <FeatureCard icon={<PenIcon />} title="Bring in your own styling" description="Rad UI is designed to be flexible and customizable. Bring in your own styling and make it your own." />
          <FeatureCard icon={<StarIcon />} title="Built to perform" description="Rad UI is built to perform. We use the latest technologies to ensure that your UI is fast and efficient." />
        </div>
      </div>

    </div>


    <div className="py-20">
      <div className="block lg:flex ">
       <div className="flex justify-center mb-20 lg:block">
       <MusicAppPlayerDemo />
       </div>
        <div className="px-20 space-y-10">
          <Heading as="h2" className="text-gray-1000">
            Integrate RadUI effortlessly into your <span className="text-green-900">React</span> and <span className="text-green-900">Next.js</span> projects today
          </Heading>
          <div className="grid lg:grid-cols-2 gap-8">
            <IntegrationCard ctaLink="/docs/first-steps/installation" cta="Install" icon={<BookIcon />} title="Follow these simple steps to enhance your UI development experience" description="Start by installing RadUI via npm, ensuring you have the latest version." />
            <IntegrationCard ctaLink="/docs/first-steps/introduction" cta="View Docs" icon={<CodeIcon />} title="Import the components you need to get started with your design" description="Utilize our extensive documentation to guide you through component usage." />
          </div>
        </div>
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