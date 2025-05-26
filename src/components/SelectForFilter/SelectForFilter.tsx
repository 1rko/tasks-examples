import {ChangeEvent} from "react";


type Props = {
    selectName: string
    value: string
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
    options: string[]
    disabled?: boolean
};
export const SelectForFilter = ({
                                    selectName,
                                    options,
                                    value,
                                    handleChange,
                                    disabled
                                }: Props) => {
    return (
        <select
            name={selectName}
            value={value}
            onChange={handleChange}
            disabled={disabled}
        >
            <option value="">All Topics</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};