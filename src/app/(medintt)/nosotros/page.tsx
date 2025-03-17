'use client'

import ManagementProfile from 'components/Medintt/ManagementProfile'
import { Carousel } from 'primereact/carousel'
import { type ReactElement } from 'react'

export default function Whoweare(): ReactElement {
  return (
    <div className='flex flex-column text-primary font-secondary shadow-4'>
      {/* Nostros */}
      <div className='flex flex-row p-4 align-items-center'>
        <img
          src='/medintt/we.png'
          alt=''
          className='h-15rem sm:h-16rem md:h-18rem lg:h-22rem'
        />
        <div className='flex flex-column gap-4 justify-content-center p-4'>
          <span className='text-3xl py-0 md:py-2 lg:py-4'>Nosotros</span>
          <div className='flex flex-column gap-4 pr-2 mr-8 sm:pr-3 sm:mr-3 md:mr-5 md:pr-5 lg:pr-8 lg:mr-8'>
            <span className='flex flex-column'>
              <span>
                Innovamos la salud para <b>potenciar el bienestar.</b>
              </span>
              <span>
                En Medintt, creemos que la salud es mucho más que un servicio:
                es una experiencia que transforma la calidad de vida. Con más de
                una década de trayectoria, combinamos tecnología,
                profesionalismo y calidez humana para brindar soluciones
                integrales en salud laboral, prevención y bienestar personal.
              </span>
            </span>
            <span>
              Somos el aliado estratégico de empresas que buscan proteger a su
              equipo y de personas que desean cuidar su bienestar con un enfoque
              completo y personalizado.
            </span>
          </div>
        </div>
      </div>

      {/* Equipo */}
      <div className='flex flex-column px-8 py-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4'>
        <span className='text-3xl font-bold'>Nuestro equipo</span>
        <span
          className=''
          style={{ width: '35rem' }}
        >
          En Medintt, contamos con un equipo multidisciplinario de especialistas
          altamente calificados en salud laboral, medicina preventiva y
          bienestar integral.
        </span>
        <div className='flex flex-column md:flex-row align-items-center gap-7 w-full justify-content-center'>
          <ManagementProfile
            src={'/images/oscar.jpg'}
            name={'Dr. Oscar Franchi'}
            description={
              'Director de Medintt. Médico especialista en Ortopedia, Traumatología y Medicina del Trabajo. Formación en Cirugía Mini Invasiva del Pie.'
            }
            socialmedia={[
              { url: 'https://www.instagram.com/droscarfranchi/', icon: 'pi pi-instagram' },
              { url: 'https://www.facebook.com/oscar.franchi.9', icon: 'pi pi-facebook' },
              { url: 'https://www.linkedin.com/in/oscar-franchi-74b0b810', icon: 'pi pi-linkedin' }
            ]}
          />

          <ManagementProfile
            src={'/images/cecilia.jpg'}
            name={'Dra. Cecilia Chacón'}
            description={
              'Gerente general. Especialista en clínica médica. Auditoría médica y Gestión de los Servicios de Salud.'
            }
            socialmedia={[
              { url: 'https://www.instagram.com/cecilia.mariela.chacon', icon: 'pi pi-instagram' },
              { url: 'https://www.facebook.com/ceciliamchacon', icon: 'pi pi-facebook' },
              { url: 'https://www.linkedin.com/in/cecilia-chacon-37003b10', icon: 'pi pi-linkedin' }
            ]}
          />

          <ManagementProfile
            src={'/images/sergio.jpg'}
            name={'Dr. Sergio Luscher'}
            description={
              'Especialista en Medicina del Deporte, Especialista en Traumatología y Ortopedia. Profesor Nacional de Educación Física.'
            }
            socialmedia={[
              { url: 'https://www.instagram.com/sergio.luscher', icon: 'pi pi-instagram' },
              { url: 'https://www.facebook.com/sergiohugo.luscher', icon: 'pi pi-facebook' }
            ]}
          />
        </div>
      </div>

      {/* Especialistas */}
      <div className='grid text-primary my-7'>
        <div className='col-3'>
          <div className='flex flex-column gap-4'>
            <span className='text-2xl font-bold px-4'>
              Nuestros especialistas
            </span>
            <span className='px-4'>
              Contamos con un equipo de profesionales dedicados a cuidar la
              salud de nuestros pacientes.
            </span>
            <img
              src='/medintt/pinkrec.png'
              alt=''
              className='w-5rem my-6'
            />
          </div>
        </div>
        <div className='col-6'>
          <div className='flex flex justify-content-center align-items-center'>
            <img
              src='/medintt/especialistas.png'
              alt=''
              className='w-17rem sm:w-19rem md:w-22rem lg:w-27rem xl:w-30rem'
            />
          </div>
        </div>
        <div className='col-3'>
          <div className='h-full flex justify-content-end align-items-end'>
            <img
              src='/medintt/masaje.png'
              alt=''
              className='w-6rem sm:w-8rem md:w-10rem lg:w-12rem xl:w-15rem'
            />
          </div>
        </div>
      </div>

      {/* Mision */}
      <div className='flex flex-row flex flex-row align-items-center justify-content-center gap-2 sm:gap-4 md:gap-6 lg:gap-7 xl:gap-8 surface-section w-full'>
        <img
          src='/medintt/puno.png'
          alt=''
          className='w-10rem sm:w-12rem md:w-15rem lg:w-20rem xl:w-23rem'
        />
        <Carousel
          numScroll={2}
          numVisible={1}
          showNavigators={false}
          className='max-w-24rem p-4'
          value={[
            {
              title: 'Nuestra misión',
              description:
                'Transformar la salud ocupacional y personal, ofreciendo servicios innovadores y accesibles que promuevan el equilibrio entre el trabajo, la prevención y el bienestar integral.'
            },
            {
              title: 'Nuestra visión',
              description:
                'Ser el referente en salud laboral y bienestar integral, adaptándonos a los cambios y necesidades de cada persona y organización.'
            }
          ]}
          itemTemplate={(item) => (
            <div className='flex flex-column text-primary w-20rem gap-4'>
              <span className='text-2xl font-bold'>{item.title}</span>
              <span className=''>{item.description}</span>
            </div>
          )}
        />
      </div>

      {/* Valores */}
      <div className='flex flex-column text-primary justify-content-center align-items-center my-7 gap-4'>
        <span className='text-3xl font-bold'>Nuestros valores</span>
        <div className='flex flex-row justify-content-center align-items-center gap-4 px-4'>
          <div className='border-round-3xl h-12rem border-2 border-primary p-4 gap-5 flex flex-column justify-content-center align-items-between max-w-15rem'>
            <span className='text-xl'>🔄 Evolución</span>
            <span className='text-sm'>
              Nos reinventamos constantemente para ofrecer soluciones
              actualizadas y efectivas.
            </span>
          </div>
          <div className='border-round-3xl h-12rem border-2 border-primary p-4 gap-5 flex flex-column justify-content-center align-items-between max-w-15rem'>
            <span className='text-xl'>🚀 Transformación Integral</span>
            <span className='text-sm'>
              Cada servicio busca generar un impacto positivo en la calidad de
              vida de las personas y empresas.
            </span>
          </div>
          <div className='border-round-3xl h-12rem border-2 border-primary p-4 gap-5 flex flex-column justify-content-center align-items-between max-w-15rem'>
            <span className='text-xl'>🤝 Compromiso Humano</span>
            <span className='text-sm'>
              Priorizamos el bienestar de nuestros pacientes y clientes con
              atención cercana y profesional.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
