import Cleave from 'cleave.js/react'
import React, { Component } from 'react'

interface DocumentInputProps {
  name: string
  label?: string
  required?: boolean
  icon?: React.ReactElement
  onChange?: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

interface MyComponentState {
  customRawValue: string
}

class DocumentInput extends Component<DocumentInputProps, MyComponentState> {
  constructor(props: DocumentInputProps) {
    super(props)

    this.state = {
      customRawValue: '',
    }
  }

  onCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    this.setState({ customRawValue: value })

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  onCustomKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event)
    }
  }

  render() {
    const { name, label, required, icon } = this.props

    return (
      <div className='max-h-[52px]'>
        <div className='group relative flex items-center bg-transparent border-box rounded-xl outline outline-transparent focus-within:outline-2 focus-within:outline-primary transition-all duration-300'>
          {icon && <span className='mr-1 ml-3'>{icon}</span>}

          <div className='relative flex items-center w-full'>
            <Cleave
              id={name}
              options={{
                blocks: [],
                numericOnly: false,
              }}
              placeholder=''
              onChange={this.onCustomChange}
              onKeyDown={this.onCustomKeyDown}
              className='peer block bg-[--backgroundSecondary] px-[12px] pt-[23px] pb-[7px] rounded-xl focus:outline-none w-full font-normal text-[--textSecondary] text-base appearance-none'
              autoFocus
            />
            {label && (
              <label
                htmlFor={name}
                className='top-2 peer-focus:top-2 peer-placeholder-shown:top-1/2 left-1 z-10 absolute bg-transparent px-2 peer-focus:px-2 text-[--labelPrimary] peer-focus:text-[--textPrimary] text-base scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transition-all -translate-y-1 peer-focus:-translate-y-1 peer-placeholder-shown:-translate-y-1/2 transform'
              >
                {label}
              </label>
            )}
            {required && (
              <label
                htmlFor={name}
                className='hidden peer-focus:hidden peer-placeholder-shown:block top-2 right-1 z-10 absolute px-2 text-red-500 text-base duration-300'
              >
                *
              </label>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DocumentInput
