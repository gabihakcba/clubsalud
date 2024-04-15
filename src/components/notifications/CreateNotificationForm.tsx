import { type Member } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { findAccountByUsername } from 'queries/accounts'
import { createNotification } from 'queries/notifications'
import { type ReactElement, useEffect, useState } from 'react'
import { useForm, type FieldValues } from 'react-hook-form'
import { getUserToken, setNewUser } from 'utils/auth'

interface params {
  closeModal: () => void
}
export default function CreateNotificationForm({
  closeModal
}: params): ReactElement {
  const [user, setUser] = useState<Member | undefined>(undefined)

  useEffect(() => {
    const token = getUserToken()
    void setNewUser(token, setUser)
  }, [])

  const {
    mutate: create,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: createNotification,
    onSuccess: (data) => {
      reset()
      setTimeout(closeModal, 250)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  return (
    <form
      action=''
      className='flex flex-col gap-4 bg-white p-2 rounded'
      onSubmit={handleSubmit(async (data: FieldValues, event) => {
        event?.preventDefault()
        const account = await findAccountByUsername(
          data.receiverUsername as string
        )
        const newNotification = {
          receiverId: Number(account.id),
          senderId: Number(user?.id),
          subject: data.subject,
          body: data.body
        }
        create(newNotification)
      })}
    >
      <h2>Crear notifiaciones</h2>
      <div className='flex justify-between gap-2'>
        <label htmlFor=''>Para: </label>
        <input
          type='text'
          placeholder='Nombre de usuario'
          className={`border px-1 rounded ${errors?.receiverUsername && 'focus:border-red-500 focus:outline-none'}`}
          {...register('receiverUsername', { required: true })}
        />
      </div>
      <div className='flex justify-between gap-2'>
        <label htmlFor=''>Asunto: </label>
        <input
          type='text'
          placeholder='Asunto'
          className={`border px-1 rounded ${errors?.subject && 'focus:border-red-500 focus:outline-none'}`}
          {...register('subject', { required: true })}
        />
      </div>
      <div className='flex justify-between gap-2'>
        <label htmlFor=''>Mensaje: </label>
        <input
          type='text'
          placeholder='mensaje'
          className={`border px-1 rounded ${errors?.body && 'focus:border-red-500 focus:outline-none'}`}
          {...register('body', { required: true })}
        />
      </div>
      <button className='blueButtonForm p-1'>Send</button>
      {isPending && <span className='text-yellow-400'>Creando...</span>}
      {isSuccess && <span className='text-green-400'>Listo!</span>}
      {isError && <span className='text-yellow-400'>Error</span>}
    </form>
  )
}
