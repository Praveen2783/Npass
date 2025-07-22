"use client"
import * as React from "react"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [active, setActive] = React.useState("");
  const router = useRouter()
  const navItems = [
    { id: "home", name: "Home", href: "/" },
    { id: "about", name: "About", href: "/about" },
    { id: "conact", name: "Contact", href: "/contact" },
  ]
  // smooth scroll method
  const handlerMenu = (sectionId, url) => {
    setActive(sectionId);
    router.replace(url)

  }

  return (
    <nav className="fixed w-full flex justify-between items-center p-4 sm:px-6 lg:px-24 gap-4 h-20 bg-purple-500/90 text-foreground z-50 rounded-b-full">
      {/* Logo */}
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <div className="relative bg-black rounded-lg p-2">
          <div
            className="text-3xl font-black bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300"
            style={{
              textShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
            }}
          >
            Npass
          </div>
        </div>
      </div>


      {/* Desktop Navigation */}
      <ul className="hidden md:flex justify-center items-center gap-6 lg:gap-10 font-medium">
        {navItems.map((item) => (
          <li key={item.id} className={`hover:text-gray-100 dark:hover:text-gray-900 cursor-pointer transition-colors ${active === item.id ? " text-gray-100 dark:text-gray-900" : ""}`}>
            <button onClick={() => {
              handlerMenu(item.id, item.href)
            }}>{item.name}</button>
          </li>
        ))}
      </ul>

      {/* Desktop Actions */}
      <div className="hidden md:flex gap-3 items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hover:cursor-pointer dark:hover:bg-gray-900"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <div className="flex gap-3">
          <SignedOut>
            <Button
              variant="secondary"
              className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <SignInButton />
            </Button>

            <SignUpButton>
              <Button
                variant="secondary"
                className="hover:bg-card-foreground hover:text-white dark:hover:bg-white dark:hover:text-black text-sm h-10 px-4 cursor-pointer"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="flex md:hidden gap-2 items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hover:cursor-pointer dark:hover:bg-gray-900"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* Mobile Menu */}

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild >
            <Button variant="outline" size="icon" className="md:hidden bg-transparent">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className=" rounded-xl w-[300px] h-[600px] sm:w-[400px]  ">
            <SheetHeader>
              <SheetTitle className="text-left">
                <span className="text-2xl font-bold">
                  <span className="text-4xl mask-linear-from-5%">N</span>pass
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6 ">
              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-4 ml-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}

                    className={`text-lg font-medium hover:text-gray-400 dark:hover:text-gray-900 transition-colors py-2 hover:cursor-pointer ${active === item.id ? "text-gray-400  dark:text-gray-500" : ""}`}
                    onClick={() => {
                      setIsOpen(false)
                      handlerMenu(item.id, item.href)
                    }
                    }
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <SignedOut>
                  <Button
                    variant="secondary"
                    className="w-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    <SignInButton />
                  </Button>

                  <SignUpButton>
                    <Button
                      variant="secondary"
                      className="w-full hover:bg-card-foreground hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
