import { useGlobalContext } from '@/providers/ContextProvider'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
const Images = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const { themeColor } = useGlobalContext()
  const imageList = [
    "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
    "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
    "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
    "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
    "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
    "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
  ]

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
  }
  return (
    <div className='w-full h-full '>
      <div style={{
        backgroundColor: themeColor.white,
      }} className='w-full overflow-hidden p-3 rounded-2xl'>
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
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {imageList.map((_, i) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className="w-[100px] h-[100px] flex-shrink-0"
              >
                <img
                  className={`rounded-2xl object-cover border-2 w-[100px] h-[100px] ${i === index ? "border-blue-500" : "border-transparent"
                    }`}
                  src={imageList[i]}
                  alt=""
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


    </div>

  )
}

export default Images
