'use client'

import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
export default function Test(): ReactElement {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data)
        })}
        action=''
        className='w-max h-max flex flex-row gap-4 overflow-scroll scrollHidden'
      >
        <label htmlFor=''>Test</label>
        <label htmlFor=''>Lunes</label>
        <input
          {...register('days[]', {
            validate: () => {
              return watch('days[]').length > 0 || 'Al menos un día'
            }
          })}
          className='bg'
          type='checkbox'
          value={'MONDAY'}
          onChange={(e) => {
            // console.log(e.target.value)
          }}
        />

        <label htmlFor=''>Martes</label>
        <input
          {...register('days[]')}
          className='bg'
          type='checkbox'
          value={'TUESDAY'}
          onChange={(e) => {
            // console.log(e.target.value)
          }}
        />
        {errors?.days && (
          <span className='inputError'>{errors.days.message as string}</span>
        )}
        <button
          type='submit'
          className='bb'
        >
          Send
        </button>
      </form>
    </div>
  )
}
