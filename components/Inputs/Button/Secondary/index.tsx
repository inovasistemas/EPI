import classNames from 'classnames'

type SecondaryButtonProps = {
  name: string
  action: () => void
  text: string
  type: 'button' | 'submit' | 'reset'
}

export function SecondaryButton({
  name,
  action,
  text,
  type,
}: SecondaryButtonProps) {
  return (
    <button
      name={name}
      onClick={action}
      type={type}
      className='relative justify-center items-center bg-secondary hover:bg-secondaryDarker px-8 py-2.5 rounded-xl w-full font-medium text-black text-sm transition-all duration-300 select-none'
    >
      {text}
    </button>
  )
}
