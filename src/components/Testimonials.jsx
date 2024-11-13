'use client'

import { Star } from 'lucide-react'
import { useState, useEffect } from 'react'


const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'REIAS India made my dream of owning a home a reality. Their expertise and dedication are unmatched!',
    avatar: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 2,
    name: 'Rahul Patel',
    role: 'Property Investor',
    content: 'Ive worked with many real estate firms, but REIAS India stands out. Their market insights are invaluable.',
    avatar: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'First-time Buyer',
    content: 'As a first-time buyer, I was nervous. REIAS India guided me through every step with patience and professionalism.',
    avatar: '/placeholder.svg?height=80&width=80'
  },
  {
    id: 4,
    name: 'Alex Chen',
    role: 'Commercial Property Owner',
    content: 'REIAS Indias commercial property expertise helped me secure an excellent location for my business.',
    avatar: '/placeholder.svg?height=80&width=80'
  }
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className=" py-16 text-primaryBlue">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight lg:text-4xl">
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
                  <blockquote className="mb-4 text-lg italic">"{testimonial.content}"</blockquote>
                  <div className=" flex">
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    </div>
                  <cite className="not-italic">
                    <span className="font-semibold">{testimonial.name}</span>
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
              className={`h-2 w-2 rounded-full ${
                index === currentTestimonial ? 'bg-primaryBlue' : 'bg-amber-600'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}