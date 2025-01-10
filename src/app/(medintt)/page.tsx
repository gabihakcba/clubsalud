'use client'

import { type ReactElement } from 'react'
import CarouselMedintt from 'components/Medintt/Carousel'
import Appointment from 'components/Medintt/Appointment'
import Management from 'components/Medintt/Management'
import Blog from 'components/Medintt/Blog'
import Trust from 'components/Medintt/Trust'

export default function Home(): ReactElement {
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
