import { type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMembers } from 'queries/ClubSalud/members'
import { Dialog } from 'primereact/dialog'
import RegistrationForm from './RegistrationForm'
import { Dropdown } from 'primereact/dropdown'
import { type Member } from 'utils/ClubSalud/types'

const getMember = (
  members: Member[] | undefined,
  memberId: number | null
): Member | null => {
  if (members && memberId) {
    return members.filter((mem: Member) => mem.id === memberId)[0]
  }
  return null
}

export default function RegistrationFormSelector(): ReactElement {
  const [showRegistrationForm, openRegistrationForm, closeRegistrationform] =
    useModal(false)
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)
  const { data: members, isLoading: loadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })
  return (
    <>
      <Dialog
        visible={showRegistrationForm}
        onHide={closeRegistrationform}
        header='Ficha médica'
      >
        <RegistrationForm member={getMember(members, selectedMemberId)} />
      </Dialog>
      <Dropdown
        placeholder='Ficha médica'
        options={members}
        value={selectedMemberId}
        loading={loadingMembers}
        optionLabel='name'
        optionValue='id'
        filter
        filterBy='dni,name'
        showClear
        onChange={(e) => {
          setSelectedMemberId(e.value as number)
          openRegistrationForm()
        }}
      />
    </>
  )
}
