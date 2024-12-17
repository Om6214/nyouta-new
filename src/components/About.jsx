
import { useEffect, useState } from 'react'
import placeholder from '../assets/images/placeholder.jpg'

export default function About() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)
  const [count4, setCount4] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const interval = 50 // Update every 50ms

    // Calculate steps for each counter
    const steps1 = 10 / (duration / interval)
    const steps2 = 2500 / (duration / interval)
    const steps3 = 100 / (duration / interval)
    const steps4 = 11800 / (duration / interval)

    const timer = setInterval(() => {
      setCount1((prev) => {
        if (prev < 10) return Math.min(prev + steps1, 10)
        return prev
      })
      setCount2((prev) => {
        if (prev < 2500) return Math.min(prev + steps2, 2500)
        return prev
      })
      setCount3((prev) => {
        if (prev < 100) return Math.min(prev + steps3, 100)
        return prev
      })
      setCount4((prev) => {
        if (prev < 11800) return Math.min(prev + steps4, 11800)
        return prev
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen bg-secondary font-heroFont">
      <div className="container mx-auto px-4 py-16 lg:py-24 text-white">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={placeholder}
              alt="Luxury apartment view"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
        
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              ABOUT <span className='text-amber-700'>ई-न्यौता</span>
            </h1>
            <p className="text-lg">
            Nyouta is Brand of Angira Creation, we understand that every moment of your wedding is a reflection of your unique love story. That’s why we offer an array of free wedding and party invitations, itineraries, calendars, photo books, and greetings to help you celebrate your journey in style. Our designs blend creativity with elegance, capturing your precious memories in a way that feels as special as the day itself. <br />
            Our mission is to make your wedding planning simpler and more beautiful, allowing you to focus on what truly matters—creating unforgettable memories with your loved ones. From personalized wedding itineraries to stunning photo books and interactive wedding invitations, we provide everything you need to make your celebration even more memorable.
            </p>
            <div className="grid grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold lg:text-4xl text-amber-700">
                  {Math.round(count1)}+
                </div>
                <div className="mt-2 text-sm text-primaryBlue">Years of Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold lg:text-4xl text-amber-700">
                  {Math.round(count2)}+
                </div>
                <div className="mt-2 text-sm text-primaryBlue">Templates</div>
              </div>
              <div>
                <div className="text-3xl font-bold lg:text-4xl text-amber-700">
                  {Math.round(count3)}+
                </div>
                <div className="mt-2 text-sm text-primaryBlue">Registered Vendors</div>
              </div>
              <div>
                <div className="text-3xl font-bold lg:text-4xl text-amber-700">
                  {Math.round(count4)}+
                </div>
                <div className="mt-2 text-sm text-primaryBlue">Satisfied Customers</div>
              </div>
            </div>
            <button className="rounded-full bg-primary px-8 py-3 w-fit text-white font-heroFont text-lg hover:bg-secondary hover:border-[#14233C] border hover:text-[#14233C] ">
              About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}