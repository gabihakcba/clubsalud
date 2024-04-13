import { useState, type ReactElement } from 'react'
import {
  HealthPlanType,
  type HealthPlan,
  type CreateHealthPlan
} from 'utils/types'
import Image from 'next/image'
import edit from '../../../public/edit.svg'
import delete_ from '../../../public/delete_.svg'
import { type FieldValues, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteHealthPlan, updateHealthPlan } from 'queries/health'

interface params {
  plan: HealthPlan
}
export default function HealthCard({ plan }: params): ReactElement {
  const query = useQueryClient()

  const [editPlan, setEditPlan] = useState(false)

  const {
    mutate: update,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: number
      data: FieldValues
    }): Promise<HealthPlan> => {
      return await updateHealthPlan({
        id,
        ...(data as CreateHealthPlan)
      })
    },
    onSuccess: (data) => {
      query.setQueryData(['health'], (oldData: HealthPlan[]) => {
        const newData = [...oldData]
        const index = newData.findIndex((health) => health.id === data.id)
        newData.splice(index, 1, data)
        return newData
      })
      setTimeout(() => {
        setEditPlan(false)
      }, 250)
    }
  })

  const { mutate: deleteH } = useMutation({
    mutationFn: async (id: number | string): Promise<HealthPlan> => {
      return await deleteHealthPlan(id)
    },
    onSuccess: (data) => {
      query.setQueryData(['health'], (oldData: HealthPlan[]) => {
        return oldData.filter((health) => Number(health.id) !== Number(data.id))
      })
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  return (
    <div className='flex flex-col gap-2 border rounded p-4'>
      <div className='flex justify-end items-center gap-4'>
        <button
          onClick={() => {
            setEditPlan((old) => !old)
          }}
        >
          <Image
            src={edit}
            alt='E'
            width={20}
            height={20}
          ></Image>
        </button>
        <button
          onClick={() => {
            deleteH(plan.id)
          }}
        >
          <Image
            src={delete_}
            alt='E'
            width={20}
            height={20}
          ></Image>
        </button>
      </div>
      <form
        action=''
        onSubmit={handleSubmit(async (data, event) => {
          event?.preventDefault()
          update({ id: plan.id, data })
        })}
      >
        <div className='flex gap-2 m-1'>
          <label
            htmlFor=''
            className='grow'
          >
            Nombre:
          </label>
          {!editPlan && <div>{plan.name}</div>}
          {editPlan && (
            <div className='p-0 m-0'>
              <input
                type='text'
                className='w-full text-end border'
                defaultValue={plan.name}
                {...register('name', {
                  required: { value: true, message: 'Campo requerido' }
                })}
              />
              {errors.name && (
                <span className='inputError'>
                  {errors.name.message as string}
                </span>
              )}
            </div>
          )}
        </div>
        <hr />
        <div className='flex gap-2 m-1'>
          <label
            htmlFor=''
            className='grow'
          >
            Tipo:
          </label>
          {!editPlan && <div>{plan.type}</div>}
          {editPlan && (
            <div className='p-0 m-0'>
              <select
                id=''
                defaultValue={plan.type}
                {...register('type', {
                  required: { value: true, message: 'Campo requerido' }
                })}
              >
                <option value={HealthPlanType.OSDE}>
                  {HealthPlanType.OSDE}
                </option>
                <option value={HealthPlanType.APROSS}>
                  {HealthPlanType.APROSS}
                </option>
                <option value={HealthPlanType.IPROSS}>
                  {HealthPlanType.IPROSS}
                </option>
                <option value={HealthPlanType.PAMI}>
                  {HealthPlanType.PAMI}
                </option>
                <option value={HealthPlanType.OTHER}>
                  {HealthPlanType.OTHER}
                </option>
              </select>
            </div>
          )}
        </div>
        <hr />
        <div className='flex gap-2 m-1'>
          <label
            htmlFor=''
            className='grow'
          >
            Descripción:
          </label>
          {!editPlan && <div>{plan.description}</div>}
          {editPlan && (
            <div className='p-0 m-0'>
              <input
                type='text'
                className='w-full text-end border'
                defaultValue={plan.description}
                {...register('description')}
              />
              {errors.description && (
                <span className='inputError'>
                  {errors.description.message as string}
                </span>
              )}
            </div>
          )}
        </div>
        <hr />
        <div className='flex gap-2 m-1'>
          <label
            htmlFor=''
            className='grow'
          >
            Pago por consulta:
          </label>
          {!editPlan && <div>{plan.paymentPerConsultation}</div>}
          {editPlan && (
            <div className='p-0 m-0'>
              <input
                type='number'
                className='w-full text-end h-max border'
                defaultValue={plan.paymentPerConsultation}
                {...register('paymentPerConsultation', {
                  required: { value: true, message: 'Campo requerido' }
                })}
              />
              {errors.paymentPerConsultation && (
                <span className='inputError'>
                  {errors.paymentPerConsultation.message as string}
                </span>
              )}
            </div>
          )}
        </div>
        {editPlan && (
          <div>
            <button
              className='blueButtonForm p-1 w-full'
              type='submit'
            >
              Enviar
            </button>
            {isPending && <span className='text-yellow-300'>Actualizando</span>}
            {isSuccess && <span className='text-green-300'>Listo!</span>}
            {isError && <span className='text-red-300'>Error!</span>}
          </div>
        )}
      </form>
    </div>
  )
}
