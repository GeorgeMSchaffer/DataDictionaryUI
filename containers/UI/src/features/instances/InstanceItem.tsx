import React from 'react'
import {IInstance} from 'features/types';

interface TodoProps {
	completed: boolean,
	text: string
}

export default function InterfaceListItem({ completed, text }: TodoProps) {
	console.log('TODO PROPS', completed, text);
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