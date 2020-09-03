import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core';

interface Props {
    name: string,
    items: {
        key: string | number,
        label: string,
        value: string | number
    }[]
}

const InputList: React.FC<Props> = ({name, items, ...rest}) => {
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
        <>
            <datalist id={`inputlist-${name}`}>
                {items.map(item => (
                    <option key={item.key} value={item.value}>{item.label}</option>
                ))}
            </datalist>
            <input ref={inputRef} list={`inputlist-${name}`} name={name} {...rest}/>
        </>
    )
}

export default InputList