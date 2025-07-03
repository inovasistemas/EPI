import classNames from 'classnames'

type NavActionProps = {
  action: (event: React.MouseEvent<HTMLButtonElement>) => void
  desktop: boolean
  icon: React.ReactElement
  mobile: boolean
  type: 'button' | 'submit' | 'reset'
}

export function NavAction({
  action,
  desktop,
  icon,
  mobile,
  type,
}: NavActionProps) {
  return (
    <button
      onClick={action}
      type={type}
      className={classNames(
        'active:scale-95 group relative justify-center items-center bg-[--backgroundSecondary] hover:bg-[--backgroundPrimary] rounded-lg w-8 h-8 text-zinc-200 transition z-[200]',
        {
          'lg:hidden flex': mobile === true && desktop === false,
          'hidden lg:flex': mobile === false && desktop === true,
          flex: mobile === true && desktop === true,
        }
      )}
    >
      {icon}
    </button>
  )
}
