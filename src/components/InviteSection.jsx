import React from 'react'

const InviteSection = () => {
  return (
    <section className='py-16 lg:px-12 px-4'>
        <div>
            <h1 className='lg:text-4xl text-3xl text-center mb-4'>Send Invites By</h1>
            <div className="w-40 h-0.5 bg-amber-400 mx-auto mb-6"></div>
        </div>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-8'>
            <div className='bg-violet-200 px-16 py-8 rounded-lg'>
                <div className='flex flex-col gap-6 items-start'>
                    <h1 className='text-4xl'>Surprise Party Invitation</h1>
                    <button className='text-lg border-solid border-[1px] border-black px-6 py-2 rounded-md hover:bg-teal-300 transition duration-300 ease-in hover:border-teal-300'>Browse Now</button>
                </div>
                <div className='flex justify-end'>
                    <img className='lg:w-[250px] w-[175px] hover:-translate-x-4 transition duration-300 ease-in-out' src="https://cdn.prod.website-files.com/61c4debfe6329744f06c60e1/6724123ed680ec6c940f9214_say-surprise-40_ani_envelope-p-500.webp" alt="" />
                </div>
            </div>
            <div className='bg-violet-300 px-16 py-8 rounded-lg'>
                <div className='flex flex-col gap-6 items-start'>
                    <h1 className='text-4xl'>Wedding Invitation</h1>
                    <button className='text-lg border-solid border-[1px] border-black px-6 py-2 rounded-md hover:bg-teal-300 transition duration-300 ease-in hover:border-teal-300'>Browse Now</button>
                </div>
                <div className='flex justify-end'>
                    <img className='lg:w-[250px] w-[175px] hover:-translate-x-4 transition duration-300 ease-in-out' src="https://cdn.prod.website-files.com/6721b27fd51e68efda3f7632/6721b27fd51e68efda3f851e_env.webp" alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default InviteSection