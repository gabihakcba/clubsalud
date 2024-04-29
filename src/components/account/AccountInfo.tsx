'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
// import MemberCard from 'components/member/MemberCard'
import { useRouter } from 'next/navigation'
import { deleteAccount } from 'queries/accounts'
import { type Account } from 'utils/types'
import { useModal } from 'utils/useModal'
import { CreateAccountForm } from './CreateAccountForm'
import InstructorCard from 'components/instructor/InstructorCard'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Dialog } from 'primereact/dialog'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { type ReactElement } from 'react'
import MemberCard from 'components/member/MemberCard'

interface params {
  account: Account | undefined
}
export default function AccountInfo({ account }: params): ReactElement {
  const [isOpenEdit, openEdit, closeEdit] = useModal(false)
  const router = useRouter()
  const query = useQueryClient()

  const { mutate: delete_ } = useMutation({
    mutationFn: async (id: number) => {
      await deleteAccount(id)
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['acc'] })
      router.push('/admin/accounts')
    }
  })
  return (
    <div className='flex flex-column gap-2 w-full h-full'>
      <div className='flex flex-row align-items-center gap-4'>
        <h2 className='text-2xl'>Cuenta</h2>
        <Button
          onClick={openEdit}
          label='Editar'
          size='small'
          outlined
          icon='pi pi-pen-to-square'
          iconPos='right'
        />
        <Button
          onClick={() => {
            confirmDialog({
              message: 'Confirmación de acción',
              header: 'Eliminar cuenta',
              icon: 'pi pi-info-circle',
              defaultFocus: 'reject',
              acceptClassName: 'p-button-danger',
              acceptLabel: 'Si',
              accept: () => {
                delete_(Number(account?.id))
              }
            })
          }}
          label='Eliminar'
          size='small'
          outlined
          icon='pi pi-trash'
          iconPos='right'
          severity='danger'
        />
        <Dialog
          header='Editar Cuenta'
          visible={isOpenEdit}
          onHide={closeEdit}
        >
          <CreateAccountForm account={account}></CreateAccountForm>
        </Dialog>
        <ConfirmDialog />
      </div>
      <div className='flex align-items-center gap-2'>
        <label className='min-w-[10rem]'>Usuario: </label>
        <p>{account?.username}</p>
      </div>
      <div className='flex align-items-center gap-2'>
        <label className='min-w-[10rem]'>Permisos: </label>
        <div className='p-1 flex gap-2'>
          {account?.permissions.map((permission, index) => (
            <p key={index}>{permission}</p>
          ))}
        </div>
      </div>
      <Divider />
      <h3>Perfiles Asociados</h3>
      <div className='flex flex-column md:flex-row w-full'>
        {account?.instructorAccount && (
          <Accordion className='w-full h-full'>
            <AccordionTab header='Perfil de Profesor'>
              <InstructorCard
                instructor={account.instructorAccount}
              ></InstructorCard>
            </AccordionTab>
          </Accordion>
        )}
        {account?.memberAccount && (
          <Accordion className='w-full h-full'>
            <AccordionTab header='Perfil de Alumno'>
              <MemberCard member={account.memberAccount}></MemberCard>
            </AccordionTab>
          </Accordion>
        )}
      </div>

      {/* <div className='flex flex-column gap-2'>
        <Divider />
        Perfiles asociados
        {account?.memberAccount && (
          <div className='flex flex-column gap-2 w-full align-items-center'>
            <button
              className='bg-gray-200 rounded w-full p-2 text-start'
              onClick={() => {
                changeMember((prev) => !prev)
              }}
            >
              Alumno: {account.memberAccount.name}
            </button>
            {member && (
              <div className='w-full'>
                <MemberCard member={account.memberAccount}></MemberCard>
              </div>
            )}
          </div>
        )}
        {account?.instructorAccount && (
          <div className='flex flex-column gap-2 w-full align-items-center'>
            <Button
              onClick={() => {
                changeInstructor((prev) => !prev)
              }}
              label={`Profesor: ${account.instructorAccount.name}`}
            />
            {instructor && (
              <div className='w-full'>
                <InstructorCard
                  instructor={account.instructorAccount}
                ></InstructorCard>
              </div>
            )}
          </div>
        )}
        <hr />
      </div> */}
    </div>
  )
}
