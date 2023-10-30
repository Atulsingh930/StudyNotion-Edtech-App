import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/common/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResestPassword from './pages/ResestPassword';
import OpenRoute from './components/core/Auth/OpenRoute';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import AboutPages from './pages/AboutPages';
import ContactUsPages from './pages/ContactUsPages';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import Setting from './components/core/Dashboard/Setting';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Cart/Cart';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/constants';
import AddCourse from './components/core/AddCourse/AddCourse';
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourses from './pages/ViewCourses';
import VideoPlayer from './components/core/ViewCourse/VideoPlayer';
import MyDashboard from './components/core/Dashboard/MyDashboard';



function App() {
    const {user} = useSelector((state)=>state.profile);
    return (
        <div className="relative w-screen min-h-screen bg-richblack-900 flex flex-col font-inter text-white z-0">
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}/>
                <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
                <Route path='/forgot-password' element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
                <Route path='/verify-email' element={<OpenRoute><VerifyOtp/></OpenRoute>}/>
                <Route path='/update-password/:id' element={<OpenRoute><ResestPassword/></OpenRoute>}/>
                <Route path='/about' element={<AboutPages/>}/>
                <Route path='/contact' element={<ContactUsPages/>}/>
                <Route path='/catalog/:categoryName' element={<Catalog/>}/>

                <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
                    <Route path='/dashboard/my-profile' element={<PrivateRoute><MyProfile/></PrivateRoute>}/>
                    <Route path='/dashboard/setting' element={<PrivateRoute><Setting/></PrivateRoute>}/>
                    {
                        user?.accountType === ACCOUNT_TYPE.STUDENT && (
                            <>
                                <Route path='/dashboard/enrolled-courses' element={<PrivateRoute><EnrolledCourses/></PrivateRoute>}/>
                                <Route path='/dashboard/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
                            </>
                        )
                    }
                    {
                        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                            <>
                                <Route path='/dashboard/add-course' element={<PrivateRoute><AddCourse/></PrivateRoute>}/>
                                <Route path='/dashboard/my-courses' element={<PrivateRoute><MyCourses/></PrivateRoute>}/>
                                <Route path='/dashboard/instructor' element={<PrivateRoute><MyDashboard/></PrivateRoute>}/>
                                <Route path='/dashboard/edit-courses/:id' element={<PrivateRoute><EditCourse/></PrivateRoute>}/>
                            </>
                        )
                    }
                </Route>
                <Route path='/view-course/:courseID' element={<PrivateRoute><ViewCourses/></PrivateRoute>}>
                    {
                        user?.accountType===ACCOUNT_TYPE.STUDENT && (
                            <Route path='/view-course/:courseID/section/:sectionID/sub-section/:subSectionID' element={<VideoPlayer/>}/>
                        )
                    }
                </Route>
                <Route path='/course/:courseID' element={<CourseDetails/>}/>
            </Routes>
        </div>
    );
}

export default App;
