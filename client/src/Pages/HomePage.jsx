import React from 'react'
import HomeLayouts from "../Layouts/HomeLayouts"
import { Link } from 'react-router-dom'
import homePageMainImage from '../assets/Images/homePageMainImage.png'
function HomePage() {
  return (
  <>
  <HomeLayouts>

  <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        {/* for platform details */}
        <div className="sm:ml-64 m-1  space-y-6">
          <h1 className="text-5xl font-semibold">
            Find out best{" "}
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-200">
            We have a large library of courses taught by highly skilled and
            qualified faculities at a very affordable cost.
          </p>

          {/* for buttons */}
          <div className="space-x-6">
            <Link to={"/courses"}>
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>
            <Link to={"/contact"}>
              <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:border-yellow-600 transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* right section for image */}
        <div className="w-1/2 flex items-center justify-center">
          <img src={homePageMainImage} alt="home page image" />
        </div>
      </div>
  </HomeLayouts>
  </>
  )
}

export default HomePage