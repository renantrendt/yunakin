import GoogleCircleIcon from '@/assets/icons/GoogleCircleIcon'
import React from 'react'

interface GoogleButtonProps {
  onClick: () => void
}

const GoogleButton = ({ onClick }: GoogleButtonProps) => {
  return (
    <button
      className="flex justify-center gap-4 p-3 w-full    border-sleek-gray border-2 rounded-lg bg-white  text-black dark:text-white"
      onClick={onClick}
      type="button"
    >
      <GoogleCircleIcon width={24} height={24} />
      <p className='text-black dark:text-white '>Sign In with Google </p>
    </button>
  )
}

export default GoogleButton
