import { useState } from "react";
import { validateEmail, validateFullName, validateData } from "../../../utils/formRegexFunctions"
import "./FooterForm.css"
import { Button } from "react-bootstrap";

export default function App() {
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isFullNameValid, setIsFullNameValid] = useState(false)
    const [isDataValid, setIsDataValid] = useState(false)

    const handleFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fullName = event.target.value;
        if (!validateFullName(fullName)) {
            setIsFullNameValid(false);
        } else {
            setIsFullNameValid(true);
        }
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;

        if (!validateEmail(email)) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }
    }

    const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value;
        if (!validateData(data)) {
            setIsDataValid(false);
        } else {
            setIsDataValid(true);
        }
    }

    const handleBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (isEmailValid && isFullNameValid && isDataValid) {
            alert("Your details sent successfully, we will contact with you ASAP")
        } else if (!isFullNameValid) {
            alert("Please add a valid name")
        } else if (!isEmailValid) {
            alert("Please add a valid Email")
        } else if (!isDataValid) {
            alert("Please add a Subject/message")
        }
    };

    return (
        <div>
            <form className="form" >
                <input onChange={handleFullName} className="formFooterInputs" type="text" placeholder=" FullName" />
                <input onChange={handleEmail} className="formFooterInputs" type="email" placeholder=" Email" />
                <input onChange={handleData} className="formFooterInputs" type="text" placeholder=" Subject" />
                <input onChange={handleData} className="formFooterInputs messageInput" type="text" placeholder=" Message" /><br />
            </form>
            <div className="divBtn">
                <Button className="submitBtn btn btn-success" onClick={handleBtn}>Submit</Button>
            </div>
        </div>
    )
}