import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core';

import './styles.css'

interface Props {
    name: string,
    step?: number,
    label?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const NumberInput: React.FC<InputProps> = ({name, step = 0.01, label, className, ...rest}) => {
    const inputRef = useRef(null);
	const { fieldName, defaultValue, registerField } = useField(name);
	
	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
    }, [fieldName, registerField]);
    
    function handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
        const acceptedKeys = [
            '0','1','2','3','4','5',
            '6','7','8','9',',',
            'Backspace','Delete',
            'ArrowLeft','ArrowRight',
            'Home','End'
        ]
        if (!acceptedKeys.includes(evt.key)) evt.preventDefault()
    }

    return label ? (
        <div>
            <label htmlFor={fieldName}>{label}</label>
            <input className={`numberinput ${className}`}
                defaultValue={defaultValue}
                type="number"
                ref={inputRef}
                step={step.toString()}
                onKeyDown={handleKeyDown}
                {...rest}
            />
        </div>
    ) : (
        <input className={`numberinput ${className}`}
            defaultValue={defaultValue}
            type="number"
            ref={inputRef}
            step={step.toString()}
            onKeyDown={handleKeyDown}
            {...rest}
        />
    )
}

export default NumberInput