'use client'

type TextAreaProps = {
  label?: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  required: boolean
  value?: string
}

export function TextArea({
                           value = '',
                           onChange,
                           name,
                           label,
                           required = false,
                         }: TextAreaProps) {
  return (
    <div
      className="group relative flex items-center bg-[--backgroundSecondary] border-box rounded-xl outline outline-transparent focus-within:outline-[--primaryColor] focus-within:outline-2 h-full transition-all duration-300">
      <div className="relative flex items-center w-full h-full">
        <textarea
          id={name}
          name={name}
          className="peer block bg-transparent px-[12px] pt-[23px] pb-[7px] rounded focus:outline-none w-full h-full font-normal text-[--textSecondary] text-sm appearance-none resize-none"
          placeholder=" "
          value={value}
          onChange={onChange}
        />
        <label
          htmlFor={name}
          className="top-2 peer-focus:top-2 peer-placeholder-shown:top-1/2 left-1 absolute bg-transparent px-2 peer-focus:px-2 text-[--labelPrimary] peer-focus:text-[--primaryColor] text-base scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transition-all -translate-y-1 peer-focus:-translate-y-1 peer-placeholder-shown:-translate-y-1/2 transform"
        >
          {label}
        </label>
        {required && (
          <label
            htmlFor={name}
            className="hidden peer-focus:hidden peer-placeholder-shown:block top-2 right-1 absolute px-2 text-red-500 text-sm duration-300"
          >
            *
          </label>
        )}
      </div>
    </div>
  )
}
