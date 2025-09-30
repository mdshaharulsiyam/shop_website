"use client"

import { prevSlide } from '@/handler/bannerHandler';
import { useGlobalContext } from '@/providers/ContextProvider';
import { useGetProductsGroupByLabelQuery } from '@/Redux/apis/productSlice';
import { imageUrl } from '@/Redux/baseApi';
import type { ICategory, IGroup, IProductFromApi } from '@/types/dataTypes';
import { hexToRGBA7 } from '@/utils/hexToRGBA';
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import IconButton from '../buttons/IconButton';
import PaginationDots from '../paginations_dots/PaginationDots';
import CategoryTable from '../shared/CategoryTable';

const Category = () => {
  const { themeColor } = useGlobalContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const { data: categoryData } = useGetProductsGroupByLabelQuery(undefined);

  const categorySlides: ICategory[][] = categoryData?.data.reduce((acc: ICategory[][], group: IGroup, index: number) => {
    const slideIndex = Math.floor(index / 5);
    if (!acc[slideIndex]) {
      acc[slideIndex] = [];
    }
    acc[slideIndex].push({
      title: group.label,
      items: group.products.length,
      images: group.products.slice(0, 3).map((p: IProductFromApi) => imageUrl(p.img[0])),
      discount: '' // Added placeholder for discount
    });
    return acc;
  }, [] as ICategory[][]) || [];

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 40 : -40,
      scale: 0.98
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 40 : -40,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    })
  };

  return (
    <div className="w-full container mx-auto ">
      <div className="flex items-center justify-between mb-8">
        <h2 style={{
          color: hexToRGBA7(themeColor.black)
        }} className="text-2xl font-bold">Category</h2>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          <PaginationDots
            setCurrentSlide={setCurrentSlide}
            currentSlide={currentSlide}
            setDirection={setDirection}
            slideNumber={categorySlides.length}
          />
        </div>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden mb-4">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants as any}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {categorySlides.length > 0 && categorySlides[currentSlide] && categorySlides[currentSlide].map((category: ICategory, index: number) => (
              <CategoryTable key={index} category={category} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Arrows */}
      <div className="flex justify-center gap-4 mt-6 mb-4 md:hidden">
        <IconButton
          icon={<ChevronLeft className="w-5 h-5" />}
          handler={() => prevSlide(setDirection, setCurrentSlide, categorySlides as any)}
        />

        <IconButton
          icon={<ChevronRight className="w-5 h-5" />}
          handler={() => prevSlide(setDirection, setCurrentSlide, categorySlides as any)}
        />

      </div>
    </div>
  );
};

export default Category;
