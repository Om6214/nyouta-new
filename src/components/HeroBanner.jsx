import React from "react";
import { useState } from "react";
import homegif from "../assets/images/invitation-gif.gif";
import {
    motion,
    useScroll,
    useMotionValueEvent,
    useTransform,
} from "framer-motion";

const HeroBanner = () => {
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (val) => {
        console.log(val);
    });
    const scale = useTransform(scrollY, [400, 700], [1, 0.7])
    const opacity = useTransform(scrollY, [400, 700], [1, 0.5])
    return (
        <motion.div style={{ scale, opacity }} className="flex min-h-screen items-center bg-amber-50 border rounded-3xl mx-8 ">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex gap-8 flex-col-reverse lg:flex-row   lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center w-full"
                    >
                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-8xl">
                            <span className="mt-2 mb-8 block"><span className="text-amber-700">न्यौता
                            </span> for all the moments that matter</span>

                            <span className="block text-base font-semibold uppercase tracking-wide text-amber-700">
                                Life's a party, and it all starts with the perfect invite or card.
                            </span>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="mt-8 flex items-center"
                        >
                            <button className="rounded-full bg-[#14233C] px-6 py-3 text-white hover:bg-white hover:border-[#14233C] border hover:text-[#14233C] ">
                                See Our Collections
                            </button>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative block lg:h-[90vh] w-full"
                    >
                        <img
                            src={homegif}
                            alt="invitation"

                            // width={600}
                            // height={400}
                            className="rounded-2xl object-cover w-full h-full"
                        />
                        
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default HeroBanner;



