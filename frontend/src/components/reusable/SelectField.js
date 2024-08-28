import React from 'react';

const SelectField = ({ label, options, onChange, value }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                className="text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={onChange}
                value={value}
            >
                <option className="text-sm font-semibold" value="">Select an option</option>
                {options.map((option, index) => (
                    <option  className="text-sm font-semibold" key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
