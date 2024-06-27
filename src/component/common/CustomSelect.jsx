import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CustomSelect = ({ name, onChange, placeholder, data, defaultValue }) => {
    const handleChange = (selectedValue) => {
        console.log('name:', name, 'value:', selectedValue);
        onChange({ target: { name, value: selectedValue } });
    };

    return (
        <Select
            style={{
                width: '100%',
                marginBottom: '4px',
                fontSize: 'small'
            }}
            placeholder={placeholder}
            onChange={handleChange}
            defaultValue={data[0].value}
        >
            {data && data.map(option => (
                <Option key={option.value} value={option.value} style={{ fontSize: 'small' }}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default CustomSelect;
