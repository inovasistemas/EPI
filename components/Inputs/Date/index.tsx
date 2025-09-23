import { ConfigProvider, DatePicker } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import classNames from 'classnames'
import type dayjs from 'dayjs'
import { Ubuntu } from 'next/font/google'

type DateInputProps = {
  start: dayjs.Dayjs
  calendarType?: 'day' | 'week'
  label?: string
  background?: string
}

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export function DateInput({
  start,
  calendarType = 'week',
  label,
  background = 'bg-[--backgroundSecondary]',
}: DateInputProps) {
  const { WeekPicker } = DatePicker

  return (
    <div className='max-h-[54px]'>
      <div
        className={classNames(background, [
          'group relative flex items-center border-box rounded-xl outline outline-transparent focus-within:outline-[--primaryColor] focus-within:outline-2 w-full h-[54px] text-[--labelPrimary] focus-within:text-[--primaryColor] transition-all duration-300',
        ])}
      >
        <div
          className={classNames(
            {
              'pt-4': label,
            },
            ['flex items-end w-full h-ful']
          )}
        >
          <ConfigProvider locale={ptBR}>
            {calendarType === 'week' && (
              <WeekPicker
                format='DD/MM/YYYY'
                nextIcon={false}
                prevIcon={false}
                suffixIcon={false}
                superNextIcon={false}
                superPrevIcon={false}
                allowClear={false}
                defaultValue={[start]}
                defaultOpen={false}
                className={classNames(
                  !ubuntu.className,
                  'w-full peer text-[1rem] placeholder:text-[--textSecondary] bg-transparent hover:bg-transparent focus-within:bg-transparent active:bg-transparent border-none focus-within:outline-none focus-within:ring-0 h-full'
                )}
              />
            )}
            {calendarType === 'day' && (
              <DatePicker
                format='DD/MM/YYYY'
                nextIcon={false}
                prevIcon={false}
                suffixIcon={false}
                superNextIcon={false}
                superPrevIcon={false}
                allowClear={false}
                defaultValue={[start]}
                defaultOpen={false}
                className={classNames(
                  !ubuntu.className,
                  'w-full peer placeholder:text-[--textSecondary] bg-transparent hover:bg-transparent focus-within:bg-transparent active:bg-transparent border-none focus-within:outline-none focus-within:ring-0 h-full'
                )}
              />
            )}
          </ConfigProvider>
          {label && (
            <label className='top-2 peer-focus:top-2 peer-placeholder-shown:top-1/2 left-1 absolute bg-transparent px-2 peer-focus:px-2 text-[--labelPrimary] peer-focus:text-[--primaryColor] text-base scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transition-all -translate-y-1 peer-focus:-translate-y-1 peer-placeholder-shown:-translate-y-1/2 transform'>
              {label}
            </label>
          )}
        </div>
      </div>
    </div>
  )
}
