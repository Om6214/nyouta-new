import React from "react";
import buttonBg from "../assets/images/08.png";
import wedImg from "../assets/images/wed.png";

const plans = [
  {
    title: "Wedding Management Planner Booklet",
    format: "Easy to Manage Wedding",
    btn: "Shop Now",
    imgUrl:
      "https://lovely-cards.com/cdn/shop/products/dgs-w01-des55_4d03f059-9d45-40e9-91b5-df051ae87d67.jpg?v=1709379079",
  },
  {
    title: "Wedding Guest Management Booklet",
    format: "Easy to Manage Guests",
    btn: "Shop Now",
    imgUrl:
      "https://lovely-cards.com/cdn/shop/products/dgs-w01-des55_4d03f059-9d45-40e9-91b5-df051ae87d67.jpg?v=1709379079",
  },
  {
    title: "Wedding Notepad(Liner) Notes for Lifetime Memory",
    format: "Write your Wedding Notes",
    btn: "Shop Now",
    imgUrl:
      "https://lovely-cards.com/cdn/shop/products/dgs-w01-des55_4d03f059-9d45-40e9-91b5-df051ae87d67.jpg?v=1709379079",
  },
  {
    title: "Wedding Notepad(Photo) Memorable Notes",
    format: "Write your Wedding Notes",
    btn: "Shop Now",
    imgUrl:
      "https://lovely-cards.com/cdn/shop/products/dgs-w01-des55_4d03f059-9d45-40e9-91b5-df051ae87d67.jpg?v=1709379079",
  },
  {
    title: "Download our Wedding Guest Checklist",
    format: "PDF/XLS Editable",
    btn: "Free Download",
    imgUrl:
      "https://lovely-cards.com/cdn/shop/products/dgs-w01-des55_4d03f059-9d45-40e9-91b5-df051ae87d67.jpg?v=1709379079",
  },
  {
    title: "Wedding Notepad Write Wedding Notes",
    format: "PDF Printable",
    btn: "Free Download",
    imgUrl:
      "https://lovely-cards.com/cdn/shop/products/dgs-w01-des55_4d03f059-9d45-40e9-91b5-df051ae87d67.jpg?v=1709379079",
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
        <h1 className="lg:text-4xl text-3xl font-ttMedium font-bold text-amber-500">"Plan with confidence"</h1>
      </div>
      <div className="flex border-l-8 justify-around lg:gap-[22rem] border-white">
        <h2 className="text-sm lg:text-md w-[280px] ml-6 my-auto font-semibold">
          Not sure where to start ! Here are some steps you can take today to
          make planning your wedding as easy as possible
        </h2>
        <img className="w-32" src={wedImg} alt="" />
      </div>
      </div>
      <div>
        <div className="grid lg:grid-cols-6 grid-cols-2 gap-2 py-4">
          {plans.map((plan) => (
            <div className="lg:w-[220px]">
              <img className="w-full object-cover rounded-xl" src={plan.imgUrl} alt="" />
              <div className="flex flex-col gap-2 items-center">
                <h1 className="text-center font-semibold border-b-2 ">{plan.title}</h1>
                <h2>{plan.format}</h2>
                <div className="relative flex flex-col items-center hover:translate-x-2 duration-300">
                  <img className="" src={buttonBg} alt="" />
                  <button className="text-lg font-semibold absolute ">{plan.btn}</button>
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
