import { ConfigProvider, DatePicker } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import classNames from 'classnames'
import type dayjs from 'dayjs'
import { Ubuntu } from 'next/font/google'

type DateInputProps = {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
}

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export function DateInput({ start, end }: DateInputProps) {
  const { RangePicker } = DatePicker

  return (
    <div className='max-h-[54px]'>
      <div className='group relative flex items-center bg-[--backgroundSecondary] border-box rounded-xl outline outline-transparent focus-within:outline-[--primaryColor] focus-within:outline-2 w-full h-[54px] text-[--labelPrimary] focus-within:text-[--primaryColor] transition-all duration-300'>
        <div className='flex items-end w-full h-full'>
          <ConfigProvider locale={ptBR}>
            <RangePicker
              format='DD/MM/YYYY'
              separator={false}
              nextIcon={false}
              prevIcon={false}
              suffixIcon={false}
              superNextIcon={false}
              superPrevIcon={false}
              placeholder={['Inicial', 'Final']}
              allowClear={false}
              defaultValue={[start, end]}
              className={classNames(
                !ubuntu.className,
                'peer text-[1rem] placeholder:text-[--textSecondary] bg-transparent hover:bg-transparent focus-within:bg-transparent active:bg-transparent border-none focus-within:outline-none focus-within:ring-0 h-full'
              )}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}
