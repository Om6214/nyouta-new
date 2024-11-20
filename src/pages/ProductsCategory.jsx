import { useParams, Link } from "react-router-dom";
import savethedate from "../assets/images/savethedate.webp";
import invitation from "../assets/images/placeholder.jpg";
import vinvite from "../assets/images/v-invite.webp";

export default function ProductsCategory() {
  const { category } = useParams();

  const products = [
    { id: "1", title: "Save the Date Card 1", category: "save-the-date", image: savethedate },
    { id: "2", title: "Save the Date Card 2", category: "save-the-date", image: savethedate },
    { id: "3", title: "Wedding Invite 1", category: "wedding-invites", image: invitation },
    { id: "4", title: "Haldi Invite 1", category: "haldi-ceremony", image: vinvite },
    { id: "5", title: "Wedding Invite 2", category: "wedding-invites", image: invitation },
    { id: "6", title: "Haldi Invite 2", category: "haldi-ceremony", image: vinvite },
  ];

  const filteredProducts = products.filter((product) => product.category === category);

  return (
    <section className="py-16 px-4 bg-amber-50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl text-brown-900">
            Products in "{category.replace(/-/g, " ")}"
          </h2>
          <div className="w-40 h-0.5 bg-amber-400 mx-auto my-4"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-full aspect-square mb-3 transform transition-transform group-hover:scale-105 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover"
                    />
                    <h4 className="absolute top-[45%] w-full text-center font-medium text-amber-700 text-xl md:text-4xl group-hover:text-amber-900 transition-colors z-20">
                      {product.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-amber-700 text-xl">
             
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="text-amber-700 hover:text-amber-900">
            Back to Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
