import Drawer from "@radui/ui/Drawer"

import NavRoot from "./helpers/NavRoot"
import Navigation from "@/components/navigation/Navigation"
import { NavBarContext } from "./NavBarContext"
import { useContext } from "react"


const NavBar = ({ darkMode, setDarkMode, setThemeCookie }) => {
  const { isDocsNavOpen, setIsDocsNavOpen } = useContext(NavBarContext);

  return <div className="relative">
    <NavRoot darkMode={darkMode} setDarkMode={setDarkMode} setThemeCookie={setThemeCookie} />
    {/* Phones and small tablets: the sidebar slides in from the left. */}
    <Drawer.Root open={isDocsNavOpen} onOpenChange={(open) => setIsDocsNavOpen(open)} swipeDirection="left">
      <Drawer.Portal>
        <Drawer.Overlay className="docs-nav-drawer-overlay" />
        <Drawer.Content className="docs-nav-drawer" aria-label="Documentation navigation">
          <Drawer.Title className="sr-only">Documentation navigation</Drawer.Title>
          <Navigation />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  </div>
}

export default NavBar;
