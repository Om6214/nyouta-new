"use client";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import bgImg from "../assets/images/mahal1.png";
const testimonials = [
  {
    id: 1,
    name: "Aditi & Vikram",
    role: "Homeowner",
    content:
      "Elegant, unique, and easy to share—our wedding invite was perfect!",
    avatar:
      "https://images.pexels.com/photos/18173195/pexels-photo-18173195/free-photo-of-couple-talking-on-the-sidewalk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 2,
    name: "Meera & Aditya",
    role: "Property Investor",
    content:
      "The animated invite was magical and set the tone for our big day.",
    avatar:
      "https://images.pexels.com/photos/14904695/pexels-photo-14904695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700"], // All Gold
  },
  {
    id: 3,
    name: "Shivani & Kunal",
    role: "First-time Buyer",
    content:
      "Angira Creation captured our love story beautifully in the invitation.",
    avatar:
      "https://images.pexels.com/photos/9827806/pexels-photo-9827806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 4,
    name: "Divya & Aarav",
    role: "First-time Buyer",
    content: "Modern, eco-friendly, and absolutely gorgeous. Loved it!",
    avatar:
      "https://images.pexels.com/photos/6023737/pexels-photo-6023737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 5,
    name: "Niharika & Raj",
    role: "Commercial Property Owner",
    content: "Stunning design and hassle-free process. Highly recommend!",
    avatar:
      "https://images.pexels.com/photos/7742859/pexels-photo-7742859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 6,
    name: "Preeti & Sameer",
    role: "Commercial Property Owner",
    content: "Guests couldn’t stop praising the unique and elegant design.",
    avatar:
      "https://images.pexels.com/photos/8819460/pexels-photo-8819460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 7,
    name: "Tanvi & Manan",
    role: "Commercial Property Owner",
    content: "Exceeded all expectations—our invite was simply perfect!",
    avatar:
      "https://images.pexels.com/photos/2586337/pexels-photo-2586337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 8,
    name: "Rohini & Akshay",
    role: "Commercial Property Owner",
    content: "Professional, creative, and fast. A wonderful experience!",
    avatar:
      "https://images.pexels.com/photos/2649169/pexels-photo-2649169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 9,
    name: "Ria & Arjun",
    role: "Commercial Property Owner",
    content: "The perfect mix of tradition and modern elegance. Thank you!",
    avatar:
      "https://images.pexels.com/photos/29433054/pexels-photo-29433054/free-photo-of-black-and-white-couple-in-sunlit-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 10,
    name: "Priya & Rajesh",
    role: "Commercial Property Owner",
    content: "A seamless process from concept to delivery. Highly satisfied!",
    avatar:
      "https://images.pexels.com/photos/28998612/pexels-photo-28998612/free-photo-of-romantic-couple-in-scenic-cao-b-ng-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 11,
    name: "Shalini & Raj",
    role: "Commercial Property Owner",
    content:
      "A beautiful invitation that set the perfect tone for our wedding.",
    avatar:
      "https://images.pexels.com/photos/14682161/pexels-photo-14682161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 12,
    name: "Priya & Vikram",
    role: "Commercial Property Owner",
    content: "Angira Creation made our wedding planning so much easier.",
    avatar:
      "https://images.pexels.com/photos/8142734/pexels-photo-8142734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 13,
    name: "Anjali & Kunal",
    role: "Commercial Property Owner",
    content: "The invite was a perfect blend of tradition and modernity.",
    avatar:
      "https://images.pexels.com/photos/26821403/pexels-photo-26821403/free-photo-of-couple-hugging-on-a-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 14,
    name: "Sanya & Arjun",
    role: "Commercial Property Owner",
    content: "Our wedding invite was a masterpiece. Thank you!",
    avatar:
      "https://images.pexels.com/photos/12909946/pexels-photo-12909946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 15,
    name: "Priya & Rajesh",
    role: "Commercial Property Owner",
    content: "Guests loved the interactive features of our digital invite.",
    avatar:
      "https://images.pexels.com/photos/17131240/pexels-photo-17131240/free-photo-of-couple-with-hats-against-sunset-over-sea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 16,
    name: "Neha & Karan",
    role: "Commercial Property Owner",
    content: "A hassle-free experience with a beautiful outcome.",
    avatar:
      "https://images.pexels.com/photos/17030108/pexels-photo-17030108/free-photo-of-a-man-and-woman-standing-next-to-each-other-in-front-of-a-blue-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 17,
    name: "Aarav & Meera",
    role: "Commercial Property Owner",
    content: "Professional service and a stunning final product.",
    avatar:
      "https://images.pexels.com/photos/23801564/pexels-photo-23801564/free-photo-of-back-view-of-a-couple-walking-with-umbrellas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 18,
    name: "Anjali & Kunal",
    role: "Commercial Property Owner",
    content: "The invite was a perfect blend of tradition and modernity.",
    avatar:
      "https://images.pexels.com/photos/5032974/pexels-photo-5032974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 19,
    name: "Priya & Rajesh",
    role: "Commercial Property Owner",
    content: "Guests loved the interactive features of our digital invite.",
    avatar:
      "https://images.pexels.com/photos/7275701/pexels-photo-7275701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 20,
    name: "Maya % Aarav",
    role: "Commercial Property Owner",
    content: "The best decision we made for our wedding—so beautiful and easy!",
    avatar:
      "https://images.pexels.com/photos/26545208/pexels-photo-26545208/free-photo-of-woman-in-skirt-sitting-with-man-lying-down-in-shirt-on-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 21,
    name: "Simran & Karan",
    role: "Commercial Property Owner",
    content: "Everyone loved the creative and elegant design. Thank you!",
    avatar:
      "https://images.pexels.com/photos/21751236/pexels-photo-21751236/free-photo-of-smiling-woman-sitting-in-traditional-wedding-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 22,
    name: "Ishita & Raghav",
    role: "Commercial Property Owner",
    content: "The level of detail in our wedding invitation was incredible.",
    avatar:
      "https://images.pexels.com/photos/9767149/pexels-photo-9767149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 23,
    name: "Meera & Sanjay",
    role: "Commercial Property Owner",
    content: "The design team brought our vision to life beautifully!",
    avatar:
      "https://images.pexels.com/photos/18213335/pexels-photo-18213335/free-photo-of-woman-and-man-posing-in-biker-gear-and-helmet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 24,
    name: "Ananya & Viraj",
    role: "Commercial Property Owner",
    content: "Quick, professional, and stunning. Absolutely loved it!",
    avatar:
      "https://images.pexels.com/photos/12726029/pexels-photo-12726029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 25,
    name: "Diya & Aditya",
    role: "Commercial Property Owner",
    content:
      "A breathtaking invite that set the tone for our wedding perfectly.",
    avatar:
      "https://images.pexels.com/photos/16013881/pexels-photo-16013881/free-photo-of-man-and-woman-walking-with-umbrella.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 26,
    name: "Raj & Sneha",
    role: "Commercial Property Owner",
    content: "The digital wedding card was vibrant, modern, and easy to share!",
    avatar:
      "https://images.pexels.com/photos/16235187/pexels-photo-16235187/free-photo-of-silhouette-of-couple-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 27,
    name: "Tanvi & Sameer",
    role: "Commercial Property Owner",
    content: "Our guests were wowed by the invite’s beauty and elegance.",
    avatar:
      "https://images.pexels.com/photos/18526272/pexels-photo-18526272/free-photo-of-man-extends-wishes-to-woman.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 28,
    name: "Naina & Akash",
    role: "Commercial Property Owner",
    content:
      "A digital masterpiece for our wedding that left a lasting impression!",
    avatar:
      "https://images.pexels.com/photos/5954848/pexels-photo-5954848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 29,
    name: "Pooja & Rahul",
    role: "Commercial Property Owner",
    content:
      "The eco-friendly invitation was as stunning as it was thoughtful.",
    avatar:
      "https://images.pexels.com/photos/12909943/pexels-photo-12909943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  {
    id: 30,
    name: "Isha & Rohan",
    role: "Commercial Property Owner",
    content:
      "Such an elegant and unique design—we’re still receiving compliments!",
    avatar:
      "https://images.pexels.com/photos/14010684/pexels-photo-14010684.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image
    starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  },
  // {
  //   id: 31,
  //   name: "Alisha & Ankur",
  //   role: "Commercial Property Owner",
  //   content:
  //     "It felt like a luxury experience from start to finish. Thank you!",
  //   avatar: "https://picsum.photos/80?random=4", // Placeholder image
  //   starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  // },
  // {
  //   id: 32,
  //   name: "Aditi & Pranav",
  //   role: "Commercial Property Owner",
  //   content: "We loved how the invite perfectly matched our wedding theme!",
  //   avatar: "https://picsum.photos/80?random=4", // Placeholder image
  //   starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  // },
  // {
  //   id: 33,
  //   name: "Divya & Suraj",
  //   role: "Commercial Property Owner",
  //   content: "Our families were amazed by the beauty of the digital card!",
  //   avatar: "https://picsum.photos/80?random=4", // Placeholder image
  //   starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  // },
  // {
  //   id: 34,
  //   name: "Meera & Sanjay",
  //   role: "Commercial Property Owner",
  //   content: "The design team brought our vision to life beautifully!",
  //   avatar: "https://picsum.photos/80?random=4", // Placeholder image
  //   starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  // },
  // {
  //   id: 35,
  //   name: "Aditi & Vikram",
  //   role: "Commercial Property Owner",
  //   content:
  //     "The wedding calendar was stunning—a beautiful way to relive our special day",
  //   avatar: "https://picsum.photos/80?random=4", // Placeholder image
  //   starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  // },
  // {
  //   id: 36,
  //   name: "Ria & Arjun",
  //   role: "Commercial Property Owner",
  //   content:
  //     "Flipping through the calendar each month is like reliving our wedding!",
  //   avatar: "https://picsum.photos/80?random=4", // Placeholder image
  //   starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  // },
  // {
  //   id: 37,
  //   name: "Ananya & Ritesh",
  //   role: "Commercial Property Owner",
  //   content:
  //     "A beautifully crafted reminder of our special day. Truly amazing!",
  //   avatar: "https://picsum.photos/80?random=4", // Placeholder image
  //   starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  // },
  // {
  //   id: 38,
  //   name: "Neha & Rohit",
  //   role: "Commercial Property Owner",
  //   content:
  //     "Our wedding calendar turned out to be a favorite gift for family!",
  //   avatar: "https://picsum.photos/80?random=4", // Placeholder image
  //   starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  // },
  // {
  //   id: 39,
  //   name: "Ishika & Pranav",
  //   role: "Commercial Property Owner",
  //   content:
  //     "The wedding itinerary was beautifully designed and so helpful for our guests!",
  //   avatar: "https://picsum.photos/80?random=4", // Placeholder image
  //   starColors: ["#FFD700", "#FFD700", "#FFD700", "#C0C0C0", "#C0C0C0"], // Gold and Silver
  // },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  var settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="my-4 text-primaryBlue ">
      <div className="container mx-auto lg:px-4 px-0">
        <h2 className="mb-12 text-secondary font-avalonB text-center text-2xl tracking-tight lg:text-4xl">
          Real Stories, Real Experiences – Our Customers Speak
        </h2>
        <div className="relative mx-auto  overflow-hidden">
          <div className="slider-container mx-16">
            <Slider {...settings}>
              {testimonials.map((items) => (
                <div>
                  <div className="flex flex-col gap-4 items-center relative font-heroFont overflow-hidden">
                    <img src={bgImg} className="h-[320px]" alt="" />
                    <div className=" flex flex-col gap-4 items-center justify-around absolute py-10 h-[350px]">
                      <img
                        className="rounded-full w-24"
                        src={items.avatar}
                        alt=""
                      />
                      <div className="flex flex-col gap-3 pt-4 items-center h-[150px]">
                        <p className="text-center font-avalonN h-[80%] px-3  ">
                          {items.content}
                        </p>
                        <h1 className="font-avalonB h-[20%] bg-pink-600 px-4 text-white">
                          {items.name}
                        </h1>
                        {/* <blockquote className="text-center">
                        {items.role}
                      </blockquote> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="mb-4 rounded-full"
                  />
                  <blockquote className="mb-4 font-heroFont text-lg italic">"{testimonial.content}"</blockquote>
                  <div className="flex">
                    {testimonial.starColors.map((color, index) => (
                      <Star
                        key={index}
                        style={{ fill: color }} // Use `fill` to color the inside of the star
                        className="w-5 h-5"
                      />
                    ))}
                  </div>

                  <cite className="not-italic">
                    <span className="font-semibold font-heroFont">{testimonial.name}</span>
                    <span className="block text-sm text-gray-400">{testimonial.role}</span>
                  </cite>
                </div>
              </div>
            ))}
          </div> */}
        </div>
        {/* <div className="mt-8 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentTestimonial ? 'bg-third' : 'bg-amber-600'
                }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
