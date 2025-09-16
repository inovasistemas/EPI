type MaskedInputTypes =
  | 'cpf'
  | 'rg'
  | 'date'
  | 'text'
  | 'zipcode'
  | 'phone'
  | 'money'
  | 'number'

export type MaskedInputProps = {
  name: string
  label?: string
  required: boolean
  icon?: React.ReactElement
  value?: string | number
  type?: MaskedInputTypes
  reveal?: boolean
  position?: string
  maxLength?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  actionButton?: () => void
  textTransform?: string
}

interface InputOptions {
  numericOnly?: boolean
  date?: boolean
  phone?: boolean
  delimiter?: string
  delimiters?: string[]
  blocks?: number[]
  datePattern?: string[]
  phoneRegionCode?: string
  numeralDecimalMark?: string
  prefix?: string
  numeralDecimalScale?: number
  numeral?: boolean
  numeralThousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none'
  rawValueTrimPrefix?: boolean
  numeralPositiveOnly?: boolean
}

export const InputOptionsMap: Record<MaskedInputTypes, InputOptions> = {
  cpf: {
    numericOnly: true,
    delimiters: ['.', '.', '-'],
    blocks: [3, 3, 3, 2],
  },
  rg: {
    numericOnly: true,
    delimiters: ['.', '.', '-'],
    blocks: [2, 3, 3, 1],
  },
  date: {
    date: true,
    delimiter: '/',
    datePattern: ['d', 'm', 'Y'],
  },
  text: {},
  zipcode: {
    numericOnly: true,
    delimiter: '-',
    blocks: [5, 3],
  },
  phone: {
    phone: true,
    phoneRegionCode: 'BR',
  },
  money: {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    prefix: 'R$ ',
    numeralDecimalScale: 2,
    numeralDecimalMark: ',',
    delimiter: '.',
  },
  number: {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    numeralDecimalScale: 2,
    numeralDecimalMark: ',',
    delimiter: '.',
  },
}
