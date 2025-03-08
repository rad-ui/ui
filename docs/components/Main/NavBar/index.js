"use client"

import NavRoot from "./helpers/NavRoot"
import Navigation from "@/components/navigation/Navigation"
import { NavBarContext } from "./NavBarContext"
import { useContext, useEffect, useState } from "react"


const NavBar = ({ darkMode, setDarkMode, cookies, setCookie }) => {
  const [currentRoutePath,setCurrentRoutePath] = useState(null);
  const { isDocsNavOpen } = useContext(NavBarContext);

  return <div className="relative">
    <NavRoot darkMode={darkMode} setDarkMode={setDarkMode} cookies={cookies} setCookie={setCookie} />
    <div className={`${isDocsNavOpen ? "fixed top-[50px] left-0 w-full bg-gray-50" : "hidden"} border-box overflow-y-auto overflow-x-hidden flex flex-col h-full z-50 lg:hidden`}>
        <Navigation />
    </div>
  </div>
}

export default NavBar;