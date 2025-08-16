import { ICircleImage } from '@/types/propsTypes'

const CircleImage = ({ image }: ICircleImage) => {
  return (
    <div className="flex-1 flex justify-center md:justify-end relative">
      <div className="relative">
        {/* Outer decorative circle with dots */}
        <div className="absolute inset-0 w-80 h-80 md:w-96 md:h-96">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="rgb(251 191 36)"
              strokeWidth="2"
              strokeDasharray="8 12"
              className="animate-spin"
              style={{ animationDuration: "20s" }}
            />
          </svg>
        </div>

        {/* Golden frame */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-4">
          {/* Inner dark frame */}
          <div className="w-full h-full rounded-full bg-slate-700 p-2">
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500">
              <img
                src={image || "/placeholder.svg"}
                alt="Fashion model"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Decorative elements around the circle */}
        <div className="absolute -top-4 -right-4 w-16 h-8 bg-yellow-400 rounded-full transform rotate-12"></div>
        <div className="absolute -bottom-8 -left-8 w-20 h-10 bg-yellow-400 rounded-full transform -rotate-12"></div>
      </div>
    </div>
  )
}

export default CircleImage
