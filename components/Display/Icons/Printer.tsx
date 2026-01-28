import classNames from 'classnames'

type PrinterIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function PrinterIcon({ size, stroke, strokeWidth = 2 }: PrinterIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      viewBox="0 0 24 24"
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d="M7.354 18c-2.123 0-3.185 0-3.94-.453a3.043 3.043 0 01-1.15-1.223c-.392-.77-.287-1.787-.075-3.822.176-1.698.264-2.547.698-3.171.285-.41.67-.745 1.121-.977C4.695 8 5.582 8 7.354 8h9.292c1.772 0 2.659 0 3.346.354.451.232.836.567 1.121.977.434.624.522 1.473.698 3.171.212 2.035.317 3.053-.076 3.822a3.043 3.043 0 01-1.148 1.223C19.83 18 18.768 18 16.646 18"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
      />
      <path
        d="M17 8V6c0-1.886 0-2.828-.586-3.414C15.828 2 14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586C7 3.172 7 4.114 7 6v2M13.989 16H10.01c-.685 0-1.028 0-1.32.109a1.874 1.874 0 00-.945.8c-.168.281-.251.642-.417 1.363-.26 1.128-.39 1.691-.301 2.143.117.602.484 1.112.995 1.382.382.203.918.203 1.988.203h3.978c1.07 0 1.606 0 1.988-.203.51-.27.878-.78.995-1.382.089-.452-.041-1.015-.3-2.143-.167-.72-.25-1.082-.418-1.362a1.874 1.874 0 00-.946-.801C15.017 16 14.674 16 13.988 16z"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M18 12h.009"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
