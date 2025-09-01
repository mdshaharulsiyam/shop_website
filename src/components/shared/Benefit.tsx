import { useGlobalContext } from '@/providers/ContextProvider'

const Benefit = () => {
  const { themeColor } = useGlobalContext()
  const benefits = [
    {
      "title": "Free Shipping",
      "icon": "A simple line-art icon of a delivery truck with a 'free' tag on top.",
      "description": "Free shipping on all US orders or order above $200.",
      "image": "https://placehold.co/400x400/png"
    },
    {
      "title": "24x7 Support",
      "icon": "A simple line-art icon of two hands shaking, symbolizing support.",
      "description": "Contact us 24 hours live support, 7 days in a week.",
      "image": "https://placehold.co/400x400/png"
    },
    {
      "title": "30 Days Return",
      "icon": "A simple line-art icon of a box with a curved arrow, representing a return or exchange.",
      "description": "Simply return it within 30 days for an exchange.",
      "image": "https://placehold.co/400x400/png"
    },
    {
      "title": "Payment Secure",
      "icon": "A simple line-art icon of a hand holding a coin with a dollar sign, representing secure payment.",
      "description": "Contact us 24 hours live support, 7 days in a week.",
      "image": "https://placehold.co/400x400/png"
    }
  ]

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start items-center gap-5">
      {benefits.map((benefit) => (
        <div
          style={{
            backgroundColor: themeColor.white,
          }}
          key={benefit.title}
          className="flex flex-col items-center flex-1 w-full max-w-sm p-8 rounded-xl shadow-md text-center"
        >
          {/* In a real-world scenario, you would use a smaller SVG or icon image here. */}
          <img src={benefit.image} alt={benefit.title} className="w-14 h-14 mb-5" />
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h4>
          <p className="text-base text-gray-600 leading-normal">{benefit.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Benefit