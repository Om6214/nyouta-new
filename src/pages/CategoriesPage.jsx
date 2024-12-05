import { Link } from "react-router-dom";
import productData from '../products.json';

export default function CategoriesPage() {
  // Map category names to images from the product JSON
  const categories = [
    { title: "Save the Date", imageKey: "Save the Date Floral Card" },
    { title: "Wedding Invites", imageKey: "Elegant Wedding Invitation" },
    { title: "Haldi Ceremony", imageKey: "Sangeet Ceremony Invitation" },
    { title: "Mehendi Ceremony", imageKey: "Traditional Pooja Invitation" },
    { title: "Sangeet Ceremony", imageKey: "Sangeet Ceremony Invitation" },
    { title: "Manuhar Patrika", imageKey: "Classic Pooja Invitation" },
    { title: "Wedding Timeline", imageKey: "Modern Ceremony Invitation" },
    { title: "Theme Invitations", imageKey: "Rustic Party Invitation" },
    { title: "New Trendz", imageKey: "Wedding News E-Paper Subscription" },
    { title: "Matrimonial Biodata", imageKey: "Event E-Magazine Subscription" },
    { title: "Birthday Invites", imageKey: "Rustic Party Invitation" },
    { title: "Sawamani Invites", imageKey: "Traditional Engagement Invitation" },
    { title: "Lohri Invites", imageKey: "Vintage Party Invitation" },
    { title: "Griha Pravesh", imageKey: "Formal Ceremony Invitation" },
    { title: "Halloween Party", imageKey: "Halloween Party Invitation" },
    { title: "Wedding NewsPaper", imageKey: "Wedding News E-Paper Subscription" },
    { title: "Wedding Photo Book", imageKey: "Photo E-Book Wedding Edition" },
    { title: "Wedding Magazine", imageKey: "Event E-Magazine Subscription" },
    { title: "Wedding Planners", imageKey: "Ultimate Wedding Planner" },
    { title: "Offer & Discount", imageKey: "Budget Wedding Planner" },
  ];

  // Generate the categories with images from JSON
  const categoriesWithImages = categories.map((category) => {
    const product = productData.find(
      (item) => item.name === category.imageKey
    );
    return {
      ...category,
      image: product?.image?.[0] || "", // Use the first image or fallback to an empty string
    };
  });

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-yellow-100 to-amber-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brown-900 mb-4">
            Wide range of Categories perfect for your event!
          </h2>
          <div className="w-32 h-1 bg-amber-600 mx-auto my-4"></div>
          <h3 className="text-xl text-amber-700 font-medium">
            BROWSE OUR POPULAR CATEGORIES
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoriesWithImages.map((category, index) => (
            <Link
              to={`/products/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="group block relative overflow-hidden rounded-xl shadow-md transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-72 w-full">
                {/* Image with overlay */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="object-contain w-full h-full rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                {/* Category Title */}
                <h4 className="absolute inset-0 flex items-center justify-center text-center text-white font-bold text-lg md:text-xl lg:text-2xl tracking-wide px-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                  {category.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
