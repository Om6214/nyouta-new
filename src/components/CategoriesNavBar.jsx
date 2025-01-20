import React from "react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import i1 from "../assets/images/Navbar_Planner_Header/01.jpg";
import i2 from "../assets/images/Navbar_Planner_Header/02.jpg";
import i3 from "../assets/images/Navbar_Planner_Header/03.jpg";
import i4 from "../assets/images/Navbar_Planner_Header/04.jpg";
import i5 from "../assets/images/Navbar_Planner_Header/05.jpg";
import i6 from "../assets/images/Navbar_Planner_Header/06.jpg";

const CategoriesNavBar = () => {
  const { pageName } = useParams();

  const datafile = {
    "print invitations": {
      Title: "Print Invitations",
      Description1: "Design and print stunning wedding invitations.",
      Description:
        "Design and print stunning wedding invitations that perfectly capture the essence of your special day. Our premium collection offers sophisticated designs and high-quality materials to create memorable announcements that will set the tone for your celebration.",

      Details1:
        "Our Print Invitations service combines artistry with exceptional quality to deliver wedding stationery that exceeds your expectations. We understand that your wedding invitations are the first glimpse guests receive of your celebration, which is why we offer comprehensive customization options and expert guidance throughout the design process.",

      Details2: [
        "Choose from a wide range of card styles, colors, and sizes.",
        "Personalize with custom text, photos, and embellishments.",
        "High-quality printing on premium cardstock.",
        "Eco-friendly options available.",
        "Fast and reliable delivery to your doorstep.",
      ],

      Details3:
        "Create lasting memories with beautifully crafted invitations that reflect your unique love story and set the perfect tone for your wedding celebration. Our dedication to quality and attention to detail ensures that your invitations will be treasured keepsakes for years to come.",
    },

    "e-invitations": {
      Title: "E-Invitations",
      Description1: "Create and send digital invitations with ease.",

      Description:
        "Transform your wedding announcements with our innovative digital invitation platform that combines contemporary design with cutting-edge technology. Our e-invitations offer unlimited creative possibilities while providing convenient tracking and management features for a seamless guest experience.",

      Details1:
        "Experience the future of wedding invitations with our comprehensive digital platform that revolutionizes how you connect with your guests. Our E-Invitation service combines stunning visual design with smart features to create an engaging and interactive experience that makes planning your special day easier than ever.",

      Details2: [
        "Create personalized e-invitations with stunning designs.",
        "Easily share invitations via email, social media, or messaging apps.",
        "Track RSVPs and manage guest lists online.",
        "Add interactive elements like maps, music, and videos.",
        "Environmentally friendly and cost-effective.",
      ],

      Details3:
        "Send invitations effortlessly and keep your guests updated with our innovative digital platform that combines beauty with functionality. Our e-invitations offer the perfect blend of style and convenience, ensuring your wedding communications are both memorable and effective.",
    },

    "photo books": {
      Title: "Photo Books",
      Description:
        "Transform your precious wedding memories into elegant, professionally crafted photo books that tell your unique love story. Our premium photo book service combines cutting-edge printing technology with artistic design to create stunning keepsakes that will preserve your special moments for generations to come.",
      Description1:
        "Nyouta’s photo books are a sleek and modern version of the old school ‘Photo albums’.",

      Details1:
        "Discover the art of storytelling through our meticulously designed photo books that capture every beautiful moment of your wedding journey. Our Personalised Photobooks service offers an exceptional combination of professional design expertise and superior printing quality to create timeless albums that showcase your memories in their best light.",

      Details2: [
        "Nyouta's photo books are a sleek and modern way to preserve your wedding memories.",
        "Create custom layouts with your favorite wedding photos.",
        "Add captions, dates, and special messages to each page.",
        "Choose from a variety of sizes, covers, and paper types.",
        "High-quality printing ensures vibrant and long-lasting photos.",
      ],

      Details3:
        "Create an enduring legacy of your wedding day with our expertly crafted photo books that combine superior quality with personalized storytelling. Each page is thoughtfully designed to capture the essence of your celebration, resulting in a treasured keepsake that will bring joy and memories for generations.",
    },

    itinerary: {
      Title: "Itinerary",
      Description:
        "Craft comprehensive and stylish wedding itineraries that guide your guests through every moment of your celebration. Our professional itinerary service helps you create detailed schedules and information packages that ensure everyone can fully participate in and enjoy your special day, from welcome events to the final farewell.",
      Description1:
        "Create detailed travel itineraries for your trips. ghthrjhytjreyse4",
      Details1:
        "Transform your wedding timeline into an engaging and informative guide that keeps your guests informed and excited about every planned moment. Our Wedding Itineraries service combines practical organization with beautiful design to create comprehensive schedules that enhance the experience for everyone involved in your celebration.",

      Details2: [
        "Easily share event schedules, venue locations, and contact information.",
        "Provide guests with a convenient and organized guide to your wedding weekend.",
        "Customize the look and feel to match your wedding theme.",
        "Available in various formats, including printable PDFs and online versions.",
        "Reduce confusion and ensure a smooth and enjoyable experience for your guests.",
      ],

      Details3:
        "Ensure your wedding celebrations flow seamlessly with our professionally designed itineraries that keep everyone informed and engaged throughout your special day. Our detailed guides combine practical information with elegant design to create the perfect roadmap for your wedding events.",
    },

    "calendars 2025": {
      Title: "calendars 2025",
      Description:
        "Create stunning personalized wedding countdown calendars that build anticipation for your 2025 celebration while helping you stay organized throughout the planning process. Our custom calendars combine practical functionality with beautiful design elements to create a unique way to track your journey to the altar.",
      Description1: "Design and print personalized calendars for 2025.",
      Details1:
        "Embrace the excitement of your upcoming wedding with our beautifully designed 2025 calendars that transform the countdown to your special day into a memorable experience. Our Wedding Calendars service offers a perfect blend of practical planning tools and personalized design elements to help you track and celebrate every moment leading up to your wedding.",

      Details2: [
        "Count down to your wedding day with a stylish and personalized calendar.",
        "Feature your engagement photos or wedding logo.",
        "Mark important dates, such as RSVP deadlines and pre-wedding events.",
        "A unique and thoughtful gift for your wedding party.",
        "Perfect for planning and staying organized leading up to your big day.",
      ],

      Details3:
        "Transform your wedding planning journey into an exciting countdown experience with our beautifully crafted 2025 calendars that combine practical organization with personalized design elements. Each month brings you closer to your special day while helping you stay organized and inspired throughout the planning process.",
    },

    "free greetings": {
      Title: "free greetings",
      Description:
        "Share your joy and excitement with our collection of elegant digital wedding greetings that allow you to connect with loved ones near and far. Our free greeting service offers a perfect blend of sophistication and convenience, enabling you to express your happiness and gratitude through beautifully designed digital cards.",
      Description1: "Send free digital greeting cards to your loved ones.",
      Details1:
        "Discover the perfect way to share your wedding joy with our comprehensive collection of digital greetings that combine elegant design with heartfelt sentiment. Our Free Wedding Greetings service provides a sophisticated platform for expressing your happiness and connecting with loved ones through beautifully crafted digital messages.",

      Details2: [
        "Choose from a variety of beautiful and heartfelt wedding greeting cards.",
        "Personalize with your names, wedding date, and a special message.",
        "Easily share via email, social media, or messaging apps.",
        "A simple and heartfelt way to express your gratitude to your loved ones.",
        "Perfect for thanking guests, sending save-the-dates, or sharing wedding updates.",
      ],

      Details3:
        "Connect with your loved ones through beautifully designed digital greetings that capture the joy and excitement of your wedding journey. Our free service makes it easy to share your happiness while maintaining the elegant tone of your celebration.",
    },

    "guest surprising": {
      Title: "guest surprising",
      Description:
        "Create unforgettable moments for your wedding guests with our innovative surprise and delight services that go beyond traditional entertainment. Our comprehensive guest experience program helps you design and implement unique touches that will make your celebration truly memorable and ensure your guests feel specially honored throughout your wedding events.",
      Description1: "Find unique and memorable ways to surprise your guests.",
      Details1:
        "Elevate your wedding celebration with our creative guest experience services that transform ordinary moments into extraordinary memories. Our Guest Surprising Ideas program offers a carefully curated selection of unique entertainment options, thoughtful gestures, and unexpected delights that will leave a lasting impression on everyone who shares in your special day.",

      Details2: [
        "Discover creative and memorable ways to welcome and entertain your guests.",
        "Personalized welcome bags, favors, and thoughtful gestures.",
        "Interactive entertainment options to keep your guests engaged.",
        "Unique photo booth props and fun games for all ages.",
        "Create a lasting impression on your guests with unforgettable surprises.",
      ],

      Details3:
        "Transform your wedding celebration into an unforgettable experience with carefully planned surprises and thoughtful touches that will delight your guests and create lasting memories. Our innovative ideas and attention to detail ensure that every moment of your celebration becomes an opportunity to create joy and wonder.",
    },

    "planner books": {
      Title: "planner books",
      Description:
        "Stay perfectly organized throughout your wedding planning journey with our comprehensive planner books that combine practical tools with beautiful design. Our professional planning guides offer everything you need to coordinate your perfect day, from detailed checklists and budget trackers to vendor coordination sheets and timeline management tools.",
      Description1:
        "Organize your life with our stylish and functional planner books.",
      Details1:
        "Experience stress-free wedding planning with our meticulously designed planner books that guide you through every aspect of creating your perfect celebration. Our Wedding Planner Books service provides comprehensive planning tools wrapped in elegant design, ensuring you have everything you need to coordinate your dream wedding with confidence and style.",

      Details2: [
        "Essential tools for planning every aspect of your wedding.",
        "Includes checklists, budget trackers, guest lists, and more.",
        "Elegant and stylish designs to match your wedding theme.",
        "Keep all your wedding planning information in one convenient place.",
        "Reduce stress and ensure a smooth and enjoyable wedding planning journey.",
      ],

      Details3:
        "Transform your wedding planning experience into an organized and enjoyable journey with our professionally designed planner books that combine practical tools with beautiful aesthetics. Our comprehensive guides ensure every detail is perfectly coordinated while maintaining the joy and excitement of planning your special day.",
    },

    "e shop": {
      Title: "e shop",
      Description:
        "Discover a carefully curated collection of premium wedding essentials in our comprehensive online marketplace. Our E-Shop offers everything you need to create your perfect celebration, from elegant decorations and personalized favors to unique gifts and essential planning tools, all available with convenient shopping and reliable delivery.",
      Description1: "Browse and shop for a wide range of products online.",
      Details1:
        "Welcome to your ultimate wedding planning destination, where finding the perfect items for your special day is both enjoyable and convenient. Our E-Shop combines an extensive selection of premium wedding products with exceptional customer service to ensure you have everything you need to create your dream celebration.",

      Details2: [
        "Browse a wide selection of wedding decorations, favors, and accessories.",
        "Find unique and personalized gifts for your wedding party.",
        "Convenient and easy online shopping experience.",
        "Secure payment options and fast shipping.",
        "Everything you need to make your wedding day unforgettable.",
      ],

      Details3:
        "Experience the convenience and joy of curating your perfect wedding with our comprehensive online marketplace that brings together everything you need for your special day. Our carefully selected collection ensures quality and style while making the shopping process enjoyable and stress-free.",
    },
  };

  const images = [i1, i2, i3, i4, i5, i6];

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
      Description1:
        "Create beautiful wedding, party, pooja and other events invitations with unique shapes and artistic designs. Each piece is tailored to add elegance and charm to your celebrations. Celebrate your moments with creative and unforgettable invites.",
      slang: 'Shaped Elegance for Celebrations "Perfect Shapes for Your Joy"',
      Description:
        "Design and print stunning wedding invitations that perfectly capture the essence of your special day. Our premium collection offers sophisticated designs and high-quality materials to create memorable announcements that will set the tone for your celebration.",

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
      Description1:
        "We make digital invitations for weddings, parties, poojas, and all celebrations with creative and elegant designs. Each invitation is thoughtfully crafted to reflect the spirit of your event. Celebrate your special moments with personalized, memorable digital invites.",
      slang:
        'Where Creativity Meets Celebration  " A Digital Journey for Every Event"',
      Description:
        "Transform your wedding announcements with our innovative digital invitation platform that combines contemporary design with cutting-edge technology. Our e-invitations offer unlimited creative possibilities while providing convenient tracking and management features for a seamless guest experience.",
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
      Description1:
        "Create lasting memories with our personalized photobooks, designed to capture the essence of your special moments. Each page is a work of art, reflecting the joy and beauty of your celebrations. Cherish your memories forever in a custom-crafted photobook.",
      slang:
        'Preserve Your Celebration with a Photobook "A Story Told in Every Page"',
      url: "/photo-books",
      Description:
        "Transform your precious wedding memories into elegant, professionally crafted photo books that tell your unique love story. Our premium photo book service combines cutting-edge printing technology with artistic design to create stunning keepsakes that will preserve your special moments for generations to come.",
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
    itinerary: {
      title: "Itinerary",
      url: "/itinerary",

      Description1:
        "We create detailed wedding itineraries for every event, ensuring a seamless and memorable experience. Our itineraries are customized to fit the unique flow and timings of your celebration. Stay organized and stress-free with our expertly crafted wedding schedules.",
      slang:
        'Custom Wedding Itineraries for a Flawless Day "Your Wedding, Our Expert Itinerary"',
      Description:
        "Craft comprehensive and stylish wedding itineraries that guide your guests through every moment of your celebration. Our professional itinerary service helps you create detailed schedules and information packages that ensure everyone can fully participate in and enjoy your special day, from welcome events to the final farewell.",
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
      slang:
        'Your Memories, Crafted Into a Calendar "Turn Your Moments into Monthly Treasures"',
      Description1:
        "Create personalized calendars that turn every month into a cherished memory. Each page is uniquely designed to showcase your special moments, making every day a celebration. Stay organized while reliving your most memorable events with our custom calendars.",

      Description:
        "Create stunning personalized wedding countdown calendars that build anticipation for your 2025 celebration while helping you stay organized throughout the planning process. Our custom calendars combine practical functionality with beautiful design elements to create a unique way to track your journey to the altar.",

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
      Description1:
        "We offer greetings for all occasions, allowing you to celebrate every moment with heartfelt messages. Whether it's for a wedding, birthday, or any special event, our greetings are designed to bring joy. Share love and happiness, making every celebration memorable.",
      slang:
        'Making Every Occasion Special with Greetings "Your Perfect Greeting, Absolutely Free"',
      Description:
        "Share your joy and excitement with our collection of elegant digital wedding greetings that allow you to connect with loved ones near and far. Our free greeting service offers a perfect blend of sophistication and convenience, enabling you to express your happiness and gratitude through beautifully designed digital cards.",

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
      Description1:
        "We design custom wedding newspapers and magazines to tell your unique love story in print. From pre-wedding events to the big day, every moment is captured with creativity and style. Create a memorable keepsake that guests will cherish and remember long after the celebration.",
      slang:
        'A Unique Wedding Newspaper for Your Unique Day "Your Wedding, Captured in Print"',
      Description:
        "Create unforgettable moments for your wedding guests with our innovative surprise and delight services that go beyond traditional entertainment. Our comprehensive guest experience program helps you design and implement unique touches that will make your celebration truly memorable and ensure your guests feel specially honored throughout your wedding events.",
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
      slang:
        'The Perfect Planner for Your Special Day "Plan Your Perfect Day, Step by Step"',
      Description:
        "Stay perfectly organized throughout your wedding planning journey with our comprehensive planner books that combine practical tools with beautiful design. Our professional planning guides offer everything you need to coordinate your perfect day, from detailed checklists and budget trackers to vendor coordination sheets and timeline management tools.",
      Description1:
        "We offer comprehensive wedding planning tools, including a wedding planner book, guest management booklet, and a wedding notepad to keep every detail organized. From managing guests to tracking your plans, our products ensure a seamless, stress-free celebration. Keep all your wedding essentials in one place for a flawless experience.",
      subCategory: [
        {
          subTitle: "Wedding Management",
          imgUrl:
            "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847773/phewexsfhaijro3dzxd8.jpg", // Example image
          url: "e/nav/Planner Books/Planner Books/Wedding Management",
        },
        {
          subTitle: "Guest Management",
          imgUrl: "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847362/n2ppyskd7modih1qznm3.jpg", // Example image
          url: "e/nav/Planner Books/Planner Books/Guest Management"
        }, {
          subTitle: "Wedding Notepad",
          imgUrl: "https://res.cloudinary.com/dpesh4axn/image/upload/v1736846734/kvsupuz7sbivojh4aind.jpg", // Example image
          url: "e/nav/Planner Books/Planner Books/Wedding Notepad(liner)"
        }, {
          subTitle: "Wedding Notepad",
          imgUrl: "https://res.cloudinary.com/dpesh4axn/image/upload/v1736846734/kvsupuz7sbivojh4aind.jpg", // Example image
          url: "e/nav/Planner Books/Planner Books/Wedding Notepad(photo)"
        }, {
          subTitle: "Guest List Booklet - Best Seller",
          imgUrl:
            "https://res.cloudinary.com/dpesh4axn/image/upload/v1736848346/quntb8uznw1eg81xkrff.jpg", // Example image
          url: "e/nav/Planner Books/Planner Books/Guest List Booklet - Best Seller",
        },
        {
          subTitle: "Free Printables",
          imgUrl:
            "https://res.cloudinary.com/dpesh4axn/image/upload/v1736848578/uenbld7atg2lqufivgyc.jpg", // Example image
          url: "e/nav/planner books/Free Printable/Wedding Guest List-PDF",
        },
      ],
    },
    "e shop": {
      title: "E-Shop",
      url: "/e-shop",
      slang:
        'Personalized Essentials for Your Special Day "Perfect Gifts for Every Celebration"',
      Description1:
        "Explore our E-shop for the finest wedding and event essentials, along with unforgettable gifts. From beautifully crafted invitations to personalized keepsakes, we provide everything to make your celebration extraordinary. Discover unique treasures that add elegance, charm, and a personal touch to weddings and all your special events.",
      Description:
        "Discover a carefully curated collection of premium wedding essentials in our comprehensive online marketplace. Our E-Shop offers everything you need to create your perfect celebration, from elegant decorations and personalized favors to unique gifts and essential planning tools, all available with convenient shopping and reliable delivery.",

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

  const DetailContent = datafile[pageName] || {};
  // console.log(DetailContent);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // console.log("rendered");
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-[#e7d8c9] to-[#eae0d5]">
          <div className=" px-6 md:px-16">
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center min-h-[28vh] sm:h-[300px] lg:h-[350px] w-full">
              {/* Left Section */}
              <div className="text-center col-span-1 space-y-2 md:text-left">
                <h1 className="text-[#333533] font-avalonB text-[6vw] md:text-[3vw] leading-tight">
                  {content.title}
                </h1>
                <h2 className="font-avalonN text-xl">{content.slang}</h2>
                <p className="text-[#7f8c8d] font-medium text-[3vw] md:text-[15px] mt-4 leading-relaxed">
                  {content.Description1}
                </p>
              </div>

              {/* Right Section */}

              <div className="relative  col-span-2 ">
                <div className="lg:w-full w-full">
                  <motion.div className="relative h-[200px] lg:h-[280px] sm:h-[250px]   rounded-xl overflow-hidden">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Slide ${index + 1}`}
                          className="h-full w-full lg:object-cor"
                        />
                      </div>
                    ))}

                    <button
                      onClick={goToPrevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Previous slide"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={goToNextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Next slide"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    <div className="absolute bottom-4 left-1/2  flex -translate-x-1/2 space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-3 w-3 rounded-full m-3 ${
                            index === currentSlide ? "bg-white" : "bg-white/50"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div id="section2">
        <motion.div className="px-[6%] pt-[1%]">
          <div className="font-semibold text-[4vh]">Categories</div>

          <div className="font-normal md:text-[2.2vh] text-[2vw]">
            {/* Create personalized gifts for Kids, Friends, Loved ones and give them the your attention of love. */}
          </div>

          <div className="pt-5 md:max-w-[95%] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {content.subCategory.map((item) => (
                <Link
                  to={item.url ? `/${item.url}` : `${item.subTitle}`}
                  key={item.id}
                  className="block bg-white rounded-lg shadow-md  overflow-hidden transform transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={item.imgUrl}
                    alt={item.subTitle}
                    className="w-full  h-[90%]  object-cover transition-transform duration-300 ease-in-out "
                  />
                  <div className="p-4 h-[10%] w-full flex justify-center items-center">
                    <h2 className="text-lg sm:text-md  font-semibold text-nowrap py-2 ">
                      {item.subTitle.length > 21
                        ? `${item.subTitle.slice(0, 21)}...`
                        : item.subTitle}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div>
        <div id="section4">
          <div className="px-[6%] pt-[1%] py-6  text-gray-800">
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-3">
                About Our Personalised {DetailContent.Title}
              </h2>
              <p className="text-lg leading-relaxed">
                {DetailContent.Description}
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-3">
                Details for {DetailContent.Title}
              </h2>
              <p className="text-lg leading-relaxed">
                {DetailContent.Details1}
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-3">
                Features of Our Variety of {DetailContent.Title}
              </h2>
              <ul className="list-disc list-inside text-lg leading-relaxed">
                {DetailContent.Details2.map((item, index) => (
                  <li key={index} className="text-lg leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">
                {DetailContent.Title} Are Best Suited
              </h2>
              <ul className="list-disc list-inside text-lg leading-relaxed">
                <li>{DetailContent.Details3}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesNavBar;
