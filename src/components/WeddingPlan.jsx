import React from "react";

const plans = [
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
    title: "Wedding Notepad Notes for Lifetime Memory",
    format: "Write your Wedding Notes",
    btn: "Shop Now",
    imgUrl:
      "https://lovely-cards.com/cdn/shop/products/dgs-w01-des55_4d03f059-9d45-40e9-91b5-df051ae87d67.jpg?v=1709379079",
  },
];

const WeddingPlan = () => {
  return (
    <div className="bg-secondary text-white my-8 px-4 py-6 font-heroFont">
      <div className="flex flex-col gap-3">
        <h1 className="lg:text-5xl text-3xl font-bold">
          Your Wedding Journey Starts Here...
        </h1>
        <h2 className="lg:text-xl font-semibold">
          Not sure where to start ! Here are some steps you can take today to
          make planning your wedding as easy as possible
        </h2>
        <h1 className="lg:text-4xl text-2xl font-bold">"Stress-Free Wedding Planning"</h1>
      </div>
      <div>
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-2 py-4">
          {plans.map((plan) => (
            <div className="lg:w-[250px]">
              <img className="w-full object-cover" src={plan.imgUrl} alt="" />
              <div className="flex flex-col gap-2 items-center">
                <h1 className="text-center font-semibold border-b-2 ">{plan.title}</h1>
                <h2>{plan.format}</h2>
                <button className="bg-pink-600 px-3 py-1 rounded-full text-lg font-semibold">{plan.btn}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingPlan;
