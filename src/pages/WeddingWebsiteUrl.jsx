import React, { useState } from "react";
import wedBg from "../assets/images/weddingbg.webp";
import camera from "../assets/images/camera.svg";
import cocktail from "../assets/images/cocktail.svg";
import envelope from "../assets/images/envelope.svg";
import wed1 from "../assets/images/wed1.webp";
import wed2 from "../assets/images/wed2.jpg";
import wed3 from "../assets/images/wed3.webp";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeddingTemplates } from "../Store/slices/weddingtemplateSlice";
import { getWeddingWebsitedata } from '../Store/slices/weddingwebsiteSlice';
import TemplateSection from "../components/TemplateSection.jsx";
import btnImg from "../assets/images/09.png";
import { motion } from "framer-motion";
import { Carousel } from "flowbite-react";
import banImg1 from "../assets/images/weddingurl/1.jpg";
import banImg2 from "../assets/images/weddingurl/2.jpg";
import banImg3 from "../assets/images/weddingurl/3.jpg";
import banImg4 from "../assets/images/weddingurl/4.jpg";
import banImg5 from "../assets/images/weddingurl/5.jpg";
import banImg6 from "../assets/images/weddingurl/6.jpg";

const items = [
  {
    title: "Include the juicy details",
    des: "Share your excitement with your guests and include juicy details about your day.",
    imgUrl: cocktail,
  },
  {
    title: "Receive and manage RSVPs",
    des: "When your guests RSVP they sync automatically with your guest list.",
    imgUrl: envelope,
  },
  {
    title: "Your wedding album",
    des: "Create your WedShoots album and link it to your wedding website.",
    imgUrl: camera,
  },
];

const faqs = [
  {
    id: 1,
    question: "How do I create a website for my wedding?",
    answer:
      "From your free WeddingWire account, click on Wedding Website. There, you'll be prompted to choose a template to edit your wedding website. Once you choose a template you'll be able to edit the texts, colours, layout, pages and details. You can also change the template whenever you want if you want to try different styles. When you're done, it's time to share it with your guests! But before you do, we suggest clicking on View as guest to double check that everything looks perfect.",
  },
  {
    id: 2,
    question: "Is it possible to create a wedding website for free?",
    answer:
      "Yes! With WeddingWire you can easily create your wedding website in just a couple of clicks. Since we already have most of your wedding information, you'll notice most of your basic details are ready to go, so all you need to do is personalise your website and make it yours.",
  },
  {
    id: 3,
    question: "What should my Wedding Website contain?",
    answer:
      "When you create your Wedding Website, you'll notice that you have five pages: homepage, wedding blog, confirm attendance, contact us and guestbook. Your homepage should summarise your upcoming wedding plans and a personal message for your guests. Don't forget to include your favourite engagement photo! Next, you can use your blog to keep guests updated and take them along on your wedding planning journey.",
  },
  {
    id: 4,
    question: "Can my Wedding Website be private?",
    answer:
      "Yes, to ensure your privacy you have two options. Either you can include a welcome form that will pop up before anyone can see your Wedding Website. The form will collect the names and emails of your guests the first time they visit your website, letting you know who is looking at your website.",
  },
  {
    id: 5,
    question: "What's the point of a Wedding Website?",
    answer:
      "Your Wedding Website is your opportunity to easily share information as well as excitement with your guests. Tell them about what they can expect to help them get ready for your big day and give them a space to leave nice comments in your Guestbook page. All in all, your Wedding Website is a place for you to document your wedding journey and to keep guests in the loop and excited about the upcoming celebration!",
  },
];

