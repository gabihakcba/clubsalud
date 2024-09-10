import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { deleteHealthSubscribed } from 'queries/healthSus'
import { type ReactElement, useState } from 'react'
import { type HealthPlanSubscribed, type Member } from 'utils/types'

export default function HealthPlanList({
  member
}: {
  member: Member
}): ReactElement {
  const query = useQueryClient()

  const [selectedHealth, setSelectedHealth] = useState<number | null>(null)
  const { mutate: deletePlan, isPending: deletingHealth } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteHealthSubscribed(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['account'] })
    }
  })

  return (
    <Card>
      {member?.planSubscribed?.map((planS: HealthPlanSubscribed) => (
        <div
          key={planS.id}
          className='flex flex-column w-full h-full'
        >
          <div className='flex flex-row gap-4 pb-4'>
            <InputText
              value={String(planS?.id)}
              disabled
            />
            <InputText
              value={planS?.plan?.name}
              disabled
            />
            <InputText
              value={planS?.afiliateNumber}
              disabled
            />
            <Button
              type='button'
              size='small'
              icon='pi pi-trash'
              outlined
              severity='danger'
              onClick={() => {
                deletePlan(planS.id)
                setSelectedHealth(planS.id)
              }}
              loading={deletingHealth && selectedHealth === planS.id}
            />
          </div>
        </div>
      ))}
    </Card>
  )
}
