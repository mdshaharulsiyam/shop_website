import { useGetWebSettingsQuery } from '@/Redux/apis/settingApis'
import { useGlobalContext } from '@/providers/ContextProvider'
import { useMemo } from 'react'
import type { IconType } from 'react-icons'
import { FaShippingFast } from 'react-icons/fa'
import { IoReturnDownBackOutline } from 'react-icons/io5'
import { MdSupportAgent } from 'react-icons/md'
import { RiSecurePaymentLine } from 'react-icons/ri'

type BenefitCard = {
  title: string
  icon: IconType
  description: string
  isSkeleton?: boolean
}

const Benefit = () => {
  const { themeColor } = useGlobalContext()
  const { data, isLoading, isFetching } = useGetWebSettingsQuery(undefined)
  const benefits: BenefitCard[] = useMemo(() => {
    const supports = data?.data?.supports || {}

    return [
      {
        title: supports.shipping_heading || 'Free Shipping',
        icon: FaShippingFast,
        description: supports.shipping_description || 'Free shipping on all US orders or orders above $200.',
      },
      {
        title: supports.support_heading || '24x7 Support',
        icon: MdSupportAgent,
        description: supports.support_description || 'Contact us 24 hours live support, 7 days a week.',
      },
      {
        title: supports.refund_heading || '30 Days Return',
        icon: IoReturnDownBackOutline,
        description: supports.refund_description || 'Simply return it within 30 days for an exchange.',
      },
      {
        title: supports.payment_heading || 'Payment Secure',
        icon: RiSecurePaymentLine,
        description: supports.payment_description || 'Secure payments with full buyer protection.',
      },
    ]
  }, [data])

  const showSkeleton = isLoading || isFetching

  const content = showSkeleton
    ? Array.from({ length: 4 }).map((_, idx) => ({
      title: `Loading ${idx + 1}`,
      icon: FaShippingFast,
      description: 'Loading content...',
      isSkeleton: true,
    }))
    : benefits

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start items-center gap-5 my-5">
      {content.map((benefit, idx) => (
        <div
          style={{
            backgroundColor: themeColor.white,
          }}
          key={`${benefit.title}-${idx}`}
          className="flex flex-col items-center flex-1 w-full p-8 rounded-xl shadow-md text-center border border-gray-100"
        >
          {(() => {
            const Icon = benefit.icon as React.ComponentType<{ className?: string }>
            return (
              <Icon
                className={`w-14 h-14 mb-5 ${benefit.isSkeleton ? 'text-gray-300 animate-pulse' : 'text-gray-700'}`}
              />
            )
          })()}
          <h4 className={`text-xl font-semibold mb-2 ${benefit.isSkeleton ? 'text-gray-300 animate-pulse' : 'text-gray-800'}`}>
            {benefit.title}
          </h4>
          <p className={`text-base leading-normal ${benefit.isSkeleton ? 'text-gray-200 animate-pulse' : 'text-gray-600'}`}>
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Benefit