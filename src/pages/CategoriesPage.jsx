import { Link } from "react-router-dom"
import savethedate from '../assets/images/savethedate.webp'
import invitation from '../assets/images/placeholder.jpg'
import vinvite from '../assets/images/v-invite.webp'
import welcome from '../assets/images/welcome sign.webp'
export default function CategoriesPage() {
  const categories = [
    { title: "Save the Date", image: savethedate },
    { title: "Wedding Invites", image: invitation },
    { title: "Haldi Ceremony", image: vinvite },
    { title: "Mehendi Ceremony", image: invitation },
    { title: "Sangeet Ceremony", image: vinvite },
    { title: "Manuhar Patrika", image: savethedate },
    { title: "Wedding Timeline", image: welcome },
    { title: "Theme Invitations", image: savethedate },
    { title: "New Trendz", image: vinvite },
    { title: "Matrimonial Biodata", image: welcome },
    { title: "Birthday Invites", image: invitation},
    { title: "Sawamani Invites", image: savethedate },
    { title: "Lohri Invites", image: vinvite },
    { title: "Griha Pravesh", image: invitation },
    { title: "Halloween Party", image: savethedate},
    { title: "Wedding NewsPaper", image: welcome },
    { title: "Wedding Photo Book", image: welcome },
    { title: "Wedding Magazine", image: savethedate },
    { title: "Wedding Planners", image: vinvite },
    { title: "Offer & Discount", image: invitation },
  ]
  return (
    <section className="py-16 px-4 bg-amber-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  text-brown-900 mb-4">
            Wide range of Categories perfect for your event!
          </h2>
          <div className="w-40 h-0.5 bg-amber-400 mx-auto mb-6"></div>
          <h3 className="text-xl text-amber-700 font-medium">
            BROWSE OUR POPULAR CATEGORIES
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 md:gap-6">
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
      </div>
    </section>
  )
}