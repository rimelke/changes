import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core';

interface Props {
    name: string,
    label?: string,
    items: {
        key: string | number,
        label: string,
        value: string | number
    }[]
}

type InputProps = JSX.IntrinsicElements['select'] & Props;

const Select: React.FC<InputProps> = ({name, label, items, ...rest}) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField } = useField(name);
    
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <div>
            <label htmlFor={fieldName}>{label}</label>
            <select id={fieldName} ref={inputRef} defaultValue={defaultValue} {...rest}>
                <option value="" disabled>Selecione um grupo...</option>
                {items.map(item => (
                    <option key={item.key} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    )
}

export default Select