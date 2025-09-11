'use client'

import classNames from 'classnames'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.br'
import { InputOptionsMap, MaskedInputProps } from './types'
import 'cleave.js/dist/addons/cleave-phone.br'

export function MaskedInput({
															name,
															label,
															required = false,
															icon,
															value = '',
															type = 'text',
															onChange,
															position = 'left',
															actionButton,
															onKeyDown,
															textTransform = '',
														}: MaskedInputProps) {
	const options = InputOptionsMap[type]

	return (
		<div className="max-h-[52px]">
			<div
				className="group relative flex items-center bg-[--backgroundSecondary] border-box rounded-xl outline outline-transparent focus-within:outline-[--primaryColor] focus-within:outline-2 transition-all duration-300">
				{position === 'left' && icon && (
					<span className="mr-1 ml-3">{icon}</span>
				)}

				<div className="relative flex items-center w-full">
					<Cleave
						id={name}
						name={name}
						className={classNames(
							'peer block bg-[--backgroundSecondary] px-[12px] pt-[23px] pb-[7px] rounded-xl outline-none focus:outline-none w-full font-normal text-[--textSecondary] text-base transition-all duration-300 appearance-none',
							textTransform,
						)}
						options={options}
						placeholder=" "
						value={value ?? ''}
						onChange={onChange}
						onKeyDown={onKeyDown}
					/>
					<label
						htmlFor={name}
						className="top-2 peer-focus:top-2 peer-placeholder-shown:top-1/2 left-1 z-10 absolute bg-transparent px-2 peer-focus:px-2 text-[--labelPrimary] peer-focus:text-[--primaryColor] text-base scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transition-all -translate-y-1 peer-focus:-translate-y-1 peer-placeholder-shown:-translate-y-1/2 transform"
					>
						{label}
					</label>
					{required && (
						<label
							htmlFor={name}
							className="hidden peer-focus:hidden peer-placeholder-shown:block top-2 right-1 z-10 absolute px-2 text-red-500 text-base duration-300"
						>
							*
						</label>
					)}

					{position === 'right' && icon && (
						<button type="button" onClick={actionButton} className="mr-3">
							{icon}
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
