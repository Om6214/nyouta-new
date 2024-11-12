import { Link } from "react-router-dom"


export default function TopCategories() {
  const categories = [
    { title: "Save the Date", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Invites", image: "/placeholder.svg?height=200&width=200" },
    { title: "Haldi Ceremony", image: "/placeholder.svg?height=200&width=200" },
    { title: "Mehendi Ceremony", image: "/placeholder.svg?height=200&width=200" },
    { title: "Sangeet Ceremony", image: "/placeholder.svg?height=200&width=200" },
    { title: "Manuhar Patrika", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Timeline", image: "/placeholder.svg?height=200&width=200" },
    { title: "Theme Invitations", image: "/placeholder.svg?height=200&width=200" },
    { title: "New Trendz", image: "/placeholder.svg?height=200&width=200" },
    { title: "Matrimonial Biodata", image: "/placeholder.svg?height=200&width=200" },
    { title: "Birthday Invites", image: "/placeholder.svg?height=200&width=200" },
    { title: "Sawamani Invites", image: "/placeholder.svg?height=200&width=200" },
    { title: "Lohri Invites", image: "/placeholder.svg?height=200&width=200" },
    { title: "Griha Pravesh", image: "/placeholder.svg?height=200&width=200" },
    { title: "Halloween Party", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding NewsPaper", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Photo Book", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Magazine", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Planners", image: "/placeholder.svg?height=200&width=200" },
    { title: "Offer & Discount", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <section className="py-16 px-4 bg-amber-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brown-900 mb-4">
            Let Us Make Your Best Day A Memorable One!
          </h2>
          <div className="w-40 h-0.5 bg-amber-400 mx-auto mb-6"></div>
          <h3 className="text-xl text-amber-700 font-medium">
            BROWSE OUR POPULAR CATEGORIES
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="group"
            >
              <div className="relative flex flex-col items-center">
                <div className="relative w-full aspect-square mb-3 transform transition-transform group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl"></div>
                  <img
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h4 className="text-center text-brown-800 font-medium text-sm md:text-base group-hover:text-amber-700 transition-colors">
                  {category.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}