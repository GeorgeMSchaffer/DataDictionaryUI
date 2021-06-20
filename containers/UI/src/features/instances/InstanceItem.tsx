import React from 'react'
import {IInstances} from 'features/types';

interface TodoProps {
	completed: boolean,
	text: string
}

export default function InterfaceListItem({ completed, text }: TodoProps) {
	return (
		<li
			style={{
				textDecoration: completed ? 'line-through' : 'none'
			}}
		>
			{text}
		</li>
	)
}