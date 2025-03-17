import { type ReactElement } from 'react'
import CarouselMedintt from 'components/Home/Carousel'
import DoctorImage from 'components/Home/DoctorImage'
import WhyMedintt from 'components/Home/WhyMedintt'
import Services from 'components/Home/Services'
import ClubSalud from 'components/Home/ClubSalud'

export default function Home(): ReactElement {
  return (
    <div className='shadow-4'>
      <DoctorImage />
      <CarouselMedintt />
      <WhyMedintt />
      <Services />
      <ClubSalud />
    </div>
  )
}
