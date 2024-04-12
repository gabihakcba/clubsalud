'use client'

import { type ReactElement } from 'react'
// import MemberCard from 'components/member/MemberCard'

// const get = async (setMember: Setter, id: number): Promise<void> => {
//   const response = await getMemberById(id)
//   if (response._.status === 200) {
//     console.log(typeof response.data.inscriptionDate)
//     setMember(response.data)
//   } else {
//     console.log(response)
//   }
// }

interface param {
  params: {
    id: string
  }
}
export default function Account({ params }: param): ReactElement {
  return <div>{/* <MemberCard id={Number(params.id)}></MemberCard> */}</div>
}
