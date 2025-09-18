import React, { useRef, useState } from 'react'
import { ImageIcon } from '../Display/Icons/Image'
import classNames from 'classnames'
import { TrashIcon } from '../Display/Icons/Trash'

type ImageUploadProps = {
  file: File | null
  setFile: (file: File | null) => void
  picture?: string | null
}

export default function ImageUpload({
  file,
  setFile,
  picture = null,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleButtonClick = () => {
    if (preview) {
      setPreview(null)
    } else {
      inputRef.current?.click()
    }
  }

  React.useEffect(() => {
    if (picture) {
      setPreview(picture)
    }
  }, [picture])

  return (
    <form className='flex flex-col gap-4'>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden p-2 border'
      />
      <button
        type='button'
        onClick={handleButtonClick}
        className={classNames(
          {
            'border-[--border] border-2 border-dashed': !preview,
            'border-[--border] border-2': preview,
          },
          [
            'group relative flex justify-center overflow-hidden items-center bg-[--backgroundSecondary] rounded-2xl w-32 aspect-square transition-all duration-300',
          ]
        )}
      >
        {preview && (
          <span className='absolute opacity-0 group-hover:opacity-100 transition-all'>
            <TrashIcon size='size-8' stroke='stroke-white' strokeWidth={2} />
          </span>
        )}

        {!preview && (
          <span className='group-hover:opacity-70 transition-all'>
            <ImageIcon
              size='size-10'
              stroke='stroke-[--buttonSecondary]'
              strokeWidth={1.5}
            />
          </span>
        )}

        {preview && (
          <img
            src={preview}
            alt='Preview'
            className='group-hover:opacity-30 w-full h-full object-cover transition-all'
            style={{ aspectRatio: '1 / 1' }}
          />
        )}
      </button>
    </form>
  )
}
