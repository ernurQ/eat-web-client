import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type DataInputProps = {
	label: string
} & InputHTMLAttributes<HTMLInputElement>

export function DataInput({ label, ...inputProps }: DataInputProps) {
	return (
		<div>
			<label className='block text-sm font-medium text-gray-700 mb-1'>
				{label}
			</label>
			<input
				type={'text'}
				className='w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition'
				{...inputProps}
			/>
		</div>
	)
}

type DataTextareaProps = {
	label: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function DataTextarea({ label, ...props }: DataTextareaProps) {
	return (
		<div>
			<label className='block text-sm font-medium text-gray-700 mb-1'>
				{label}
			</label>
			<textarea
				className='w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition'
				{...props}
			/>
		</div>
	)
}
