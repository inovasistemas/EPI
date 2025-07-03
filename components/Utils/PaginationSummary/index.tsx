type PaginationSummaryProps = {
  from: number
  to: number
  total: number
}

export function PaginationSummary({ from, to, total }: PaginationSummaryProps) {
  const currentText = total > 0

  if (currentText) {
    return (
      <span className='text-black text-sm'>
        Exibindo{' '}
        <span className='font-semibold text-black'>
          {from}-{to}
        </span>{' '}
        de <span className='font-semibold text-black'>{total}</span>{' '}
        {total > 1 ? 'resultados' : 'resultado'}
      </span>
    )
  } else {
    return null
  }
}
