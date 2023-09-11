import { useState } from "react";

export default function useInput(validateFn){
    const [inputVal,setInputVal]=useState("");
    const [isTouched,setIsTouched]=useState(false);

    const isValid=validateFn(inputVal);
    const hasError=!isValid && isTouched;

    function touchFn(){
        setIsTouched(true);
    }

    function handleBlur(){
        setIsTouched(true);
    }

    function handleChange(event){
        setIsTouched(true);
        setInputVal(event.target.value);
    }

    function reset(){
        setInputVal("");
        setIsTouched(false);
    }

    return {
        inputVal,
        isValid,
        hasError,
        touchFn,
        handleBlur,
        handleChange,
        reset,
    }
}