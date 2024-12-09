
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
    <section className="relative min-h-screen bg-priBg ">
      <div className="container mx-auto px-4 py-16 lg:py-24">
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
            eNyouta presents to you an exclusive collection of Digital Wedding Invitations, Party Invitations, Pooja Ritual Invitations & Events Invitations Card designs. We designers have included all Invitation Suite Theme styles from Traditional Indian Ethnic to Photo based & Pastel Modern Floral.
            Hassle free to send & share the joy across all mediums be it Email, Whatsapp or Social Media such as Facebook, Instagram. (note here it will be in Image format). Save the environment by going paperless. No printing & courier costs.
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
            <button className="rounded-full bg-[#14233C] px-6 py-3 w-fit text-white hover:bg-white hover:border-[#14233C] border hover:text-[#14233C] ">
              About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}