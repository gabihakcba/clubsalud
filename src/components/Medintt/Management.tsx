'use client'

import { type ReactElement } from 'react'
import ManagementProfile from './ManagementProfile'
import oscar from '../../../public/images/oscar.jpg'
import cecilia from '../../../public/images/cecilia.jpg'
import sergio from '../../../public/images/sergio.jpg'

export default function Management(): ReactElement {
  return (
    <div className='flex flex-column p-4 justify-content-center align-items-center gap-4'>
      <text className='text-purple-700 text-2xl font-bold'>
        Nuestra Dirección
      </text>
      <div className='flex flex-wrap gap-6 justify-content-center align-items-start'>
        <ManagementProfile
          src={oscar}
          name='Dr. Oscar Franchi'
          description={
            'Director de Medintt. Médico especialista en Ortopedia, Traumatología y Medicina del Trabajo. Formación en Cirugía Mini Invasiva del Pie.'
          }
          socialmedia={[
            {
              url: 'https://www.instagram.com/droscarfranchi',
              icon: 'pi pi-instagram'
            },
            {
              url: 'https://www.facebook.com/oscar.franchi.9',
              icon: 'pi pi-facebook'
            },
            {
              url: 'https://www.linkedin.com/in/oscar-franchi-74b0b810',
              icon: 'pi pi-linkedin'
            }
          ]}
        />
        <ManagementProfile
          src={cecilia}
          name='Dra. Cecilia Chacón'
          description={
            'Gerente general. Especialista en clínica médica. Auditoría médica y Gestión de los Servicios de Salud.'
          }
          socialmedia={[
            {
              url: 'https://www.instagram.com/cecilia.mariela.chacon',
              icon: 'pi pi-instagram'
            },
            {
              url: 'https://www.facebook.com/ceciliamchacon',
              icon: 'pi pi-facebook'
            },
            {
              url: 'https://www.linkedin.com/in/cecilia-chacon-37003b10',
              icon: 'pi pi-linkedin'
            }
          ]}
        />
        <ManagementProfile
          src={sergio}
          name='Dr. Sergio Luscher'
          description={
            'Especialista en Medicina del Deporte, Especialista en Traumatología y Ortopedia, Profesor Nacional de Educación Física.'
          }
          socialmedia={[
            {
              url: 'https://www.instagram.com/sergio.luscher',
              icon: 'pi pi-instagram'
            },
            {
              url: 'https://www.facebook.com/sergiohugo.luscher',
              icon: 'pi pi-facebook'
            }
          ]}
        />
      </div>
    </div>
  )
}
