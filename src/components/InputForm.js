import React, { useState } from 'react';

export const InputForm = (props) => {
    const [value, setValue] = useState('');

    function handleChange(e) {
        if (value.length === 4) {
            document.getElementById(props.nextInputId).focus();
        }
        setValue(e.target.value);
    }

    function handleFocusChange() {
        if (value.length === 0) {
            document.getElementById(props.prevInputId).focus();
        }
    }

    function handleKeyPress(event) {
        const key = event.keyCode || event.which;
        const keyValue = String.fromCharCode(key);
        if (!/[0-9]/.test(keyValue)) {
            event.preventDefault();
        }
    }

    function handleKeyUp(event) {
        if (event.key === "Backspace" && value.length === 4) {
            setValue(value.slice(0, -1));
        }
    }

    return (
        <input
            type="number"
            name="number"
            value={value}
            id={props.inputId}
            className="form-control w-25 mr-3"
            onChange={handleChange}
            onFocus={handleFocusChange}
            onKeyPress={handleKeyPress}
            onKeyUp={handleKeyUp}
        />
    );
}



