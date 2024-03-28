import { useState, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import edit from '../../../public/edit.svg'
import { type Class } from 'utils/types'

export default function ClassCard({ class_ }: { class_: Class }): ReactElement {
  const [editF, setEditF] = useState(false)
  const {
    register,
    // handleSubmit,
    formState: { errors }
    // reset,
    // watch
  } = useForm()
  return (
    <>
      <form
        action=''
        id={`classes${class_?.id}`}
        // onSubmit={handleSubmit((data) => {
        // mutateC({ id: instructor.id, data })
        // })}
      >
        <div className='flex items-center justify-end pb-2'>
          <button
            onClick={() => {
              setEditF((prev: boolean) => !prev)
            }}
            type='button'
            className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
          >
            <Image
              src={edit}
              width={30}
              height={30}
              alt='E'
            ></Image>
          </button>
        </div>
        <div className='flex flex-row'>
          <ul
            role='list'
            className='divide-y divide-gray-200 dark:divide-gray-700 w-full'
          >
            <li className='flex flex-row items-center justify-between w-full mb-1 mt-1'>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                Nombre
              </label>
              {!editF && (
                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                  {class_?.name}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='text'
                    id='name'
                    form={`class${class_?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={class_?.name}
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'El nombre requerido'
                      }
                    })}
                  />
                  {errors?.name && (
                    <span className='inputError'>
                      {errors.name.message as string}
                    </span>
                  )}
                </div>
              )}
            </li>
            <li className='flex flex-row items-center justify-between w-full mb-1 mt-1'>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                Duración (hs)
              </label>
              {!editF && (
                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                  {class_?.duration}
                </label>
              )}
              {editF && (
                <div>
                  <input
                    type='number'
                    id='duration'
                    form={`class${class_?.id}`}
                    className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    defaultValue={class_?.duration}
                    {...register('duration', {
                      required: {
                        value: true,
                        message: 'La duración es requerida'
                      }
                    })}
                  />
                  {errors?.duration && (
                    <span className='inputError'>
                      {errors.duration.message as string}
                    </span>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </form>
    </>
  )
}
