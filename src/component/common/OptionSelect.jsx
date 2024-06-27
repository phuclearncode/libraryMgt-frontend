import React from 'react';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

const OptionSelect = ({ name, onChange, data, placeholder }) => {
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
    >
      {data.map(group => (
        <OptGroup key={group.label} label={group.label} style={{fontSize: 'small'}}>
          {group.options.map(option => (
            <Option key={option.value} value={option.value} style={{fontSize: 'small'}}>
              {option.label}
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
};

export default OptionSelect;
