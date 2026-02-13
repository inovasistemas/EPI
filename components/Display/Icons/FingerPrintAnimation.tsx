import classNames from 'classnames';

type FingerPrintIconProps = {
  size?: string;
  progress: number;
  strokeWidth?: number;
  started?: boolean;
};

export function FingerPrintAnimationIcon({
  size = 'w-12 h-12',
  progress,
  strokeWidth = 2,
  started = true,
}: FingerPrintIconProps) {
  const dashOffset = 100 - progress;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={classNames(size, 'fill-none')}
    >
      <g className="opacity-80 stroke-[--backgroundTertiary]">
        <path
          d="M18 12a6 6 0 10-12 0c0 3.314 1 5.5 3 8"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 21c-5.5-3.5-6-7.343-6-9a3 3 0 116 0 3 3 0 106 0 9 9 0 10-17.777 2M12 12c.5 5 5.5 7 5.5 7"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g 
        className={classNames(
          {
            'animate-fill': started
          },
          ["stroke-[--primaryColor] transition-all duration-500 ease-in-out"],
        )}
        style={{ 
          strokeDasharray: 100, 
          strokeDashoffset: dashOffset 
        }}
      >
        <path
          d="M18 12a6 6 0 10-12 0c0 3.314 1 5.5 3 8"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 21c-5.5-3.5-6-7.343-6-9a3 3 0 116 0 3 3 0 106 0 9 9 0 10-17.777 2M12 12c.5 5 5.5 7 5.5 7"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}