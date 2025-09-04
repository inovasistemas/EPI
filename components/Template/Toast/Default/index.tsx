type ToastDefaultType = {
  text: string
  redirectTo: string
}

export function ToastDefault({ text, redirectTo }: ToastDefaultType) {
  const handleClick = () => {
    window.location.href = redirectTo
  }
  return (
    <div
      onClick={handleClick}
      className='flex items-center gap-2 bg-[--backgroundPrimary] shadow-lg p-4 border border-[--outlinePrimary] rounded-2xl cursor-pointer'
    >
      <div>
        <div className='text-[--textSecondary] text-sm select-none'>{text}</div>
      </div>
    </div>
  )
}
