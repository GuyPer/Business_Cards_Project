import { useContext, useEffect, useState } from 'react'
import './EditUser.css'
import AppFormInput from '../../components/AppFormInput/AppFormInput'
import { Button } from 'react-bootstrap'
import { validatePhone, validateImage } from "../../utils/formRegexFunctions"
import { useNavigate } from 'react-router-dom'
import { ToastsContext } from '../../context/ToastsContext'
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext'
import { IEditUser } from "../../interfaces/UserInterfaces";
import { doEditUser, doGetUserById } from '../../Services/UsersService'

export default function EditUser() {

    const theme = useContext(ThemeContext)
    const navigate = useNavigate();
    const toast = useContext(ToastsContext)
    const [isFormValid, setIsFormValid] = useState(false);
    const auth = useContext(AuthContext)
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isImageValid, setIsImageValid] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState<IEditUser>({
        name: {
            first: "",
            middle: "",
            last: ""
        },
        phone: "",
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
        }
    });

    useEffect(() => {
        if (
            isPhoneValid &&
            formData.name.first &&
            formData.name.last &&
            formData.address.country &&
            formData.address.city &&
            formData.address.street &&
            formData.address.houseNumber
        ) {
            setIsFormValid(true)
        } else { setIsFormValid(false) }
    }, [isPhoneValid, formData.name.first,
        formData.name.last,
        formData.address.country,
        formData.address.city,
        formData.address.street,
        formData.address.houseNumber])

    const getUserInfoFromServer = async (userId: string) => {
        let { error, result } = await doGetUserById(userId)
        if (result) {
            setIsPhoneValid(true);
            const filteredData =
            {
                name: {
                    first: result.name.first,
                    middle: result.name.middle,
                    last: result.name.last
                },
                phone: result.phone,
                image: {
                    url: result.image.url,
                    alt: result.image.alt
                },
                address: {
                    state: result.address.state,
                    country: result.address.country,
                    city: result.address.city,
                    street: result.address.street,
                    houseNumber: result.address.houseNumber,
                    zip: result.address.zip
                }
            }
            setFormData(filteredData)
        }
        if (error) { return error }
    }

    useEffect(() => {
        const userIdToEdit = localStorage.getItem("userIdToEdit")
        if (userIdToEdit) {
            getUserInfoFromServer(userIdToEdit)
        }
    }, [])

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

    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneInput = event.target.value;
        if (!validatePhone(phoneInput)) {
            setIsPhoneValid(false);
            setFormData({ ...formData, phone: phoneInput });
        } else {
            setIsPhoneValid(true);
            setFormData({ ...formData, phone: phoneInput });
        }
    }

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageInput = event.target.value;
        if (imageInput !== undefined && !validateImage(imageInput)) {
            setIsImageValid(false);
            setFormData({ ...formData, image: { ...formData.image, url: imageInput } })
            return;
        } else {
            setIsImageValid(true);
            setFormData({ ...formData, image: { ...formData.image, url: imageInput } })
        }
    }

    const updateUserGlobal = (formData: IEditUser) => {
        if (auth?.userDetails) {
            auth.userDetails = {
                ...auth.userDetails,
                name: {
                    ...auth.userDetails.name,
                    first: formData.name.first, middle: formData.name.middle, last: formData.name.last
                },
                phone: formData.phone,
                image: {
                    ...auth.userDetails.image,
                    url: formData.image.url,
                    alt: formData.image.alt
                },
                address: {
                    ...auth.userDetails.address,
                    state: formData.address.state,
                    country: formData.address.country,
                    city: formData.address.city,
                    street: formData.address.street,
                    houseNumber: formData.address.houseNumber,
                    zip: formData.address.zip
                }
            };
        }
    };

    const handleBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const editUser = async (formData: IEditUser) => {
            let { error, result } = await doEditUser(formData)
            if (result) {
                updateUserGlobal(formData)
                toast?.addToast("User Updated ! ");
                localStorage.removeItem("userIdToEdit")
                if (auth?.isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/user");
                }
            }
            if (error) { return error }
        }
        if (isFormValid === true) {
            editUser(formData)
        }
    };

    return (
        <div className={`EditUser ${theme?.isLightMode ? 'light' : 'dark'}`}>
            <h1 className='registerHeader'>Edit User</h1>
            <form className='form'>
                <AppFormInput className={"inputClass"} labelContent={'First name*'} inputId={'firstName'} inputType={'text'} inputHtmlFor={'firstName'} inputName={'firstName'} required={true} value={formData.name.first} onChange={handleInput("first")} />
                <AppFormInput className={"inputClass"} labelContent={'Middle name'} inputId={'middletName'} inputType={'text'} inputHtmlFor={'middleName'} inputName={'middleName'} required={false} value={formData.name.middle} onChange={handleInput("middle")} />
                <AppFormInput className={"inputClass"} labelContent={'Last name*'} inputId={'lastName'} inputType={'text'} inputHtmlFor={'lastName'} inputName={'lastName'} required={true} value={formData.name.last} onChange={handleInput("last")} />
                <AppFormInput className={"inputClass"} labelContent={'Phone Number*'} inputId={'phone'} inputType={'tel'} inputHtmlFor={'phone'} inputName={'phone'} required={true} value={formData.phone} onChange={handlePhone} />
                {!isPhoneValid && <p className='phoneInvalidMessage'>"phone" must be a standard Israeli phone number</p>}
                <AppFormInput className={"inputClass"} labelContent={'Image url'} inputId={'imageUrl'} inputType={'text'} inputHtmlFor={'imageUrl'} inputName={'imageUrl'} required={false} value={formData.image.url} onChange={handleImage} />
                {!isImageValid && <p className='imageInvalidMessage'>
                    "image/url" must be a standard URL</p>}
                <AppFormInput className={"inputClass"} labelContent={'Image alt'} inputId={'imageAlt'} inputType={'text'} inputHtmlFor={'imageAlt'} inputName={'imageAlt'} required={false} value={formData.image.alt} onChange={handleInput("alt")} />
                <AppFormInput className={"inputClass"} labelContent={'State'} inputId={'state'} inputType={'text'} inputHtmlFor={'state'} inputName={'state'} required={false} value={formData.address.state} onChange={handleInput("state")} />
                <AppFormInput className={"inputClass"} labelContent={'Country*'} inputId={'country'} inputType={'text'} inputHtmlFor={'country'} inputName={'country'} required={true} value={formData.address.country} onChange={handleInput("country")} />
                <AppFormInput className={"inputClass"} labelContent={'City*'} inputId={'city'} inputType={'text'} inputHtmlFor={'city'} inputName={'city'} required={true} value={formData.address.city} onChange={handleInput("city")} />
                <AppFormInput className={"inputClass"} labelContent={'Street*'} inputId={'street'} inputType={'text'} inputHtmlFor={'street'} inputName={'street'} required={true} value={formData.address.street} onChange={handleInput("street")} />
                <AppFormInput className={"inputClass"} labelContent={'House number*'} inputId={'houseNumber'} inputType={'number'} inputHtmlFor={'houseNumber'} inputName={'houseNumber'} required={true} value={`${formData.address.houseNumber}`} onChange={handleInput("houseNumber")} />
                <AppFormInput className={"inputClass"} labelContent={'Zip'} inputId={'zip'} inputType={'text'} inputHtmlFor={'zip'} inputName={'zip'} required={true} value={`${formData.address.zip}`} onChange={handleInput("zip")} />
                <div className="form-group btnDiv">
                    <Button className='SubmitBtn' onClick={handleBtn} variant="success" disabled={!isFormValid}>Submit</Button>
                </div>
            </form >
        </div>)
}