'use client'

import { type ReactElement } from 'react'
import { type Member } from 'utils/types'
import RegistrationForm from 'components/medicalReports/RegistrationForm'
import { Accordion, AccordionTab } from 'primereact/accordion'
import ProfileMemberCard from './ProfileMemberCard'
import HealthPlanList from './HealtPlanList'

interface param {
  member: Member
}
export default function MemberCard({ member }: param): ReactElement {
  return (
    <>
      {member && (
        <Accordion className='w-full h-full'>
          <AccordionTab header='Datos principales'>
            <ProfileMemberCard member={member} />
          </AccordionTab>
          <AccordionTab header='Formulario de inscripción'>
            <RegistrationForm member={member} />
          </AccordionTab>
          <AccordionTab header='Obras Sociales'>
            <HealthPlanList member={member}/>
          </AccordionTab>
        </Accordion>
      )}
    </>
  )
}
