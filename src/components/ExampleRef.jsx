import { forwardRef, useRef } from "react";

const InputText = forwardRef((props,ref) => {
    return(
        <div>

<input type="text" ref={ref}/>

        </div>
    )
});

const ExampleRef = () => {
    //no existe ese input
    const  inputFocus =useRef(null)

    const handleButtonClick = () => {

        console.log("Me diste click")

        inputFocus.current.focus();
}
    return(
        <div>
            <input type="text" ref={inputFocus}/>
            <button onClick={handleButtonClick}>Click ref</button>
        </div>
    )

 }

 export default ExampleRef;