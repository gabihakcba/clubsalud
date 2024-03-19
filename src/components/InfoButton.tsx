import { type ReactElement } from 'react'
import { Permissions } from 'utils/types'
import { useModal } from 'utils/useModal'
import Image from 'next/image'
import Modal from './Modal'
import info from '../../public/info.svg'
import { lazy } from 'react'
const MemberCard = lazy(
  async () => await import('components/member/MemberCard')
)
const InstructorCard = lazy(
  async () => await import('components/instructor/InstructorCard')
)
interface params {
  id: number
  permissions: Permissions
}

function InfoButton({ id, permissions }: params): ReactElement {
  const [infoM, openInfo, closeInfo] = useModal(false)

  return (
    <div className='block hover:bg-blue-600'>
      <button onClick={openInfo}>
        <Image
          src={info}
          width={30}
          height={30}
          alt=''
        ></Image>
      </button>
      <Modal
        isOpen={infoM}
        closeModal={closeInfo}
      >
        <MemberCard
          id={id}
          closeModal={closeInfo}
        ></MemberCard>
        <InstructorCard
          id={id}
          closeModal={closeInfo}
        ></InstructorCard>
        {permissions === Permissions.ADM && <p>Administrador</p>}
        {permissions === Permissions.OWN && <p>Propietario</p>}
        {permissions === Permissions.OTHER && <p>Otro</p>}
      </Modal>
    </div>
  )
}
export default InfoButton
