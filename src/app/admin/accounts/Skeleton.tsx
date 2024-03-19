import { type ReactElement } from 'react'
import Image from 'next/image'
// import menu from '../../../../public/menu.svg'
import edit from '../../../../public/edit.svg'
import info from '../../../../public/info.svg'
import delete_ from '../../../../public/delete_.svg'
const accounts = new Array(52).fill(0)

export default function Loading(): ReactElement {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    // <div className='max-h-dvh h-full w-full flex items-start justify-start flex-row'>
    //   <main className='mr-5 w-full h-full flex flex-col items-start justify-between'>
    //     <div className='w-full h-max p-2 bg-white border-b-2 border-gray-400'>
    //       <div className='flex flex-row gap-2'>
    //         <Image
    //           width={38}
    //           height={38}
    //           src={menu}
    //           alt='|||'
    //         ></Image>
    //       </div>
    //     </div>
    <section
      className='mt-5 ml-5 h-full scrollHidden'
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(9rem,1fr))',
        gap: '0,5rem',
        alignContent: 'flex-start',
        maxHeight: '95dvh',
        overflow: 'scroll'
      }}
    >
      {accounts.length > 0 &&
        accounts.map((account) => (
          <div
            key={Math.random()}
            className=''
            style={{
              justifySelf: 'center'
              // 'border': '1px solid red'
            }}
          >
            <div className='bg-white shadow-md rounded p-3 mb-5 h-max w-min'>
              <div className='mb-2'>
                <input
                  name='name'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  disabled
                ></input>
              </div>
              <div className='mb-2'>
                <input
                  name='permissions'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  type='password'
                  disabled
                ></input>
              </div>
              <div className='flex flex-row w-max gap-2 justify-around items-stretch'>
                <div className='block hover:bg-yellow-600'>
                  <Image
                    src={edit}
                    width={30}
                    height={30}
                    alt='E'
                  ></Image>
                </div>
                <div className='block hover:bg-red-600'>
                  <Image
                    src={delete_}
                    width={30}
                    height={30}
                    alt=''
                  ></Image>
                </div>
                <div className='block hover:bg-red-600'>
                  <Image
                    src={info}
                    width={30}
                    height={30}
                    alt=''
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
    //     <nav className='w-full flex flex-row justify-center'>
    //       <div className='h-full w-full flex items-center justify-center'>
    //         <button className='w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px- m-2 rounded focus:outline-none focus:shadow-outline'>
    //           Anterior
    //         </button>
    //         <p className='w-10 text-center'>N</p>
    //         <button className='w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px- m-2 rounded focus:outline-none focus:shadow-outline'>
    //           Siguiente
    //         </button>
    //       </div>
    //     </nav>
    //   </main>
    // </div>
  )
}
