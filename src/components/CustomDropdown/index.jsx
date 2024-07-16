import React from 'react';
// import DropDownWrapper from '../wrapper';
import { Platform } from 'react-native';
import DropDownWrapper from '../DropDowns/wrapper';

const CustomDropdown = ({
    onChange = () => { },
    placeholder,
    disable,
    listData,
    value,
    isSearchable,
    style
}) => {
    const dropdownStyle =
        Platform.OS === 'android' ? { minHeight: 50, height: 50 } : {};
    return (
        <DropDownWrapper
            data={listData}
            search={isSearchable}
            placeholder={placeholder}
            dropdownStyle={{ ...dropdownStyle, ...style }}
            onChange={onChange}
            disable={disable}
            value={value}
        />
    );
};

export default CustomDropdown;


