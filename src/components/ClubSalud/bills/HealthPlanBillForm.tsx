import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Tag } from 'primereact/tag'
import { getMemberById } from 'queries/ClubSalud/members'
import { setPlanPayment } from 'queries/ClubSalud/payments'
import { useState, type ReactElement } from 'react'
import { DateUtils } from 'utils/ClubSalud/dates'
import {
  type Subscription,
  type HealthPlanSubscribed
} from 'utils/ClubSalud/types'

export default function HealthPlanBillForm({
  subscription
}: {
  subscription: Subscription
}): ReactElement {
  const query = useQueryClient()
  const [selectedOS, setSelectedOS] = useState<
  HealthPlanSubscribed | undefined
  >(undefined)
  const [autorization, setAutorization] = useState<string | undefined>(
    undefined
  )

  const { data: memberInfo, isFetching } = useQuery({
    queryKey: ['member'],
    queryFn: async () => {
      if (subscription.Member) {
        return await getMemberById(subscription.Member?.id)
      }
      return undefined
    },
    enabled: !!subscription.Member
  })

  const {
    mutate: billOS,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: async (formData: {
      amount: number
      subscriptionId: number
      healthSubscribedPlanId: number
      date: Date
      autorizationNumber: string
    }) => {
      return await setPlanPayment(formData)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['member'] })
    }
  })

  return (
    <form
      className='flex flex-column gap-4'
      onSubmit={(e) => {
        e.preventDefault()
        billOS({
          amount: selectedOS?.HealthPlan?.paymentPerConsultation ?? 0,
          subscriptionId: subscription.id,
          healthSubscribedPlanId: selectedOS?.id ?? 0,
          date: DateUtils.getCurrentDate(),
          autorizationNumber: autorization ?? ''
        })
      }}
    >
      <Dropdown
        value={selectedOS}
        options={memberInfo?.HealthPlanSubscribed}
        loading={isFetching}
        placeholder='Obra Social'
        disabled={memberInfo?.HealthPlanSubscribed?.length === 0}
        optionLabel='plan.name'
        required
        onChange={(e) => {
          setSelectedOS(e.value as HealthPlanSubscribed)
        }}
      />
      <InputText
        placeholder='Número de autorización'
        value={autorization}
        required
        onChange={(e) => {
          setAutorization(e.target.value)
        }}
      />
      <Button
        type='submit'
        label='Guardar'
        icon='pi pi-upload'
        iconPos='right'
        size='small'
        outlined
        loading={isPending}
      />
      {isSuccess && <Tag severity='success'>Listo!</Tag>}
    </form>
  )
}
