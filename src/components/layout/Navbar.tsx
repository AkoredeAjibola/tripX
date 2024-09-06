import { FaHamburger } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import SearchForm from '../features/SearchForm'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useState } from 'react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Features', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
]
const userLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'History', path: '/history' },
  { name: 'Settings', path: '/settings' },
]
const Navbar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  return (
    <header className="h-[70px] sticky top-0 left-0 bg-white z-30 w-screen">
      <div className="container flex gap-4 justify-between items-center px-4 mx-auto w-full h-full">
        <Link to="/" className="text-3xl font-bold text-primary">
          TripX
        </Link>
        <SearchForm category="hotels/searchHotels" />
        <nav>
          <ul className="flex gap-x-4 items-center font-bold">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="block md:hidden">
          <FaHamburger className="text-3xl" />
        </div>
        {!isAuthenticated ? (
          <div className="flex gap-x-4 items-center text-primary">
            <Link
              to="/login"
              className="px-4 py-2 text-white rounded bg-primary"
              role="button"
            >
              Login
            </Link>
          </div>
        ) : (
          <>
            <div className="flex relative items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <button
                type="button"
                className="flex text-sm bg-gray-300 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                // dark:focus:ring-gray-600
                aria-controls="user-menu"
                id="user-menu-button"
                aria-expanded="false"
                onClick={() => setUserMenuOpen((prev) => !prev)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="user photo"
                />
              </button>

              <div
                className={`${
                  userMenuOpen ? 'block' : 'hidden'
                } z-50 my-4 text-base list-none bg-white rounded-lg divide-y divide-gray-100 shadow  absolute right-[20px] top-10 p-4`}
                id="user-dropdown"
                // dark:bg-gray-700 dark:divide-gray-600
              >
                <div className="px-4 py-3">
                  <span
                    className="block text-sm text-gray-900"
                    // dark:text-white
                  >
                    Bonnie Green
                  </span>
                  <span
                    className="block text-sm text-gray-500 truncate"
                    // dark:text-gray-400
                  >
                    name@flowbite.com
                  </span>
                </div>
                <div className="bg-gray-400 h-[2px] w-full"></div>
                <ul
                  className="flex flex-col items-center py-2"
                  aria-labelledby="user-menu-button"
                >
                  {userLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        //    dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={async () => {
                        await signOut(auth)
                        navigate('/login')
                      }}
                      type="button"
                      className="px-4 py-2 text-white rounded bg-primary"
                      role="button"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
