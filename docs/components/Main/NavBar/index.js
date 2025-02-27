"use client"

import NavRoot from "./helpers/NavRoot"
import Navigation from "@/components/navigation/Navigation"
import { NavBarContext } from "./NavBarContext"
import { useContext } from "react"


const sections = [
  {
      type: "CATEGORY",
      items: [
          { title: "Documentation", path: "/docs/first-steps/introduction" },
          { title: "Showcase", path: "/showcase/music-app" }
      ]
  }
]


const NavBar = ({ darkMode, setDarkMode, cookies, setCookie }) => {
  const { isDocsNavOpen } = useContext(NavBarContext);

  return <div className="relative">
    <NavRoot darkMode={darkMode} setDarkMode={setDarkMode} cookies={cookies} setCookie={setCookie} />
    <div className={`${isDocsNavOpen ? "fixed top-[50px] left-0 w-full bg-gray-50" : "hidden"} border-box overflow-y-auto overflow-x-hidden flex flex-col h-full z-50 lg:hidden`}>
        <Navigation />
    </div>
  </div>
}

export default NavBar;