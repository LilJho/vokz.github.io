import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

interface ISelectField {
    data: {
        label: string
        value: string
    }[],
    value?: string
    onChange?: (value: string) => void
    defaultValue?: string
}

const SelectField = ({ value, onChange, defaultValue, data }: ISelectField) => {
    return (
        <Select
            value={value}
            onValueChange={onChange}
            defaultValue={defaultValue}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={value} />
            </SelectTrigger>
            <SelectContent>
                {data?.map((items) => (
                    <SelectItem key={items.value} value={items.value}>
                        {items.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SelectField