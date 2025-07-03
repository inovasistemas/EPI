import classnames from 'classnames'

type SettingIconProps = {
  fill: string
  height: string
  width: string
}

export function SettingIcon({ fill, height, width }: SettingIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-150')}
      viewBox='0 0 18 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 7.254a4 4 0 012.039-3.486l5-2.812a4 4 0 013.922 0l5 2.812A4 4 0 0118 7.254v5.491a4 4 0 01-2.039 3.487l-5 2.812a4 4 0 01-3.922 0l-5-2.812A4 4 0 010 12.746V7.253zM5.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z'
        className={classnames(fill)}
      />
    </svg>
  )
}
