import React from "react";
import buttonBg from "../assets/images/08.png";
import wedImg from "../assets/images/wed.png";
import guestPlan from "../assets/images/stressfree/guestplan.jpeg";
import wedPlan from "../assets/images/stressfree/wedplan.jpg";
import guestList from "../assets/images/stressfree/guestlist.jpg";
import pdfPrint from "../assets/images/stressfree/checklist.jpg";
import wedNote from "../assets/images/stressfree/wednoteliner.jpg";
import wedPhoto from "../assets/images/stressfree/wednotephoto.jpeg";
import { Link } from "react-router-dom";

const plans = [
  {
    title: "Management Planner",
    format: "Easy to Manage Wedding",
    url:"/e/nav/planner%20books/Planner%20Books/Wedding%20Management",
    btn: "Shop Now",
    imgUrl: wedPlan,
  },
  {
    title: "Guest Management",
    format: "Easy to Manage Guests",
    url:"/e/nav/planner%20books/Planner%20Books/Guest%20Management",
    btn: "Shop Now",
    imgUrl: guestPlan,
  },
  {
    title: "Notepad (Liner)",
    format: "Write your Wedding Notes",
    url:"/e/nav/planner%20books/Planner%20Books/Wedding%20Notepad%20(Linear)",
    btn: "Shop Now",
    imgUrl: wedNote,
  },
  {
    title: "Notepad (Photo)",
    format: "Write your Wedding Notes",
    url:"/e/nav/planner%20books/Planner%20Books/Wedding%20Notepad%20(Photo)",
    btn: "Shop Now",
    imgUrl: wedPhoto,
  },
  {
    title: "Guest Checklist Booklet",
    format: "Easy to Manage Guests",
    url:"/e/nav/planner%20books/Planner%20Books/Guest%20List%20Booklet%20-%20Best%20Seller",
    btn: "Free Download",
    imgUrl: guestList,
  },
  {
    title: "Checklist Printable",
    format: "PDF/XLS Printable",
    url:"/nav/planner%20books/Free%20Printable",
    btn: "Free Download",
    imgUrl: pdfPrint,
  },
];

const WeddingPlan = () => {
  return (
    <div className="bg-secondary text-white mt-8 px-4 py-6  font-avalonB">
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="flex flex-col gap-3">
          <h1 className="lg:text-5xl text-4xl font-bold  font-ttMedium">
            Stress-Free Wedding Planning
          </h1>
          <h1 className="lg:text-4xl text-3xl font-ttMedium font-bold text-amber-500">
            "Plan with confidence"
          </h1>
        </div>
        <div className="flex md:border-l-8 lg:border-l-8 justify-around lg:gap-[22rem] md:gap-48 border-white">
          <h2 className="text-sm lg:text-md w-[280px] lg:ml-6 md:ml-0 my-auto font-semibold">
            Not sure where to start ! Here are some steps you can take today to
            make planning your wedding as easy as possible
          </h2>
          <img className="w-32" src={wedImg} alt="" />
        </div>
      </div>
      <div>
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-2 py-4">
          {plans.map((plan) => (
            <div className="lg:w-[220px] h-full">
              <img
                className="w-full object-cover rounded-xl"
                src={plan.imgUrl}
                alt=""
              />
              <div className="flex flex-col gap-2 pt-1 items-center">
                <h1 className="text-center font-semibold h-[75px] md:h-full">
                  <span>Wedding</span> <br />
                  {plan.title}
                </h1>
                <div className="w-full border-2"></div>
                <h2 className="h-[50px] md:h-full">{plan.format}</h2>
                <div className="relative flex flex-col items-center">
                  <img className="h-8" src={buttonBg} alt="" />
                  <Link to={plan.url} className="text-lg font-semibold absolute ">
                    {plan.btn}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingPlan;
