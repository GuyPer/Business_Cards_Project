import React, { useContext, useEffect, useState } from 'react';
import './Signup.css';
import Button from 'react-bootstrap/esm/Button';
import { validatePassword, validatePhone, validateEmail, validateImage } from "../../utils/formRegexFunctions"
import AppFormInput from '../../components/AppFormInput/AppFormInput';
import { ThemeContext } from '../../context/ThemeContext';
import { ToastsContext } from '../../context/ToastsContext';
import { useNavigate } from 'react-router-dom';
import { doPostUser } from '../../Services/UsersService';

export default function Signup() {

    const theme = useContext(ThemeContext);
    const toast = useContext(ToastsContext);
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isImageValid, setIsImageValid] = useState(true);
    const [isBusinessCostumer, seIsBusinessCostumer] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: {
            first: "",
            middle: "",
            last: ""
        },
        phone: "",
        email: "",
        password: "",
        image: {
            url: "",
            alt: ""
        },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0
        },
        isBusiness: false
    });

    const postUser = async () => {
        try {
            let { error, result } = await doPostUser(formData);
            if (result) {
                toast?.addToast("You registered successfully!");
                navigate('/login');
            } else {
                throw new Error(error);
            }
        } catch (error) {
            alert(`Registration failed. ${error}.`);
        }
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordInput = event.target.value;
        if (!validatePassword(passwordInput)) {
            setIsPasswordValid(false)
        } else {
            setIsPasswordValid(true);
            setFormData({ ...formData, password: passwordInput })
        }
    }
    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneInput = event.target.value;
        if (!validatePhone(phoneInput)) {
            setIsPhoneValid(false);
        } else {
            setIsPhoneValid(true);
            setFormData({ ...formData, phone: phoneInput });
        }
    }
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailInput = event.target.value;
        if (!validateEmail(emailInput)) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
            setFormData({ ...formData, email: emailInput });
        }
    }
    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageInput = event.target.value;
        if (imageInput !== undefined && !validateImage(imageInput)) {
            setIsImageValid(false);
            return;
        } else {
            setIsImageValid(true);
            setFormData({ ...formData, image: { ...formData.image, url: imageInput } })
        }
    }

    const handleInput = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let input: string | number = event.target.value
        if (type === "first" || type === "middle" || type === "last") {
            setFormData({ ...formData, name: { ...formData.name, [type]: input } });
        } else if (type === "state" || type === "country" || type === "city" || type === "street") {
            setFormData({ ...formData, address: { ...formData.address, [type]: input } });
        } else if (type === "houseNumber" || type === "zip") {
            input = parseInt(input);
            setFormData({ ...formData, address: { ...formData.address, [type]: input } });
        } else if (type === "alt") {
            setFormData({ ...formData, image: { ...formData.image, [type]: input } })
        } else {
            setFormData({ ...formData, [type]: input })
        }
    }

    const handleBusinessCostumerCheckBox = () => {
        seIsBusinessCostumer(!isBusinessCostumer);
    }

    useEffect(() => {
        setFormData({ ...formData, isBusiness: isBusinessCostumer })
    }, [isBusinessCostumer])

    useEffect(() => {
        if (
            isPasswordValid &&
            isPhoneValid &&
            isEmailValid &&
            formData.name.first &&
            formData.name.last &&
            formData.address.country &&
            formData.address.city &&
            formData.address.street &&
            formData.address.houseNumber
        ) {
            setIsFormValid(true)
        } else { setIsFormValid(false) }
    }, [isPasswordValid, isPhoneValid, isEmailValid, formData.name.first,
        formData.name.last,
        formData.address.country,
        formData.address.city,
        formData.address.street,
        formData.address.houseNumber])

    const handleBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (isFormValid === true) {
            postUser()
        }
    };

    return (
        <div className={`Signup ${theme?.isLightMode ? 'light' : 'dark'}`}>
            <h1 className='registerHeader'>Register</h1>
            <form className='form'>
                <AppFormInput className={"inputClass"} labelContent={'First name*'} inputId={'firstName'} inputType={'text'} inputHtmlFor={'firstName'} inputName={'firstName'} required={true} onChange={handleInput("first")} />
                <AppFormInput className={"inputClass"} labelContent={'Middle name'} inputId={'middletName'} inputType={'text'} inputHtmlFor={'middleName'} inputName={'middleName'} required={false} onChange={handleInput("middle")} />
                <AppFormInput className={"inputClass"} labelContent={'Last name*'} inputId={'lastName'} inputType={'text'} inputHtmlFor={'lastName'} inputName={'lastName'} required={true} onChange={handleInput("last")} />
                <AppFormInput className={"inputClass"} labelContent={'Phone Number*'} inputId={'phone'} inputType={'tel'} inputHtmlFor={'phone'} inputName={'phone'} required={true} onChange={handlePhone} />
                {!isPhoneValid && <p className='phoneInvalidMessage'>"phone" must be a standard Israeli phone number</p>}
                <AppFormInput className={"inputClass"} labelContent={'Email*'} inputId={'email'} inputType={'email'} inputHtmlFor={'email'} inputName={'email'} required={true} onChange={handleEmail} />
                {!isEmailValid && <p className='emailInvalidMessage'>"email" must be a standard email</p>}
                <AppFormInput className={"inputClass"} labelContent={'Password*'} inputId={'password'} inputType={'password'} inputHtmlFor={'password'} inputName={'password'} required={true} onChange={handlePassword} />
                {!isPasswordValid && <p className='passwordInvalidMessage'>Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-</p>}
                <AppFormInput className={"inputClass"} labelContent={'Image url'} inputId={'imageUrl'} inputType={'text'} inputHtmlFor={'imageUrl'} inputName={'imageUrl'} required={false} onChange={handleImage} />
                {!isImageValid && <p className='imageInvalidMessage'>
                    "image/url" must be a standard URL</p>}
                <AppFormInput className={"inputClass"} labelContent={'Image alt'} inputId={'imageAlt'} inputType={'text'} inputHtmlFor={'imageAlt'} inputName={'imageAlt'} required={false} onChange={handleInput("alt")} />
                <AppFormInput className={"inputClass"} labelContent={'State'} inputId={'state'} inputType={'text'} inputHtmlFor={'state'} inputName={'state'} required={false} onChange={handleInput("state")} />
                <AppFormInput className={"inputClass"} labelContent={'Country*'} inputId={'country'} inputType={'text'} inputHtmlFor={'country'} inputName={'country'} required={true} onChange={handleInput("country")} />
                <AppFormInput className={"inputClass"} labelContent={'City*'} inputId={'city'} inputType={'text'} inputHtmlFor={'city'} inputName={'city'} required={true} onChange={handleInput("city")} />
                <AppFormInput className={"inputClass"} labelContent={'Street*'} inputId={'street'} inputType={'text'} inputHtmlFor={'street'} inputName={'street'} required={true} onChange={handleInput("street")} />
                <AppFormInput className={"inputClass"} labelContent={'House number*'} inputId={'houseNumber'} inputType={'number'} inputHtmlFor={'houseNumber'} inputName={'houseNumber'} required={true} onChange={handleInput("houseNumber")} />
                <AppFormInput className={"inputClass"} labelContent={'Zip'} inputId={'zip'} inputType={'text'} inputHtmlFor={'zip'} inputName={'zip'} required={true} onChange={handleInput("zip")} />
                <div className="checkboxDiv">
                    <input type="checkbox" checked={isBusinessCostumer} onChange={handleBusinessCostumerCheckBox} id="isBusiness" name='isBusiness' required />
                    &nbsp;&nbsp;
                    <p className='pSignUp'>Signup as business</p>
                </div>
                <div className="form-group btnDiv">
                    <Button className='SubmitBtn' onClick={handleBtn} variant="success" disabled={!isFormValid}>Submit</Button>
                </div>
            </form >
        </div >
    );
}