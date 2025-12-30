import { useState } from 'react';

const Input = ({ type, name, id, label, value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = e => {
        if (!e.target.value) {
            setIsFocused(false);
        }
    };

    const commonProps = {
        name,
        id,
        className: 'input',
        value,
        onChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        required: true,
        'aria-label': label,
    };

    return (
        <div className={`input-container ${isFocused || value ? 'focus' : ''}`}>
            {type === 'textarea' ? (
                <textarea {...commonProps} rows='5' />
            ) : (
                <input {...commonProps} type={type} />
            )}

            <label htmlFor={id}>{label}</label>
            <span>{label}</span>
        </div>
    );
};

export default Input;
