import { useEffect, useState } from "react";
import placeholder from "../assets/images/placeholder.jpg";
import buttonBg from "../assets/images/05.png";
import button from "../assets/images/07.png";

export default function About() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [count5, setCount5] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms

    // Calculate steps for each counter
    const steps1 = 14 / (duration / interval);
    const steps2 = 3200 / (duration / interval);
    const steps3 = 110 / (duration / interval);
    const steps4 = 26300 / (duration / interval);
    const steps5 = 32800 / (duration / interval);

    const timer = setInterval(() => {
      setCount1((prev) => {
        if (prev < 14) return Math.min(prev + steps1, 14);
        return prev;
      });
      setCount2((prev) => {
        if (prev < 3200) return Math.min(prev + steps2, 3200);
        return prev;
      });
      setCount3((prev) => {
        if (prev < 110) return Math.min(prev + steps3, 110);
        return prev;
      });
      setCount4((prev) => {
        if (prev < 26300) return Math.min(prev + steps4, 26300);
        return prev;
      });
      setCount5((prev) => {
        if (prev < 32800) return Math.min(prev + steps5, 32800);
        return prev;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-secondary font-heroFont">
      <div className="container mx-auto lg:px-12 px-2 py-16 lg:py-12 text-white flex flex-col gap-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center items-start space-y-8">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              ABOUT <span className="text-amber-700">ई-न्यौता</span>
            </h1>
            <p className="text-lg font-semibold">
              Nyouta is Brand of Angira Creation, we understand that every
              moment of your wedding is a reflection of your unique love story.
              That’s why we offer an array of free wedding, party and pooja
              ritual invitations, itineraries, calendars, photo books, greetings
              and Wedding Website to help you celebrate your journey in style.
              Our designs blend creativity with elegance.
            </p>
            <div className="relative flex flex-col items-center justify-center hover:translate-x-2 duration-300">
              <img className="h-8" src={button} alt="" />
              <a href="#" className="absolute text-lg font-semibold">
                Read More
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={placeholder}
              alt="Luxury apartment view"
              className="object-cover w-full h-96 rounded-lg"
              fill
              priority
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center justify-center">
                <img className="" src={buttonBg} alt="" />
                <h1 className="text-3xl text-secondary font-bold lg:text-4xl absolute">
                  {Math.round(count1)}+
                </h1>
              </div>
              <div className="mt-2 text-lg font-bold text-primaryBlue">
                Years of Experience
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center justify-center">
                <img className="" src={buttonBg} alt="" />
                <h1 className="text-3xl text-secondary font-bold lg:text-4xl absolute">
                  {Math.round(count2)}+
                </h1>
              </div>
              <div className="mt-2 text-lg font-bold text-primaryBlue">
                Design Templates
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center justify-center">
                <img className="" src={buttonBg} alt="" />
                <h1 className="text-3xl text-secondary font-bold lg:text-4xl absolute">
                  {Math.round(count3)}+
                </h1>
              </div>
              <div className="mt-2 font-bold text-lg text-primaryBlue">
                Registered Vendors
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center justify-center">
                <img className="" src={buttonBg} alt="" />
                <h1 className="text-3xl text-secondary font-bold lg:text-4xl absolute">
                  {Math.round(count4)}+
                </h1>
              </div>
              <div className="mt-2 font-bold text-lg text-primaryBlue">
                Satisfied Customers
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center justify-center">
                <img className="" src={buttonBg} alt="" />
                <h1 className="text-3xl text-secondary font-bold lg:text-4xl absolute">
                  {Math.round(count5)}+
                </h1>
              </div>
              <div className="mt-2 font-bold text-lg text-primaryBlue">
                Products Sold
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
