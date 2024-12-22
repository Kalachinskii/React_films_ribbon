import React, { useState } from "react";

export function Search({onSearch}) {
    const [value, setValue] = useState('');

    function changeHandler(e) {
        setValue(e.target.value);
        // с запозданием будут приходить данные
        // onSearch(value);
        // актуальное значение без запоздания
        onSearch(e.target.value);
    }

    return (
        <input onChange={changeHandler} value={value} className="search" type="text" placeholder="Search movies..." />
    );
}