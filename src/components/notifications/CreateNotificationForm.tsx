import { type Member } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { getAccounts } from 'queries/accounts'
import { createNotification } from 'queries/notifications'
import { type ReactElement, useEffect, useState } from 'react'
import { useForm, type FieldValues } from 'react-hook-form'
import { getUserToken, setNewUser } from 'utils/auth'

export default function CreateNotificationForm(): ReactElement {
  const [user, setUser] = useState<Member | undefined>(undefined)
  const [selectedAccount, setSelectedAccount] = useState<any>(null)

  const query = useQueryClient()

  useEffect(() => {
    const token = getUserToken()
    void setNewUser(token, setUser)
  }, [])

  const { data: accounts, isPending: loadingAccounts } = useQuery({
    queryKey: ['acc'],
    queryFn: async () => {
      const response = await getAccounts(0, 0)
      return response.pages
    }
  })

  const {
    mutate: create,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: createNotification,
    onSuccess: (data) => {
      reset()
      console.log(data)
      query.setQueriesData(
        { queryKey: ['notifications'] },
        (oldNot: Notification[]) => [...oldNot, data]
      )
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  return (
    <form
      action=''
      className='flex flex-column gap-4 pt-4'
      onSubmit={handleSubmit(async (data: FieldValues, event) => {
        event?.preventDefault()
        const newNotification = {
          receiverId: data.receiverId,
          senderId: Number(user?.id),
          subject: data.subject,
          body: data.body
        }
        create(newNotification)
      })}
    >
      <FloatLabel>
        <Dropdown
          options={accounts}
          loading={loadingAccounts}
          value={selectedAccount}
          optionLabel='username'
          optionValue='id'
          {...register('receiverUsername', { required: true })}
          onChange={(e) => {
            setSelectedAccount(e.value)
            setValue('receiverId', e.value)
          }}
          invalid={errors?.receiverUsername !== undefined}
          className='w-full'
          filter
        />
        <label htmlFor=''>Para</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          type='text'
          {...register('subject', { required: true })}
          invalid={errors?.subject !== undefined}
        />
        <label htmlFor=''>Asunto</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          type='text'
          {...register('body', { required: true })}
          invalid={errors?.body !== undefined}
        />
        <label htmlFor=''>Mensaje</label>
      </FloatLabel>
      <Button
        label='Enviar'
        icon='pi pi-upload'
        iconPos='right'
        size='small'
        loading={isPending}
      />
      {isPending && <small className='text-yellow-400'>Creando...</small>}
      {isSuccess && <small className='text-green-400'>Listo!</small>}
      {isError && <small className='text-yellow-400'>Error</small>}
    </form>
  )
}
