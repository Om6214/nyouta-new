'use client'

import { Star } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Aditi & Vikram',
    role: 'Homeowner',
    content: 'Elegant, unique, and easy to share—our wedding invite was perfect!',
    avatar: 'https://picsum.photos/80?random=1', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 2,
    name: 'Meera & Aditya',
    role: 'Property Investor',
    content: 'The animated invite was magical and set the tone for our big day.',
    avatar: 'https://picsum.photos/80?random=2', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#FFD700', '#FFD700'], // All Gold
  },
  {
    id: 3,
    name: 'Shivani & Kunal',
    role: 'First-time Buyer',
    content: 'Angira Creation captured our love story beautifully in the invitation.',
    avatar: 'https://picsum.photos/80?random=3', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 4,
    name: 'Divya & Aarav',
    role: 'First-time Buyer',
    content: 'Modern, eco-friendly, and absolutely gorgeous. Loved it!',
    avatar: 'https://picsum.photos/80?random=3', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 5,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 6,
    name: 'Preeti & Sameer',
    role: 'Commercial Property Owner',
    content: 'Guests couldn’t stop praising the unique and elegant design.',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 7,
    name: 'Tanvi & Manan',
    role: 'Commercial Property Owner',
    content: 'Exceeded all expectations—our invite was simply perfect!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 8,
    name: 'Rohini & Akshay',
    role: 'Commercial Property Owner',
    content: 'Professional, creative, and fast. A wonderful experience!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 9,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 10,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 11,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 12,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 13,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 14,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 15,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 16,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 17,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 18,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 19,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 20,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 21,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 22,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 23,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 24,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 25,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 26,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 27,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 28,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 29,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 30,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 31,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 32,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 33,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 34,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 35,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 36,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 37,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 38,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
  {
    id: 39,
    name: 'Niharika & Raj',
    role: 'Commercial Property Owner',
    content: 'Stunning design and hassle-free process. Highly recommend!',
    avatar: 'https://picsum.photos/80?random=4', // Placeholder image
    starColors: ['#FFD700', '#FFD700', '#FFD700', '#C0C0C0', '#C0C0C0'], // Gold and Silver
  },
];


export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 text-primaryBlue bg-priBg">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-primary font-primaryFont text-center text-3xl font-bold tracking-tight lg:text-5xl">
          What Our Clients Say
        </h2>
        <div className="relative mx-auto max-w-4xl overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="mb-4 rounded-full"
                  />
                  <blockquote className="mb-4 font-heroFont text-lg italic">"{testimonial.content}"</blockquote>
                  <div className="flex">
                    {testimonial.starColors.map((color, index) => (
                      <Star
                        key={index}
                        style={{ fill: color }} // Use `fill` to color the inside of the star
                        className="w-5 h-5"
                      />
                    ))}
                  </div>

                  <cite className="not-italic">
                    <span className="font-semibold font-heroFont">{testimonial.name}</span>
                    <span className="block text-sm text-gray-400">{testimonial.role}</span>
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentTestimonial ? 'bg-third' : 'bg-amber-600'
                }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
