import React, { useEffect, useRef, useState } from 'react'
import Nav from './NaV.JSX'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(state => state.user)

  const cateScrollRef = useRef(null)
  const shopScrollRef = useRef(null)

  const navigate = useNavigate()

  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightCateButton, setShowRightCateButton] = useState(false)
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)
  const [updatedItemsList, setUpdatedItemsList] = useState([])

  // 🔥 Scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: "smooth" })
  }

  // 🔥 Filter
  const handleFilterByCategory = (category) => {
    if (category === "All") {
      setUpdatedItemsList(itemsInMyCity)
    } else {
      const filtered = itemsInMyCity?.filter(i => i.category === category)
      setUpdatedItemsList(filtered)
    }
  }

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity)
  }, [itemsInMyCity])

  // 🔥 Scroll buttons logic
  const updateButton = (ref, setLeft, setRight) => {
    const el = ref.current
    if (el) {
      setLeft(el.scrollLeft > 0)
      setRight(el.scrollLeft + el.clientWidth < el.scrollWidth)
    }
  }

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    const cateEl = cateScrollRef.current
    const shopEl = shopScrollRef.current

    const cateHandler = () => updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
    const shopHandler = () => updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)

    cateEl?.addEventListener("scroll", cateHandler)
    shopEl?.addEventListener("scroll", shopHandler)

    return () => {
      cateEl?.removeEventListener("scroll", cateHandler)
      shopEl?.removeEventListener("scroll", shopHandler)
    }
  }, [])

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6]'>

      <Nav />

      {/* 🔍 SEARCH RESULTS */}
      {searchItems && (
        <div className='w-full max-w-6xl p-5 bg-white shadow-md rounded-2xl mt-4'>
          <h1 className='text-2xl font-semibold border-b pb-2'>Search Results</h1>

          {searchItems.length > 0 ? (
            <div className='flex flex-wrap gap-6 justify-center mt-4'>
              {searchItems.map(item => (
                <FoodCard key={item._id} data={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No items found</p>
          )}
        </div>
      )}

      {/* 🔥 HERO */}
      <div id="home" className="w-full max-w-6xl px-4 mt-4">
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6">
            <h1 className="text-white text-xl sm:text-3xl font-bold">
              Order your favorite food here
            </h1>
            <p className="text-gray-200 mt-2">
              Discover the best food in Ahmednagar{currentCity || "your city"}
            </p>
            <button
              onClick={() => scrollToSection("menu")}
              className="mt-4 w-fit bg-[#ff4d2d] px-5 py-2 rounded-lg text-white"
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 MENU */}
      <div id="menu" className="w-full max-w-6xl px-4 mt-6">
        <h1 className='text-2xl font-semibold mb-4'>Explore Menu</h1>

        <div className='relative'>
          {showLeftCateButton && (
            <button className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#ff4d2d] p-2 rounded-full text-white'
              onClick={() => scrollHandler(cateScrollRef, "left")}>
              <FaCircleChevronLeft />
            </button>
          )}

          <div ref={cateScrollRef} className='flex overflow-x-auto gap-4 pb-2'>
            {categories.map((cate, i) => (
              <CategoryCard
                key={i}
                name={cate.category}
                image={cate.image}
                onClick={() => handleFilterByCategory(cate.category)}
              />
            ))}
          </div>

          {showRightCateButton && (
            <button className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#ff4d2d] p-2 rounded-full text-white'
              onClick={() => scrollHandler(cateScrollRef, "right")}>
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* 🔥 SHOPS */}
      <div className='w-full max-w-6xl px-4 mt-6'>
        <h1 className='text-2xl font-semibold mb-4'>
          Best Shops in Ahmednagar{currentCity}
        </h1>

        <div className='relative'>
          {showLeftShopButton && (
            <button className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#ff4d2d] p-2 rounded-full text-white'
              onClick={() => scrollHandler(shopScrollRef, "left")}>
              <FaCircleChevronLeft />
            </button>
          )}

          <div ref={shopScrollRef} className='flex overflow-x-auto gap-4 pb-2'>
            {shopInMyCity?.map((shop, i) => (
              <CategoryCard
                key={i}
                name={shop.name}
                image={shop.image}
                onClick={() => navigate(`/shop/${shop._id}`)}
              />
            ))}
          </div>

          {showRightShopButton && (
            <button className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#ff4d2d] p-2 rounded-full text-white'
              onClick={() => scrollHandler(shopScrollRef, "right")}>
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* 🔥 FOOD ITEMS */}
      <div className='w-full max-w-6xl px-4 mt-6'>
        <h1 className='text-2xl font-semibold mb-4'>Suggested Food Items</h1>

        <div className='flex flex-wrap gap-6 justify-center'>
          {updatedItemsList?.map((item, i) => (
            <FoodCard key={i} data={item} />
          ))}
        </div>
      </div>

      {/* 🔥 FOOTER */}
      <footer className="w-full mt-10 px-3">
      <div className="bg-orange-200 rounded-2xl max-w-6xl mx-auto overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="https://res-console.cloudinary.com/daijit9dm/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/bG9nb190bGV2Znk=/template_primary" className="w-25 h-25" />
              <h1 className="text-2xl font-bold">FoodyFy</h1>
            </div>
            <p>Fresh food delivered fast 🚀</p>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2 ">
              <li onClick={() => scrollToSection('home')} className="cursor-pointer">Home</li>
              <li onClick={() => scrollToSection('menu')} className="cursor-pointer">Menu</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Contact</h2>
            <p>{currentCity}</p>
            <p>+91 91234 57459</p>
          </div>

        </div>

        <div className="text-center pb-4">
          © {new Date().getFullYear()} FoodyFy
        </div>
        </div>
      </footer>
          
    </div>
  )
}

export default UserDashboard