import React from "react";


import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const CategoriesNavBar=()=>{

  const { pageName } = useParams();
 

  const images = [
    "https://img.freepik.com/free-photo/top-view-gift-wrapping-composition_23-2148455718.jpg?t=st=1734674377~exp=1734677977~hmac=84a23b1b4f2690a609ff97e6640751abef1f27a125ca0b407e9b7d38f8396c5f&w=996",
    "https://img.freepik.com/free-photo/close-up-christmas-present-decorated-with-dried-flowers-dry-orange-wrapped-craft-paper_169016-14425.jpg?t=st=1735809332~exp=1735812932~hmac=b2f388421807280c81f6701e99b1045b5fcc18a3807238bc9534e9bf4f24c3ee&w=1060",
    "https://img.freepik.com/free-photo/gift-box-decorated-with-ribbons-decorative-roses-knitted-items-original-gift-wrapping-valentine-s-day_169016-8851.jpg?t=st=1735809475~exp=1735813075~hmac=29fa67a9acc9e871ef0e838420c76f5c2be4707d446fb34db99cc47247a69b38&w=996",
    "https://img.freepik.com/free-photo/top-view-hand-holding-furoshiki-package_23-2150274480.jpg?t=st=1735809508~exp=1735813108~hmac=d7588c5a3b60c924bb0cc9683c7f9528b4cae8b4f2a986f15d76ee131fbc9e56&w=996"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);
  

  const categories = {
    'print invitations':{
          title: "Print Invitations",
          url:"Print Invitations",
          description:
            "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
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
        "e-invitations":{
          title: "E Invitations",
          url:"/e-invitations",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus. Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had.",
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
        "photo books":{
          title: "Photo Books",
          url:"/photo-books",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus.Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had.",
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
          url:"/itinerary",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus.",
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
        "calendars 2025":{
          title: "Calendars 2025",
          url:"/calendars 2025",
          description:
            "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
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
        'free greetings':{
          title: "Free Greetings",
          url:"/free-greetings",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus. ",
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
        "guest surprising":{
          title: "Guest Surprising",
          url:"/guest-surprising",
          description:
            "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
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
        "planner books":{
          title: "Planner Books",
          url:"/planner-books",
          description:
            "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
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
        "e shop":{
          title: "E-Shop",
          url:"/e-shop",
          description:
            "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
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


    const content = categories[pageName] || { title: 'Page Not Found', description: 'This page does not exist.' };






 return(
    <>

    <div>
    <div className="bg-gradient-to-r from-[#e7d8c9] to-[#eae0d5]">
      <div className="pt-4 pb-4 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center min-h-[30vh] w-full">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h1 className="text-[#333533] font-bold text-[6vw] md:text-[3vw] font-sans leading-tight">
              {content.title}
            </h1>
            <p className="text-[#7f8c8d] font-medium text-[3vw] md:text-[1.2vw] mt-4 leading-relaxed">
              {content.description}
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
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>




    <div id="section2">
    
            <div className="px-[6%] pt-[1%]">
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
            </div>
            </div>






    <div id="section4">
    <div className="px-[6%] pt-[1%] py-6  text-gray-800">
  
  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-3">About Our Personalised Card Stock Prints</h2>
    <p className="text-lg leading-relaxed">
      Why print just one when you can print 24! Yes, all our Card Stock Prints come in a set of 24 prints with an option to add colourful and patterned borders to each of them. 
      Make photo printing a habit and bring photos off your device with our premium quality prints. From Square Photo Prints to Polaroids, these are the most cost-effective 
      way to personalize any gift hamper!
    </p>
  </section>

  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-3">How to Create Your Card Stock Prints</h2>
    <p className="text-lg leading-relaxed">
      Simply upload your photos with multiple source options like your computer or Google Photos. Edit your images in the next screen, crop or adjust your images and give them 
      a final review. Hit print and that’s all folks!
    </p>
  </section>

  <section className="mb-6">
    <h2 className="text-2xl font-bold mb-3">Details of Our Variety of Card Stock Prints</h2>
    <ul className="list-disc list-inside text-lg leading-relaxed">
      <li>Pick from different print sizes and formats – Mini Prints, Square prints, 4x6, 5x7, and Retro prints.</li>
      <li>Add different colourful and patterned borders to each print.</li>
      <li>Pick from a variety of themed stickers to add to your pictures.</li>
      <li>Printed on professional quality 350 GSM thick paper.</li>
    </ul>
  </section>

  <section>
    <h2 className="text-2xl font-bold mb-3">Card Stock Prints Are Best Suited For</h2>
    <ul className="list-disc list-inside text-lg leading-relaxed">
      <li>The best about these personalized photobooks is that they are fully customizable, of excellent quality, and thus make for the best photo gifts and keepsakes!</li>
      <li>Create simple photo displays on your walls. Stick them using wall-safe washi tape or clips and thread.</li>
    </ul>
  </section>
</div>
    </div>
    </>
 )
}

export default CategoriesNavBar;

