import React from "react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoriesNavBar = () => {
  const { pageName } = useParams();


  const datafile = {
    "print invitations": {
      Description: "Design and print stunning wedding invitations that perfectly capture the essence of your special day. Our premium collection offers sophisticated designs and high-quality materials to create memorable announcements that will set the tone for your celebration.",
      
      Details1: "Our Print Invitations service combines artistry with exceptional quality to deliver wedding stationery that exceeds your expectations. We understand that your wedding invitations are the first glimpse guests receive of your celebration, which is why we offer comprehensive customization options and expert guidance throughout the design process.",
      
      Details2: [
        "Choose from a wide range of card styles, colors, and sizes.",
        "Personalize with custom text, photos, and embellishments.",
        "High-quality printing on premium cardstock.",
        "Eco-friendly options available.",
        "Fast and reliable delivery to your doorstep."
      ],
      
      Details3: "Create lasting memories with beautifully crafted invitations that reflect your unique love story and set the perfect tone for your wedding celebration. Our dedication to quality and attention to detail ensures that your invitations will be treasured keepsakes for years to come."
    },
  
    "e-invitations": {
      Description: "Transform your wedding announcements with our innovative digital invitation platform that combines contemporary design with cutting-edge technology. Our e-invitations offer unlimited creative possibilities while providing convenient tracking and management features for a seamless guest experience.",
      
      Details1: "Experience the future of wedding invitations with our comprehensive digital platform that revolutionizes how you connect with your guests. Our E-Invitation service combines stunning visual design with smart features to create an engaging and interactive experience that makes planning your special day easier than ever.",
      
      Details2: [
        "Create personalized e-invitations with stunning designs.",
        "Easily share invitations via email, social media, or messaging apps.",
        "Track RSVPs and manage guest lists online.",
        "Add interactive elements like maps, music, and videos.",
        "Environmentally friendly and cost-effective."
      ],
      
      Details3: "Send invitations effortlessly and keep your guests updated with our innovative digital platform that combines beauty with functionality. Our e-invitations offer the perfect blend of style and convenience, ensuring your wedding communications are both memorable and effective."
    },
  
    "photo books": {
      Description: "Transform your precious wedding memories into elegant, professionally crafted photo books that tell your unique love story. Our premium photo book service combines cutting-edge printing technology with artistic design to create stunning keepsakes that will preserve your special moments for generations to come.",
      
      Details1: "Discover the art of storytelling through our meticulously designed photo books that capture every beautiful moment of your wedding journey. Our Personalised Photobooks service offers an exceptional combination of professional design expertise and superior printing quality to create timeless albums that showcase your memories in their best light.",
      
      Details2: [
        "Nyouta's photo books are a sleek and modern way to preserve your wedding memories.",
        "Create custom layouts with your favorite wedding photos.",
        "Add captions, dates, and special messages to each page.",
        "Choose from a variety of sizes, covers, and paper types.",
        "High-quality printing ensures vibrant and long-lasting photos."
      ],
      
      Details3: "Create an enduring legacy of your wedding day with our expertly crafted photo books that combine superior quality with personalized storytelling. Each page is thoughtfully designed to capture the essence of your celebration, resulting in a treasured keepsake that will bring joy and memories for generations."
    },
  
    "itinerary": {
      Description: "Craft comprehensive and stylish wedding itineraries that guide your guests through every moment of your celebration. Our professional itinerary service helps you create detailed schedules and information packages that ensure everyone can fully participate in and enjoy your special day, from welcome events to the final farewell.",
      
      Details1: "Transform your wedding timeline into an engaging and informative guide that keeps your guests informed and excited about every planned moment. Our Wedding Itineraries service combines practical organization with beautiful design to create comprehensive schedules that enhance the experience for everyone involved in your celebration.",
      
      Details2: [
        "Easily share event schedules, venue locations, and contact information.",
        "Provide guests with a convenient and organized guide to your wedding weekend.",
        "Customize the look and feel to match your wedding theme.",
        "Available in various formats, including printable PDFs and online versions.",
        "Reduce confusion and ensure a smooth and enjoyable experience for your guests."
      ],
      
      Details3: "Ensure your wedding celebrations flow seamlessly with our professionally designed itineraries that keep everyone informed and engaged throughout your special day. Our detailed guides combine practical information with elegant design to create the perfect roadmap for your wedding events."
    },
  
    "calendars 2025": {
      Description: "Create stunning personalized wedding countdown calendars that build anticipation for your 2025 celebration while helping you stay organized throughout the planning process. Our custom calendars combine practical functionality with beautiful design elements to create a unique way to track your journey to the altar.",
      
      Details1: "Embrace the excitement of your upcoming wedding with our beautifully designed 2025 calendars that transform the countdown to your special day into a memorable experience. Our Wedding Calendars service offers a perfect blend of practical planning tools and personalized design elements to help you track and celebrate every moment leading up to your wedding.",
      
      Details2: [
        "Count down to your wedding day with a stylish and personalized calendar.",
        "Feature your engagement photos or wedding logo.",
        "Mark important dates, such as RSVP deadlines and pre-wedding events.",
        "A unique and thoughtful gift for your wedding party.",
        "Perfect for planning and staying organized leading up to your big day."
      ],
      
      Details3: "Transform your wedding planning journey into an exciting countdown experience with our beautifully crafted 2025 calendars that combine practical organization with personalized design elements. Each month brings you closer to your special day while helping you stay organized and inspired throughout the planning process."
    },
  
    "free greetings": {
      Description: "Share your joy and excitement with our collection of elegant digital wedding greetings that allow you to connect with loved ones near and far. Our free greeting service offers a perfect blend of sophistication and convenience, enabling you to express your happiness and gratitude through beautifully designed digital cards.",
      
      Details1: "Discover the perfect way to share your wedding joy with our comprehensive collection of digital greetings that combine elegant design with heartfelt sentiment. Our Free Wedding Greetings service provides a sophisticated platform for expressing your happiness and connecting with loved ones through beautifully crafted digital messages.",
      
      Details2: [
        "Choose from a variety of beautiful and heartfelt wedding greeting cards.",
        "Personalize with your names, wedding date, and a special message.",
        "Easily share via email, social media, or messaging apps.",
        "A simple and heartfelt way to express your gratitude to your loved ones.",
        "Perfect for thanking guests, sending save-the-dates, or sharing wedding updates."
      ],
      
      Details3: "Connect with your loved ones through beautifully designed digital greetings that capture the joy and excitement of your wedding journey. Our free service makes it easy to share your happiness while maintaining the elegant tone of your celebration."
    },
  
    "guest surprising": {
      Description: "Create unforgettable moments for your wedding guests with our innovative surprise and delight services that go beyond traditional entertainment. Our comprehensive guest experience program helps you design and implement unique touches that will make your celebration truly memorable and ensure your guests feel specially honored throughout your wedding events.",
      
      Details1: "Elevate your wedding celebration with our creative guest experience services that transform ordinary moments into extraordinary memories. Our Guest Surprising Ideas program offers a carefully curated selection of unique entertainment options, thoughtful gestures, and unexpected delights that will leave a lasting impression on everyone who shares in your special day.",
      
      Details2: [
        "Discover creative and memorable ways to welcome and entertain your guests.",
        "Personalized welcome bags, favors, and thoughtful gestures.",
        "Interactive entertainment options to keep your guests engaged.",
        "Unique photo booth props and fun games for all ages.",
        "Create a lasting impression on your guests with unforgettable surprises."
      ],
      
      Details3: "Transform your wedding celebration into an unforgettable experience with carefully planned surprises and thoughtful touches that will delight your guests and create lasting memories. Our innovative ideas and attention to detail ensure that every moment of your celebration becomes an opportunity to create joy and wonder."
    },
  
    "planner books": {
      Description: "Stay perfectly organized throughout your wedding planning journey with our comprehensive planner books that combine practical tools with beautiful design. Our professional planning guides offer everything you need to coordinate your perfect day, from detailed checklists and budget trackers to vendor coordination sheets and timeline management tools.",
      
      Details1: "Experience stress-free wedding planning with our meticulously designed planner books that guide you through every aspect of creating your perfect celebration. Our Wedding Planner Books service provides comprehensive planning tools wrapped in elegant design, ensuring you have everything you need to coordinate your dream wedding with confidence and style.",
      
      Details2: [
        "Essential tools for planning every aspect of your wedding.",
        "Includes checklists, budget trackers, guest lists, and more.",
        "Elegant and stylish designs to match your wedding theme.",
        "Keep all your wedding planning information in one convenient place.",
        "Reduce stress and ensure a smooth and enjoyable wedding planning journey."
      ],
      
      Details3: "Transform your wedding planning experience into an organized and enjoyable journey with our professionally designed planner books that combine practical tools with beautiful aesthetics. Our comprehensive guides ensure every detail is perfectly coordinated while maintaining the joy and excitement of planning your special day."
    },
  
    "e shop": {
      Description: "Discover a carefully curated collection of premium wedding essentials in our comprehensive online marketplace. Our E-Shop offers everything you need to create your perfect celebration, from elegant decorations and personalized favors to unique gifts and essential planning tools, all available with convenient shopping and reliable delivery.",
      
      Details1: "Welcome to your ultimate wedding planning destination, where finding the perfect items for your special day is both enjoyable and convenient. Our E-Shop combines an extensive selection of premium wedding products with exceptional customer service to ensure you have everything you need to create your dream celebration.",
      
      Details2: [
        "Browse a wide selection of wedding decorations, favors, and accessories.",
        "Find unique and personalized gifts for your wedding party.",
        "Convenient and easy online shopping experience.",
        "Secure payment options and fast shipping.",
        "Everything you need to make your wedding day unforgettable."
      ],
      
      Details3: "Experience the convenience and joy of curating your perfect wedding with our comprehensive online marketplace that brings together everything you need for your special day. Our carefully selected collection ensures quality and style while making the shopping process enjoyable and stress-free."
    },
  };



  const images = [
    "https://img.freepik.com/free-photo/top-view-gift-wrapping-composition_23-2148455718.jpg?t=st=1734674377~exp=1734677977~hmac=84a23b1b4f2690a609ff97e6640751abef1f27a125ca0b407e9b7d38f8396c5f&w=996",
    "https://img.freepik.com/free-photo/close-up-christmas-present-decorated-with-dried-flowers-dry-orange-wrapped-craft-paper_169016-14425.jpg?t=st=1735809332~exp=1735812932~hmac=b2f388421807280c81f6701e99b1045b5fcc18a3807238bc9534e9bf4f24c3ee&w=1060",
    "https://img.freepik.com/free-photo/gift-box-decorated-with-ribbons-decorative-roses-knitted-items-original-gift-wrapping-valentine-s-day_169016-8851.jpg?t=st=1735809475~exp=1735813075~hmac=29fa67a9acc9e871ef0e838420c76f5c2be4707d446fb34db99cc47247a69b38&w=996",
    "https://img.freepik.com/free-photo/top-view-hand-holding-furoshiki-package_23-2150274480.jpg?t=st=1735809508~exp=1735813108~hmac=d7588c5a3b60c924bb0cc9683c7f9528b4cae8b4f2a986f15d76ee131fbc9e56&w=996",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const categories = {
    "print invitations": {
      title: "Print Invitations",
      url: "Print Invitations",
      Description: "Design and print stunning wedding invitations that perfectly capture the essence of your special day. Our premium collection offers sophisticated designs and high-quality materials to create memorable announcements that will set the tone for your celebration.",
      subCategory: [
        {
          subTitle: "Wedding Invitations",
          imgUrl: "https://imagizer.imageshack.com/img922/7829/cplqEv.jpg", // URL from product.json
          url: "/products/wedding-invites",
        },
        {
          subTitle: "Party Invitation",
          imgUrl: "https://imagizer.imageshack.com/img923/1097/0Gyp7f.jpg", // URL from product.json
          url: "/products/party-invites",
        },
        {
          subTitle: "Pooja Invitations",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // URL from product.json
          url: "/products/pooja-invites",
        },
        {
          subTitle: "Ceremony Invitations",
          imgUrl: "https://imagizer.imageshack.com/img922/701/tU9pus.jpg", // URL from product.json
          url: "/products/ceremony-invites",
        },
      ],
    },
    "e-invitations": {
      title: "E Invitations",
      url: "/e-invitations",
      Description: "Transform your wedding announcements with our innovative digital invitation platform that combines contemporary design with cutting-edge technology. Our e-invitations offer unlimited creative possibilities while providing convenient tracking and management features for a seamless guest experience.",
     subCategory: [
        {
          subTitle: "Wedding Invitations",
          imgUrl: "https://imagizer.imageshack.com/img922/7829/cplqEv.jpg", // URL from product.json
        },
        {
          subTitle: "Party Invitations",
          imgUrl: "https://imagizer.imageshack.com/img923/1097/0Gyp7f.jpg", // URL from product.json
        },
        {
          subTitle: "Pooja Invitations",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // URL from product.json
        },
        {
          subTitle: "Ceremony Invitations",
          imgUrl: "https://imagizer.imageshack.com/img922/701/tU9pus.jpg", // URL from product.json
        },
        {
          subTitle: "Short Invitation - Free",
          imgUrl: "https://imagizer.imageshack.com/img922/701/tU9pus.jpg", // URL from product.json
        },
        {
          subTitle: "Matrimonial Biodata",
          imgUrl: "https://imagizer.imageshack.com/img922/701/tU9pus.jpg", // URL from product.json
        },
      ],
    },
    "photo books": {
      title: "Photo Books",
      url: "/photo-books",
      Description: "Transform your precious wedding memories into elegant, professionally crafted photo books that tell your unique love story. Our premium photo book service combines cutting-edge printing technology with artistic design to create stunning keepsakes that will preserve your special moments for generations to come.",
      subCategory: [
        {
          subTitle: "Soft Cover Photobook",
          imgUrl: "https://imagizer.imageshack.com/img922/7829/cplqEv.jpg", // Example image
        },
        {
          subTitle: "Hard Cover Photobook",
          imgUrl: "https://imagizer.imageshack.com/img924/2023/xASzg2.jpg", // Example image
        },
        {
          subTitle: "Spiral Photobook",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
        {
          subTitle: "Photo Folder",
          imgUrl: "https://imagizer.imageshack.com/img923/1097/0Gyp7f.jpg", // Example image
        },
        {
          subTitle: "Digtial Photobook > Best Seller",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
      ],
    },
    "itinerary": {
      title: "Itinerary",
      url: "/itinerary",
       Description: "Craft comprehensive and stylish wedding itineraries that guide your guests through every moment of your celebration. Our professional itinerary service helps you create detailed schedules and information packages that ensure everyone can fully participate in and enjoy your special day, from welcome events to the final farewell.",
 subCategory: [
        {
          subTitle: "Wedding Itinerary",
          imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
        },
        {
          subTitle: "Stickers",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
        {
          subTitle: "Tags / Bedges",
          imgUrl: "https://imagizer.imageshack.com/img922/3017/bflFDJ.jpg", // Example image
        },
        {
          subTitle: "Welcome Signages",
          imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
        },
        {
          subTitle: "Accessories",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
        {
          subTitle: "Games",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
      ],
    },
    "calendars 2025": {
      title: "Calendars 2025",
      url: "/calendars 2025",
          Description: "Create stunning personalized wedding countdown calendars that build anticipation for your 2025 celebration while helping you stay organized throughout the planning process. Our custom calendars combine practical functionality with beautiful design elements to create a unique way to track your journey to the altar.",
      subCategory: [
        {
          subTitle: "Mini Desktop Calendar",
          imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
        },
        {
          subTitle: "Wall Calendar - Potrait",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
        {
          subTitle: "Wall Calendar - Landscape",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
        {
          subTitle: "Desktop Calendar",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
        {
          subTitle: "Table Tent Calendar",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
        {
          subTitle: "Poster Calender",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
      ],
    },
    "free greetings": {
      title: "Free Greetings",
      url: "/free-greetings",
      Description: "Share your joy and excitement with our collection of elegant digital wedding greetings that allow you to connect with loved ones near and far. Our free greeting service offers a perfect blend of sophistication and convenience, enabling you to express your happiness and gratitude through beautifully designed digital cards.",
      subCategory: [
        {
          subTitle: "Wishes Greeting",
          imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
        },
        {
          subTitle: "Thanks Greeting",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
        {
          subTitle: "Feeling Greetings",
          imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
        },
        {
          subTitle: "Funny Greeting",
          imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
        },
      ],
    },
    "guest surprising": {
      title: "Guest Surprising",
      url: "/guest-surprising",
       Description: "Create unforgettable moments for your wedding guests with our innovative surprise and delight services that go beyond traditional entertainment. Our comprehensive guest experience program helps you design and implement unique touches that will make your celebration truly memorable and ensure your guests feel specially honored throughout your wedding events.",
       subCategory: [
        {
          subTitle: "Newspaper",
          imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
        },
        {
          subTitle: "Magazine",
          imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
        },
      ],
    },
    "planner books": {
      title: "Planner Books",
      url: "/planner-books",
     Description: "Stay perfectly organized throughout your wedding planning journey with our comprehensive planner books that combine practical tools with beautiful design. Our professional planning guides offer everything you need to coordinate your perfect day, from detailed checklists and budget trackers to vendor coordination sheets and timeline management tools.",
    subCategory: [
        {
          subTitle: "Planner Books",
          imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
        },
        {
          subTitle: "Free Printables",
          imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
        },
      ],
    },
    "e shop": {
      title: "E-Shop",
      url: "/e-shop",
      Description: "Discover a carefully curated collection of premium wedding essentials in our comprehensive online marketplace. Our E-Shop offers everything you need to create your perfect celebration, from elegant decorations and personalized favors to unique gifts and essential planning tools, all available with convenient shopping and reliable delivery.",
      subCategory: [
        {
          subTitle: "Shagun Envelop",
          imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
        },
        {
          subTitle: "Photo Magnet",
          imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
        },
        {
          subTitle: "Gifts",
          imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
        },
        {
          subTitle: "Essentials",
          imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
        },
      ],
    },
  };
  //  console.log(categories[pageName]);

  const content = categories[pageName] || {
    title: "Page Not Found",
    description: "This page does not exist.",
  };

  const DetailContent= datafile[pageName] || {
  }
  console.log(DetailContent);

  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-[#e7d8c9] to-[#eae0d5]">
          <div className="pt-4 pb-4 px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center min-h-[30vh] w-full"
            >
              {/* Left Section */}
              <div className="text-center md:text-left">
                <h1 className="text-[#333533] font-bold text-[6vw] md:text-[3vw] font-sans leading-tight">
                  {content.title}
                </h1>
                <p className="text-[#7f8c8d] font-medium text-[3vw] md:text-[1.2vw] mt-4 leading-relaxed">
                  {content.Description}
                </p>
              </div>

              {/* Right Section */}
              <div className="relative h-[40vh] md:h-[22vw]">
                <div className="flex justify-center w-full h-full">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Personalized Gifts"
                      className={`rounded-lg shadow-md object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-500 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div id="section2">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8 }}
          className="px-[6%] pt-[1%]"
        >
          <div className="font-semibold text-[4vh]">Accessories</div>
          <div className="font-normal md:text-[2.2vh] text-[2vw]">
            {/* Create personalized gifts for Kids, Friends, Loved ones and give them the your attention of love. */}
          </div>

          <div className="pt-5 md:max-w-[95%] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {content.subCategory.map((item) => (
                <Link
                  to={`${item.subTitle}`}
                  key={item.id}
                  className="block bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={item.imgUrl}
                    alt={item.subTitle}
                    className="w-full h-[41vh] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{item.subTitle}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>




  <div >
      <div id="section4">
        <div className="px-[6%] pt-[1%] py-6  text-gray-800">
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">
              About Our Personalised Card Stock Prints
            </h2>
            <p className="text-lg leading-relaxed">
              {DetailContent.Description}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">
              How to Create Your Card Stock Prints
            </h2>
            <p className="text-lg leading-relaxed">
             {DetailContent.Details1}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">
              Details of Our Variety of Card Stock Prints
            </h2>
            <ul className="list-disc list-inside text-lg leading-relaxed">
              {DetailContent.Details2.map((item, index) => (
    <li key={index} className="text-lg leading-relaxed">{item}</li>
  ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">
              Card Stock Prints Are Best Suited For
            </h2>
            <ul className="list-disc list-inside text-lg leading-relaxed">
              <li>
              {DetailContent.Details3}
                </li>
            </ul>
          </section>
        </div>
      </div>
      </div>
    </>
  );
};

export default CategoriesNavBar;
