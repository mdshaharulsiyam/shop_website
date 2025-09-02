import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
const Images = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const imageList = ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"]



  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute"
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
      transition: {
        duration: 0.6
      }
    },
    // exit: (direction: number) => ({
    //   x: direction < 0 ? 300 : -300,
    //   opacity: 0,
    //   position: "absolute",
    //   transition: {
    //     duration: 0.6
    //   }
    // })
  }
  return (
    <div className='w-full h-full'>
      <div className='w-full overflow-hidden'>
        <AnimatePresence>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full"
          >
            <img className='w-full h-[400px] md:h-[500px] lg:h-[650px] object-contain' src={imageList[index]} alt="" />
          </motion.div>
        </AnimatePresence>
      </div>
      {
        imageList.length > 1 && <div className='flex justify-center items-center gap-3 mt-3'>
          {imageList.map((_, i) => (
            <button key={i} onClick={() => {
              setDirection(i > index ? 1 : -1)
              setIndex(i)
            }} className={`w-30 h-30`}>
              <img className={`w-full h-full rounded-4xl object-cover border ${i === index ? 'border-black dark:border-white' : 'border-transparent'}`} src={imageList[i]} alt="" />
            </button>
          ))}
        </div>
      }
    </div>
  )
}

export default Images
