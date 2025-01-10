'use client'

import { useEffect, type ReactElement } from 'react'
import CarouselMedintt from 'components/Medintt/Carousel'
import Appointment from 'components/Medintt/Appointment'
import Management from 'components/Medintt/Management'
import Blog from 'components/Medintt/Blog'
import Trust from 'components/Medintt/Trust'
import { useRouter } from 'next/navigation'

export default function Home(): ReactElement {
  const router = useRouter()
  useEffect(() => {
    router.push('/clubsalud')
  }, [])
  return (
    <div>
      <CarouselMedintt />
      <Appointment />
      <Management />
      <Blog preview />
      <Trust />
    </div>
  )
}