const WeddingWebsiteUrl = () => {
  const [openId, setOpenId] = useState(null);
  const dispatch = useDispatch();
  const { weddingTemplates, loading, error } = useSelector(
    (state) => state.weddingtemplates
  );
  // console.log(weddingTemplates);

  useEffect(() => {
    if (weddingTemplates.length < 1) {
      dispatch(getWeddingTemplates());
    }
  }, [dispatch]);
  useEffect(() => {
      dispatch(getWeddingWebsitedata());
    }, [dispatch]);
  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <div>
      <div className="lg:mx-24 mx-4 mt-2">
      <div className="h-80 sm:h-80 xl:h-80 2xl:h-96">
      <Carousel indicators={false}>
        <img className="object-cover lg:object-contain h-full" src={banImg1} alt="..." />
        <img className="object-cover lg:object-contain h-full" src={banImg2} alt="..." />
        <img className="object-cover lg:object-contain h-full" src={banImg3} alt="..." />
        <img className="object-cover lg:object-contain h-full" src={banImg4} alt="..." />
        <img className="object-cover lg:object-contain h-full" src={banImg5} alt="..." />
        <img className="object-cover lg:object-contain h-full" src={banImg6} alt="..." />
      </Carousel>
    </div>
        {/* <motion.div className="flex font-avalonN gap-2 text-gray-600 font-semibold items-center justify-center border-t-2 border-b-2 my-2 border-gray-600">
          <h1>Sort By</h1>
          <select name="" id="" className="border-none">
            <option value="">Trending</option>
            <option value="">Best Sellers</option>
            <option value="">New</option>
            <option value="">Hot</option>
          </select>
        </motion.div> */}
        <motion.div className="flex flex-col gap-6">
          <div className="mt-4">
            <h1 className="text-4xl text-secondary font-avalonN">
              Choose Your Designs Here...
            </h1>
          </div>
          <div>
            <TemplateSection weddingTemplates={weddingTemplates} />
          </div>
          <div className="relative flex items-center justify-center">
            <img className="h-8" src={btnImg} alt="" />
            <a className="absolute text-lg text-white font-avalonB" href="">
              View All Designs
            </a>
          </div>
        </motion.div>
      </div>
      <section className="mx-2 lg:mx-16 my-4 font-heroFont">
        <h1 className="text-xl lg:text-2xl text-center font-semibold">
          A Simple, beautiful wedding websites just for you
        </h1>
        <h2 className="lg:text-xl text-lg text-center">
          All you need to do is choose your favourite template and include your
          celebration details.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 my-2">
          {items.map((item) => (
            <div className="flex flex-col items-center gap-3">
              <img className="w-28" src={item.imgUrl} alt="" />
              <h1 className="text-xl font-semibold">{item.title}</h1>
              <p className="text-center">{item.des}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-2 lg:mx-24 my-12 font-heroFont">
        <div className="flex flex-col lg:flex-row gap-2 justify-between my-4">
          <div className="w-full lg:w-[50%]">
            <img
              className="w-[500px] border-[10px] rounded-2xl border-black"
              src={wed1}
              alt=""
            />
          </div>
          <div className="flex flex-col w-full lg:w-[50%] items-start justify-center gap-2">
            <h1 className="lg:text-3xl text-xl font-semibold">
              Build your site easily
            </h1>
            <p className="text-lg">
              Create your own wedding website with all your most important
              details. Make it yours with your own design and wedding colours.
            </p>
            <a href="" className="text-pink-700 font-semibold text-xl">
              GET YOUR WEBSITE URL
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse gap-2 justify-between lg:my-4 my-12">
          <div className="w-full lg:w-[50%] flex justify-end overflow-hidden">
            <img
              className="w-[500px] h-[350px] border-[10px] rounded-2xl border-black"
              src={wed2}
              alt=""
            />
          </div>
          <div className="flex flex-col w-full lg:w-[50%] items-start justify-center gap-2">
            <h1 className="lg:text-3xl text-xl font-semibold">
              Share your website with everyone
            </h1>
            <p className="text-lg">
              Receive RSVPs and menu selections through your wedding website.
              You can even help guests find accommodation and organise
              transportation.
            </p>
            <a href="" className="text-pink-700 font-semibold text-xl">
              Share Your Wedding Website
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-2 justify-between my-4">
          <div className="w-full lg:w-[50%]">
            <img
              className="w-[500px] border-[10px] rounded-2xl border-black"
              src={wed3}
              alt=""
            />
          </div>
          <div className="flex flex-col w-full lg:w-[50%] items-start justify-center gap-2">
            <h1 className="lg:text-3xl text-xl font-semibold">
              Easily personalise your website
            </h1>
            <p className="text-lg">
              Make your website reflect your wedding style and colour palette.
              Include your own photos and any other relevant or interesting
              wedding details.
            </p>
            <a href="" className="text-pink-700 font-semibold text-xl">
              Choose your design
            </a>
          </div>
        </div>
      </section>
      <section id="Faqs" className="mx-4 lg:mx-24 font-heroFont">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl uppercase">Frequently Asked Questions</h1>
          <h1 className="text-xl lg:text-3xl font-semibold">
            Wedding website questions? We're here to help.
          </h1>
        </div>
        <div className="my-4">
          {faqs.map((faq) => (
            <div
              key={faq}
              className="border rounded-lg shadow-sm bg-white overflow-hidden my-4 p-1"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 flex justify-between lg:items-center items-start text-left hover:bg-gray-100 "
              >
                <span className="text-lg">{faq.question}</span>
                <ChevronDown
                  className={`transform transition-transform duration-200 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                className={`transition-all duration-200 ease-in-out ${
                  openId === faq.id
                    ? "max-h-52 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="">
                  <p className="px-6 py-4 text-gray-600 bg-amber-100 rounded-xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeddingWebsiteUrl;
