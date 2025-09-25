import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

export function Countdown({date}: CountdownProps) {
  return (
    <FlipClockCountdown
      to={new Date(date)}
      labels={['Dias', 'Horas', 'Minutos', 'Segundos']}
      labelStyle={{ fontSize: 14, color: 'var(--textSecondary)' }}
      digitBlockStyle={{ width: 40, height: 60, fontSize: 48, color: 'var(--textSecondary)' }}
      separatorStyle={{ size: 12, color: 'var(--fcc-background)' }}
      duration={0.5}
      hideOnComplete={false}
      onComplete={() => null}
    >
    </FlipClockCountdown>
  )
}