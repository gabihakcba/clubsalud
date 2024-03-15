import { type ReactElement } from 'react'

export const DownArrow = (props: object): ReactElement => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={'2rem'}
    height={'2rem'}
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='#000'
      fillRule='evenodd'
      d='M12 3a1 1 0 0 1 1 1v13.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414L11 17.586V4a1 1 0 0 1 1-1Z'
      clipRule='evenodd'
    />
  </svg>
)
