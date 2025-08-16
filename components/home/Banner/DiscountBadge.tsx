import { IDiscountBadge } from '@/types/propsTypes'

const DiscountBadge = ({ discount }: IDiscountBadge) => {
  return (
    <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 text-slate-800 rounded-full mb-8 relative">
      <div className="text-center">
        <div className="text-lg font-bold">{discount}</div>
        <div className="text-sm font-medium">Off</div>
      </div>
      {/* Badge decorative points */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
      <div className="absolute top-1/2 -left-2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 -right-2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-y-1/2"></div>
    </div>
  )
}

export default DiscountBadge
