import { useState, type ReactElement } from 'react'
import { Permissions, type Setter } from 'utils/types'
import menu from '../../../public/menu.svg'
import update from '../../../public/update.svg'
import Image from 'next/image'
import { CreateAccountForm } from './CreateAccountForm'
import { useModal } from 'utils/useModal'
import Modal from 'components/Modal'
import { useQueryClient } from '@tanstack/react-query'
import { ACCOUNTTYPE } from 'utils/const'
import { CreateMemberForm } from 'components/member/CreateMemberForm'
import { CreateInstructorForm } from 'components/instructor/CreateInstructorForm'

interface params {
  setFilterName: Setter
  setFilterPermissions: Setter
}
export default function AccountTopbar({
  setFilterName,
  setFilterPermissions
}: params): ReactElement {
  const [createAcc, openAcc, closeAcc] = useModal(false)
  const [createMem, openMem, closeMem] = useModal(false)
  const [createIns, openIns, closeIns] = useModal(false)
  const [topbar, setTopbar] = useState(false)
  const query = useQueryClient()
  return (
    <div className='flex flex-row gap-2'>
      <button
        onClick={() => {
          setTopbar((prev: boolean) => !prev)
        }}
      >
        <Image
          width={38}
          height={38}
          src={menu}
          alt='|||'
        ></Image>
      </button>
      {topbar && (
        <div className='pt-2 flex flex-col md:flex-row md:items-center md:pt-0 gap-4 bg-white md:shadow-none shadow rounded '>
          <div className='flex gap-5 justify-evenly md:justify-center flex-row'>
            {/* <button onClick={openForm}>
              <Image
                src={create_}
                alt='C'
                width={30}
                height={30}
              ></Image>
            </button> */}
            <select
              className='p-2 mx-4 mb-4 md:mb-0 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name=''
              id=''
              defaultValue='Crear'
              onClick={(e: any) => {
                switch (e.target.value) {
                  case ACCOUNTTYPE.ACCOUNT.toString():
                    openAcc()
                    break
                  case ACCOUNTTYPE.MEMBER.toString():
                    openMem()
                    break
                  case ACCOUNTTYPE.INSTRUCTOR.toString():
                    openIns()
                    break
                  default:
                    break
                }
              }}
            >
              <option value='create'>Crear</option>
              <option value={ACCOUNTTYPE.ACCOUNT}>Cuenta</option>
              <option value={ACCOUNTTYPE.MEMBER}>Alumno</option>
              <option value={ACCOUNTTYPE.INSTRUCTOR}>Instructor</option>
            </select>

            <Modal
              isOpen={createAcc}
              closeModal={closeAcc}
            >
              <CreateAccountForm
                data={null}
                closeModal={closeAcc}
              ></CreateAccountForm>
            </Modal>

            <Modal
              isOpen={createMem}
              closeModal={closeMem}
            >
              <CreateMemberForm closeModal={closeMem}></CreateMemberForm>
            </Modal>

            <Modal
              isOpen={createIns}
              closeModal={closeIns}
            >
              <CreateInstructorForm
                closeModal={closeIns}
              ></CreateInstructorForm>
            </Modal>

            <button
              onClick={async () => {
                console.log('update', query)
                await query.refetchQueries({
                  queryKey: ['acc']
                })
              }}
              className=''
              type='button'
            >
              <Image
                alt=''
                src={update}
                width={30}
                height={30}
              />
            </button>
          </div>
          <input
            onChange={(e) => {
              setFilterName(e.target.value)
            }}
            autoComplete='off'
            defaultValue={''}
            name='password'
            className='p-2 mx-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            type='text'
            placeholder={'Nombre de usuario'}
          ></input>
          <select
            onChange={(e) => {
              setFilterPermissions(e.target.value as Permissions)
            }}
            name='permissions'
            id='permissions'
            className='p-2 mx-4 mb-4 md:mb-0 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value={Permissions.OWN}>Propietario</option>
            <option value={Permissions.ADM}>Administrador</option>
            <option value={Permissions.INS}>Instructor</option>
            <option value={Permissions.MEM}>Alumno</option>
            <option value={Permissions.OTHER}>Otros</option>
            <option
              value=''
              selected
            >
              Sin filtro
            </option>
          </select>
        </div>
      )}
    </div>
  )
}
