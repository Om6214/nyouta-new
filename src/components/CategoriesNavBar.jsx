import React from "react";


import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";



const CategoriesNavBar=()=>{

  const { pageName } = useParams();
 
  

  const categories = {
    'print-invitations':{
          title: "Print Invitations",
          url:"/print-invitations",
          description:
            "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
          subCategory: [
            {
              subTitle: "Wedding Invitation",
              imgUrl: "https://imagizer.imageshack.com/img922/7829/cplqEv.jpg", // URL from product.json
              url: "/products/wedding-invites",
            },
            {
              subTitle: "Party Invitation",
              imgUrl: "https://imagizer.imageshack.com/img923/1097/0Gyp7f.jpg", // URL from product.json
              url: "/products/party-invites",
            },
            {
              subTitle: "Pooja Invitation",
              imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // URL from product.json
              url: "/products/pooja-invites",
            },
            {
              subTitle: "Ceremony Invitation",
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
              subTitle: "Wedding Invitation",
              imgUrl: "https://imagizer.imageshack.com/img922/7829/cplqEv.jpg", // URL from product.json
            },
            {
              subTitle: "Party Invitation",
              imgUrl: "https://imagizer.imageshack.com/img923/1097/0Gyp7f.jpg", // URL from product.json
            },
            {
              subTitle: "Pooja Invitation",
              imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // URL from product.json
            },
            {
              subTitle: "Ceremony Invitation",
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
        "photo-books":{
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
              subTitle: "Digital Photobook",
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
              subTitle: "Tags/Badges",
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
        "calendars":{
          title: "Calendars 2025",
          url:"/calendars",
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
        'free-greetings':{
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
              subTitle: "Feeling Greeting",
              imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
            },
            {
              subTitle: "Funny Greeting",
              imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
            },
          ],
        },
        "guest-surprising":{
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
              subTitle: "Magazines",
              imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
            },
          ],
        },
        "planner-books":{
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
        "e-shop":{
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



  const [items, setItems] = useState([]);

   useEffect(() => {
      const fetchItems = async () => {
        const fakeAPI = [
          {
            id: 1,
            title: "Personalized Mug",
            price: 199,
            img: "https://img.freepik.com/free-photo/orange-mug-with-writing_23-2147680333.jpg?ga=GA1.1.294575401.1734520128&semt=ais_hybrid",
          },
          {
            id: 2,
            title: "Custom T-Shirt",
            price: 499,
            img: "https://img.freepik.com/free-photo/young-child-making-diy-project-from-upcycled-materials_23-2149391068.jpg?ga=GA1.1.294575401.1734520128&semt=ais_hybrid",
          },
          {
            id: 3,
            title: "Photo Album",
            price: 799,
            img: "https://img.freepik.com/free-photo/person-holding-frame-with-open-nature-landscape-concept_23-2150063231.jpg?ga=GA1.1.294575401.1734520128&semt=ais_hybrid",
          },
          {
            id: 4,
            title: "Wall Frame",
            price: 999,
            img: "https://img.freepik.com/free-photo/man-s-hand-placing-picture-frame-painted-pink-wall_23-2147909911.jpg?ga=GA1.1.294575401.1734520128&semt=ais_hybrid",
          },
          {
            id: 4,
            title: "Wall Frame",
            price: 999,
            img: "https://img.freepik.com/free-photo/small-flowers-branches-frame-table_23-2148043943.jpg?ga=GA1.1.294575401.1734520128&semt=ais_hybrid",
          },
        ];
        setItems(fakeAPI);
      };
  
      fetchItems();
    }, []);



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
          <div className="flex justify-center">
            <img
              className="rounded-lg shadow-md h-auto max-h-[40vh] w-auto md:h-[22vw] md:w-[40vw] object-cover"
              src="https://img.freepik.com/free-photo/top-view-gift-wrapping-composition_23-2148455718.jpg?t=st=1734674377~exp=1734677977~hmac=84a23b1b4f2690a609ff97e6640751abef1f27a125ca0b407e9b7d38f8396c5f&w=996"
              alt="Personalized Gifts"
            />
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
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src={item.imgUrl}
                        alt={item.subTitle}
                        className="w-full h-[41vh] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                      <div className="p-4">
                        <h2 className="text-lg font-bold">{item.subTitle}</h2>
                        {/* <p className="text-gray-700">₹{item.price}</p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>






    {/* <div id="section3"> <div className="px-6 md:px-16 lg:px-[7%] pt-8">
      <div className="font-semibold text-2xl md:text-3xl lg:text-[4vh]">Customer Stories</div>

      <div className="pt-6">
        <div className="h-[50vw] md:h-[35vw] lg:h-[23vw] border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }}
            zoom={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Zoom, Navigation, Pagination, Autoplay]}
            className="mySwiper h-full"
          >
            {[
              'https://img.freepik.com/free-photo/inspirational-quote-nature_23-2149261707.jpg',
              'https://img.freepik.com/free-photo/inspirational-quote-nature_23-2149261712.jpg',
              'https://img.freepik.com/free-photo/inspirational-quote-nature_23-2149261711.jpg',
              'https://img.freepik.com/free-photo/inspirational-quote-beach_23-2149261706.jpg',
              'https://img.freepik.com/free-photo/inspirational-quote-with-delicious-beverage_23-2149261753.jpg',
            ].map((src, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container h-full">
                  <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div></div> */}






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

