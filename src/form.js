import { useState } from "react";
import useInput from "./hooks/use-input";
import "./styles.css";

const images=[
    {path: "https://picsum.photos/536/354"},
    {path: "https://picsum.photos/536/355"},
    {path: "https://picsum.photos/536/356"},
    {path: "https://picsum.photos/536/357"},
    {path: "https://picsum.photos/536/358"},
    {path: "https://picsum.photos/536/359"},
];

export default function Form(){

    const [isImageSelected, setIsImageSelected]= useState(false);
    const [isImageTouched,setIsImageTouched]=useState(false);
    const [selectedImage,setSelectedImage]=useState(null);
    const [formData, setFormData]=useState(null);

    const imageNotSelected=isImageTouched && !isImageSelected;

    const {
        inputVal: name,
        isValid: nameIsValid,
        hasError: nameHasError,
        touchFn: nameTouchFn,
        handleBlur: handleNameBlur,
        handleChange: handleNameChange,
        reset: resetName,
    } = useInput((inputValue)=>inputValue.trim()!=="");

    const {
        inputVal: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        touchFn: emailTouchFn,
        handleBlur: handleEmailBlur,
        handleChange: handleEmailChange,
        reset: resetEmail,
    } = useInput((inputValue)=>inputValue.includes("@"));
    
    function handleSelect(image1){
        setIsImageSelected(true);
        setIsImageTouched(true);
        setSelectedImage(image1);
    }

    const {
        inputVal: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        touchFn: passwordTouchFn,
        handleBlur: handlePasswordBlur,
        handleChange: handlePasswordChange,
        reset: resetPassword,
    } = useInput((inputValue)=>inputValue.trim().length>6);

    let isFormValid=false;

    if(nameIsValid && emailIsValid && passwordIsValid && isImageSelected){
        isFormValid=true;
    }

    function handleSubmit(event){
        event.preventDefault();

        nameTouchFn();
        emailTouchFn();
        passwordTouchFn();
        setIsImageTouched(true);

        if(!isFormValid){
            return;
        }

        const form= new FormData(event.target);
        const updatedForm=Object.fromEntries(form);
        setFormData({...updatedForm, selectedImage});
        

        resetName();
        resetEmail();
        resetPassword();
        setSelectedImage(null);
        setIsImageSelected(false);
        setIsImageTouched(false);

    }
    return <>
        <form className="form" onSubmit={handleSubmit} >
        <div className={`input-grp ${nameHasError ? "invalid" : ""}`}>
            <label htmlFor="name">Name</label>
            <input type="text" value={name} id="name" name="name" onBlur={handleNameBlur} onChange={handleNameChange} />
            {nameHasError && <p className="err">Enter valid name!</p>}
        </div>
        <div className="input-grp">
            <label>Select an Image</label>
            <ul className="images-list">
                {images.map((image)=>{
                    return <li key={image.path} onClick={()=>handleSelect(image)}>
                        <img className={`${selectedImage?.path===image.path ? "selected" : ""}`} src={image.path}/>
                    </li>
                })}
            </ul>
            {imageNotSelected && <p className="err">Select one image!</p>}
        </div>
        <div className={`input-grp ${emailHasError ? "invalid" : ""}`}>
            <label htmlFor="email">Email</label>
            <input type="email" value={email} id="email" name="email" onBlur={handleEmailBlur} onChange={handleEmailChange}/>
            {emailHasError && <p className="err">Enter a valid email address!</p>}
        </div>
        <div className={`input-grp ${passwordHasError ? "invalid" : ""}`}>
            <label htmlFor="password">password</label>
            <input type="password" value={password} id="password" name="password" onBlur={handlePasswordBlur} onChange={handlePasswordChange}/>
            {passwordHasError && <p className="err">Enter a valid password!</p>}
        </div>
        <div className="actions">
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
        </div>
    </form>
    {formData && <div className="result">
        <p>Name: <span>{formData.name}</span></p>
        <div>
            <p>Image:</p>
            <img className="image" src={formData.selectedImage.path}/>
        </div>
        <p>Email: <span>{formData.email}</span></p>
        <p>Password: <span>{formData.password}</span></p>
    </div>}
    {!formData && <p>No FormData Submitted</p>}
    </>
}