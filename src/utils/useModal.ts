'use client'

import { useState } from 'react'
import { type Setter } from './types'

export const useModal = (
  initialValue: boolean = false
): [boolean, Setter, Setter] => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue)

  const openModal = (): void => {
    setIsOpen(true)
  }
  const closeModal = (): void => {
    setIsOpen(false)
  }

  return [isOpen, openModal, closeModal]
}
