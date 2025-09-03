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
      <Carousel className="w-full">
        <CarouselContent className="">
          {imageList.map((_, i) => (
            <CarouselItem key={i} className="py-1 basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <div
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className="w-full h-[80px] flex-shrink-0"
              >
                <img
                  className={`rounded-2xl object-cover border-2 w-full h-full ${i === index ? "border-blue-500" : "border-transparent"
                    }`}
                  src={imageList[i]}
                  alt=""
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute -left-[14px] z-10' />
        <CarouselNext className='absolute -right-[14px] z-10' />
      </Carousel>


    </div>

  )
}

export default Images
