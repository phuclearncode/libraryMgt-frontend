import React from 'react';
import { Select } from 'antd';
import '../../assets/style/Style.css';

const { Option } = Select;

const MultipleSelect = ({ name , onChange, options, placeholder, mode }) => {
  const handleChange = (selectedValue) => {
    console.log('name:', name, 'value:', selectedValue);
    onChange({ target: { name, value: selectedValue } });
};

  return (
      <Select
        mode={mode}
        style={{
          width: '100%',
          marginBottom: '4px',
          fontSize: 'small'
        }}
        placeholder={placeholder}
        onChange={handleChange}
        tokenSeparators={[',']}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value} style={{ fontSize: 'small' }}>
            {option.label}
          </Option>
        ))}
      </Select>
  );
};

export default MultipleSelect;
