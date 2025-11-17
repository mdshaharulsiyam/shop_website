import { useGlobalContext } from '@/providers/ContextProvider'
import { FaShippingFast } from 'react-icons/fa'
import { IoReturnDownBackOutline } from 'react-icons/io5'
import { MdSupportAgent } from 'react-icons/md'
import { RiSecurePaymentLine } from 'react-icons/ri'

const Benefit = () => {
  const { themeColor } = useGlobalContext()
  const benefits = [
    {
      "title": "Free Shipping",
      "icon": FaShippingFast,
      "description": "Free shipping on all US orders or order above $200.",
    },
    {
      "title": "24x7 Support",
      "icon": MdSupportAgent,
      "description": "Contact us 24 hours live support, 7 days in a week.",
    },
    {
      "title": "30 Days Return",
      "icon": IoReturnDownBackOutline,
      "description": "Simply return it within 30 days for an exchange.",
    },
    {
      "title": "Payment Secure",
      "icon": RiSecurePaymentLine,
      "description": "Contact us 24 hours live support, 7 days in a week.",
    }
  ]

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start items-center gap-5 my-5">
      {benefits.map((benefit) => (
        <div
          style={{
            backgroundColor: themeColor.white,
          }}
          key={benefit.title}
          className="flex flex-col items-center flex-1 w-full p-8 rounded-xl shadow-md text-center"
        >
          {(() => {
            const Icon = benefit.icon as React.ComponentType<{ className?: string }>
            return <Icon className="w-14 h-14 mb-5 text-gray-700" />
          })()}
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h4>
          <p className="text-base text-gray-600 leading-normal">{benefit.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Benefit