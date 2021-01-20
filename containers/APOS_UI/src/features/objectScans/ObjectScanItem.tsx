import React from 'react'
import {IObjectScanResult} from 'features/types';

interface TodoProps {
	completed: boolean,
	text: string
}

export default function TodoListItem({ completed, text }: TodoProps) {
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