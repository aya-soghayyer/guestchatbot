import { useState } from 'react'
import Logo from '../../assets/images/hebronLogo.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
// import FilledButton from '../ui/FilledButton'
// import UnFilledButton from '../ui/UnFilledButton'

function GuestNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between p-4 text-white md:justify-between md:p-0 md:px-11 md:pt-3">
        <div className="z-10 w-[8rem] md:z-40 md:w-24 ">
          <Link to="https://www.hebron.edu/index.php/">
            <img src={Logo} alt="Hebron universtiy Logo" />
          </Link>
        </div>
        {/* Hamburger Menu for Mobile */}
        <div className="z-10 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="z-auto focus:outline-none"
          >
            {/* <FontAwesomeIcon icon="fa-solid fa-bars" size="xl" /> */}
          </button>

          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${
              !isMobileMenuOpen
                ? 'bg-none'
                : 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
            } `}
          >
            <div
              className={`absolute right-5 top-[4rem] z-50 h-fit w-44 flex-col items-center rounded-md bg-darkBlue py-4 font-Outfit text-xl transition-all duration-500 ease-in-out md:hidden ${
                isMobileMenuOpen
                  ? 'translate-y-0 scale-y-100 opacity-100'
                  : 'pointer-events-none -translate-y-5 scale-y-95 opacity-0'
              }`}
            >
              <ul className="flex h-fit flex-col items-center gap-3 text-center">
                <li className="transition-transform duration-300 ease-out hover:scale-125">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl"
                  >
                    Home
                  </Link>
                </li>
                <hr className="mx-auto w-3/4 border-t border-white/30 2xl:mb-8" />
                <li className="transition-transform duration-300 ease-out hover:scale-110">
                  <Link
                    to="/contact"
                    className="p-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
                <hr className="mx-auto w-3/4 border-t border-white/30 2xl:mb-8" />
                <li className="transition-transform duration-300 ease-out hover:scale-125">
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                    About Us
                  </Link>
                </li>
                <hr className="mx-auto w-3/4 border-t border-white/30 2xl:mb-8" />
                <li className="transition-transform duration-300 ease-out hover:scale-125">
                  
                </li>
                <hr className="mx-auto w-3/4 border-t border-white/30 2xl:mb-8" />
                <li className="transition-transform duration-300 ease-out hover:scale-125">
                 
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hidden md:inline-flex">
          <ul className="flex justify-between gap-3 md:-mr-3 md:mt-3 md:gap-0">
            <li>
            
            </li>
            <li>
             
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default GuestNav
