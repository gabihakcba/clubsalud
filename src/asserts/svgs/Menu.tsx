import { type ReactElement } from 'react'

export const Menu = (props: object): ReactElement => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={'2rem'}
    height={'2rem'}
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 6h16M4 12h16M4 18h16'
    />
  </svg>
)
