import React from 'react'

function Button({ children, ...props }) {
  return (
    <button className='px-4 py-2 text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-400' {...props}>{children}</button>
  )
}

export default Button