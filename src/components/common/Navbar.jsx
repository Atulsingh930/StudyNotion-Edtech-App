import React, { useState, useEffect } from 'react';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import small_down from '../../assets/Images/small-down.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { apiConnect } from '../../services/apiConnector';
import { categories } from '../../services/api';
// import { setUser } from '../../slices/profileSlice';
import { logout } from '../../services/operations/authApi';

function Navbar() {
  const instructor = 'Instructor';

  const [subLink, setSubLink] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const currentPath = useLocation().pathname.split('/').length;

  async function fetchSubLinks() {
    try {
      setLoading(true);
      const result = await apiConnect('GET', categories.CATEGORIES_URL);
      setSubLink(result.data.allcategory);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching data for catalogs", error);
      setSubLink([]);
    }
  }

  
  const { token } = useSelector((state) => state.auth);
  const { user, userImage } = useSelector((state) => state.profile);
  const { totalIteam } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchSubLinks();
  }, []);
  

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className={`h-14 z-50 border-b-[1px] border-b-richblack-700 flex justify-center p-3 ${currentPath>2 && 'fixed top-0 bottom-0 right-0 left-0 bg-richblack-800'} `}>
      <div className='flex justify-between w-11/12 max-w-maxContent items-center gap-8'>
        <Link to={'/'}>
          <div className='w-40'>
            <img src={Logo} alt='' />
          </div>
        </Link>
        <div className='flex transition-all duration-200'>
          {NavbarLinks.map((arr, index) => (
            <Link to={arr.path} key={index}>
              <div className='p-3 flex-row gap-1 items-center relative group transition-all duration-200 hidden md:flex'>
                <p
                  className={`transition-all duration-200 text-base ${
                    matchRoute(arr.path) ? 'text-yellow-50' : 'text-richblack-25'
                  } group`}
                >
                  {arr.title}
                </p>
                {arr.path === '#' ? <div><img src={small_down} alt='' /></div> : ''}
                {!loading && arr.path === '#' && (
                  <div className='invisible opacity-0 absolute flex flex-col items-start -right-20 top-16 w-72 p-4 z-20 bg-richblack-5 transition-all duration-400 rounded-md group-hover:visible group-hover:translate-y-[-1rem] group-hover:opacity-100'>
                    <div className='absolute h-6 w-6 bg-richblack-5 -z-10 rotate-45 -top-2 right-[30%]' />
                    {subLink.map((arr, index) => (
                      <Link
                        className='w-full items-start text-lg text-richblack-900 py-4 px-4 rounded-md transition-all duration-200 hover:bg-richblack-100'
                        to={`/catalog/${arr.name.toLowerCase().split(' ').join('-')}`}
                        key={index}
                      >
                        <p>{arr.name}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        {token === null ? (
          <div className='flex gap-4'>
            <Link to={'/login'}>
              <button className='px-3 py-2 text-richblack-100 font-base font-medium border bg-richblack-800 border-solid-[1px] border-richblack-700 rounded-md'>
                Log in
              </button>
            </Link>
            <Link to={'/signup'}>
              <button className='px-3 py-2 text-richblack-100 font-base font-medium border bg-richblack-800 border-solid-[1px] border-richblack-700 rounded-md'>
                Sign up
              </button>
            </Link>
          </div>
        ) : (
          <div className=' relative flex gap-5 items-center text-xl text-richblack-200'>
            {
                user && user.accountType !==instructor && (
                <Link to={'/dashboard/cart'}>
                    <AiOutlineShoppingCart />
                    {totalIteam > 0 && <span className='absolute top-[0.85rem] right-[5.2rem] text-xs px-1 bg-richblack-500 text-yellow-50 font-medium rounded-full'>{totalIteam}</span>}
                  </Link>
                )
            }
            <AiOutlineSearch />
                <div className='w-[1.80106rem] h-[1.86738rem] rounded-full group relative cursor-pointer'>
                  <img className='rounded-full' src={userImage} alt='' />
                  <div class="invisible absolute top-[118%] -right-5 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                    <Link to="/dashboard/my-profile">
                    <div class="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.889 2.095a6.5 6.5 0 1 1 7.222 10.81A6.5 6.5 0 0 1 3.89 2.094zm.555 9.978A5.5 5.5 0 0 0 7.5 13 5.506 5.506 0 0 0 13 7.5a5.5 5.5 0 1 0-8.556 4.573zM10.294 4l.706.707-2.15 2.15a1.514 1.514 0 1 1-.707-.707L10.293 4zM7.221 7.916a.5.5 0 1 0 .556-.832.5.5 0 0 0-.556.832zm4.286-2.449l-.763.763c.166.403.253.834.255 1.27a3.463 3.463 0 0 1-.5 1.777l.735.735a4.477 4.477 0 0 0 .274-4.545h-.001zM8.733 4.242A3.373 3.373 0 0 0 7.5 4 3.5 3.5 0 0 0 4 7.5a3.46 3.46 0 0 0 .5 1.777l-.734.735A4.5 4.5 0 0 1 9.5 3.473l-.767.769z"></path>
                        </svg>
                        Dashboard
                    </div>
                    </Link>
                    <div onClick={()=>dispatch(logout(navigate))} class="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.02 3.77v1.56l1-.99V2.5l-.5-.5h-9l-.5.5v.486L2 3v10.29l.36.46 5 1.72L8 15v-1h3.52l.5-.5v-1.81l-1-1V13H8V4.71l-.33-.46L4.036 3h6.984v.77zM7 14.28l-4-1.34V3.72l4 1.34v9.22zm6.52-5.8H8.55v-1h4.93l-1.6-1.6.71-.7 2.47 2.46v.71l-2.49 2.48-.7-.7 1.65-1.65z"></path>
                        </svg>
                        Logout
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
