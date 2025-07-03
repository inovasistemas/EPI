import classnames from 'classnames'

type MeatIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function MeatIcon({ fill, height, width, stroke }: MeatIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-300')}
      viewBox='0 0 22 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.428 7.585c.78 5.05-4.984 7.4-8.65 8.4-4.166 1.135-8.184.763-9.91-4.943a8.792 8.792 0 01.127-5.426C3.143 2.402 5.99.773 8.643 1.812L13 3.5c3.286 1.286 5.991-1.397 7.428 4.085zM8.5 2.5c1.293 6 .526 9.11-4 12.5M9 10.257c2-.457 5.5-.685 8 2.743'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={classnames(stroke)}
      />
    </svg>
  )
}
