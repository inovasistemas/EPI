import classNames from 'classnames'

type PrimaryButtonProps = {
  name: string
  action: () => void
  text: string
  type: 'button' | 'submit' | 'reset'
  disabled: boolean
}

export function PrimaryButton({
  name,
  action,
  text,
  type,
  disabled,
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      name={name}
      onClick={action}
      type={type}
      className='relative justify-center items-center bg-primary hover:bg-primaryDarker disabled:bg-[--buttonPrimary] px-8 py-2.5 rounded-lg w-full font-medium text-white disabled:text-zinc-500 text-base transition-all duration-150 select-none'
    >
      {text}
    </button>
  )
}
