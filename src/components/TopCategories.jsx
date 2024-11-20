import { Link } from "react-router-dom"
import invitation from '../assets/images/placeholder.jpg'
import planners from '../assets/images/planner.webp'
import welcome from '../assets/images/welcome sign.webp'
import vinvite from '../assets/images/v-invite.webp'

export default function TopCategories() {
  const categories = [

    { title: "Invitations", image: invitation },
    { title: "Planners", image: planners },
    { title: "Welcome Signage", image: welcome },
    { title: "Video Invites", image: vinvite },
  ]

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  text-brown-900 mb-4">
            Let Us Make Your Best Day A Memorable One!
          </h2>
          <div className="w-40 h-0.5 bg-amber-400 mx-auto mb-6"></div>
          <h3 className="text-xl text-amber-700 font-medium">
            BROWSE OUR POPULAR CATEGORIES
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              to={`/products/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="group"
            >
              <div className="relative flex flex-col items-center">
                <div className="w-full aspect-square mb-3 transform transition-transform group-hover:scale-105 overflow-hidden">
                  {/* <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl"></div> */}
                  <img
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover absolute opacity-40"
                  />
                  <h4 className="absolute top-[45%] w-full text-center font-medium text-amber-700 text-xl md:text-4xl group-hover:text-amber-900 transition-colors z-20">
                    {category.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to='/categories' className="rounded-full bg-[#14233C] px-6 py-3 text-white hover:bg-white hover:border-[#14233C] border hover:text-[#14233C] ">
            See More Categories
          </Link>
        </div>
      </div>
    </section>
  )
}