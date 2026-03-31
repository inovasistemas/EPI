import classNames from 'classnames'

type PasswordInputAnimationProps = {
   size?: string;
  progress: number;
  strokeWidth?: number;
  started?: boolean;
}

export function PasswordInputAnimationIcon({
  size = 'w-12 h-12',
  progress,
  strokeWidth = 2,
  started = true,
}: PasswordInputAnimationProps) {
  const dashOffset = 100 - progress;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      viewBox="0 0 24 24"
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <g className="opacity-80 stroke-[--backgroundTertiary]">
        <path
          d="M9.936 13H7c-1.87 0-2.804 0-3.5-.402a3 3 0 01-1.098-1.099C2 10.803 2 9.87 2 8c0-1.869 0-2.803.402-3.5A3 3 0 013.5 3.402C4.196 3 5.13 3 7 3h7c2.828 0 4.243 0 5.121.878C20 4.757 20 6.171 20 9M17.5 21a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.128 8h-.125M7.127 8h-.125m8.125 0h-.125m-3.75 0a.25.25 0 11-.5 0 .25.25 0 01.5 0zm-4 0a.25.25 0 11-.5 0 .25.25 0 01.5 0zm8 0a.25.25 0 11-.5 0 .25.25 0 01.5 0zM15.75 17s.5 0 1 1c0 0 1.088-2 2.5-2.5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g
        className={classNames(
          {
            'animate-fill': started,
          },
          ['stroke-[--primaryColor] transition-all duration-500 ease-in-out'],
        )}
        style={{
          strokeDasharray: 100,
          strokeDashoffset: dashOffset,
        }}
      >
        <path
          d="M9.936 13H7c-1.87 0-2.804 0-3.5-.402a3 3 0 01-1.098-1.099C2 10.803 2 9.87 2 8c0-1.869 0-2.803.402-3.5A3 3 0 013.5 3.402C4.196 3 5.13 3 7 3h7c2.828 0 4.243 0 5.121.878C20 4.757 20 6.171 20 9M17.5 21a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.128 8h-.125M7.127 8h-.125m8.125 0h-.125m-3.75 0a.25.25 0 11-.5 0 .25.25 0 01.5 0zm-4 0a.25.25 0 11-.5 0 .25.25 0 01.5 0zm8 0a.25.25 0 11-.5 0 .25.25 0 01.5 0zM15.75 17s.5 0 1 1c0 0 1.088-2 2.5-2.5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}