import { useContext, useEffect, useState } from 'react'
import './EditCard.css'
import AppFormInput from '../../components/AppFormInput/AppFormInput';
import { ToastsContext } from '../../context/ToastsContext';
import { validateEmail, validateImage, validatePhone, validateWeb } from '../../utils/formRegexFunctions';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { doEditMyCard, doGetCardById } from '../../Services/CardsService';

export default function EditCard() {
    const navigate = useNavigate();
    const toast = useContext(ToastsContext)
    const auth = useContext(AuthContext)
    const theme = useContext(ThemeContext)
    const [isFormValid, setIsFormValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isImageValid, setIsImageValid] = useState(true);
    const [isWebValid, setIsIWebValid] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
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
            isEmailValid &&
            formData.title &&
            formData.subtitle &&
            formData.address.country &&
            formData.address.city &&
            formData.address.street &&
            formData.address.houseNumber
        ) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }, [isPhoneValid, isEmailValid, formData.title,
        formData.subtitle,
        formData.address.country,
        formData.address.city,
        formData.address.street,
        formData.address.houseNumber])

    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phone = event.target.value;
        if (!validatePhone(phone)) {
            setIsPhoneValid(false);
            setFormData({ ...formData, phone });
        } else {
            setIsPhoneValid(true);
            setFormData({ ...formData, phone });
        }
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;

        if (!validateEmail(email)) {
            setIsEmailValid(false);
            setFormData({ ...formData, email });
        } else {
            setIsEmailValid(true);
            setFormData({ ...formData, email });
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

    const handleWeb = (event: React.ChangeEvent<HTMLInputElement>) => {
        const webInput = event.target.value;
        if (webInput !== undefined && !validateWeb(webInput)) {
            setIsIWebValid(false);
            return;
        } else {
            setIsIWebValid(true);
            setFormData({ ...formData, web: webInput })
        }
    }

    const handleInput = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let input: number | string = event.target.value
        if (type === "state" || type === "country" || type === "city" || type === "street") {
            setFormData({ ...formData, address: { ...formData.address, [type]: input } });
        } else if (type === "houseNumber" || type === "zip") {
            input = parseInt(input)
            setFormData({ ...formData, address: { ...formData.address, [type]: input } });
        } else if (type === "alt") {
            setFormData({ ...formData, image: { ...formData.image, [type]: input } })
        } else {
            setFormData({ ...formData, [type]: input })
        }
    }

    const handleBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const editCardId = async (formData: object) => {
            let { error, result } = await doEditMyCard(formData);
            if (result) {
                toast?.addToast("Card Updated ! ")
                localStorage.removeItem("cardIdToEdit")
                if (auth?.isAdmin) {
                    navigate("/home")
                } else {
                    navigate("/mycards")
                }
            }
            if (error) { return error }
        }
        if (isFormValid === true) {
            editCardId(formData)
        }
    }

    const getCardInfoFromServer = async (cardId: string) => {
        setIsPhoneValid(true);
        setIsEmailValid(true);
        let { error, result } = await doGetCardById(cardId);
        if (result) {
            const filteredData = {
                title: result.title,
                subtitle: result.subtitle,
                description: result.description,
                phone: result.phone,
                email: result.email,
                web: result.web || '',
                image: {
                    url: result.image.url,
                    alt: result.image.alt || '',
                },
                address: {
                    state: result.address.state || '',
                    country: result.address.country,
                    city: result.address.city,
                    street: result.address.street,
                    houseNumber: result.address.houseNumber,
                    zip: result.address.zip || 0,
                }
            }
            setFormData(filteredData);
        }
        if (error) { return error }
    };

    useEffect(() => {
        const cardId = localStorage.getItem("cardIdToEdit");
        if (cardId) {
            getCardInfoFromServer(cardId)
        }
    }, [])

    return (
        <div className={`EditCard ${theme?.isLightMode ? `cardDetailsLight` : `cardDetailsDark`}`}>
            <h1 className='registerHeader'>Edit Card</h1>
            <form className='form'>
                <AppFormInput className={"inputClass"} labelContent={'Title*'} inputId={'title'} inputType={'text'} inputHtmlFor={'title'} inputName={'title'} value={formData.title} required={true} onChange={handleInput("title")} />
                <AppFormInput className={"inputClass"} labelContent={'Subtitle*'} inputId={'subtitle'} inputType={'text'} inputHtmlFor={'subtitle'} inputName={'subtitle'} value={formData.subtitle} required={true} onChange={handleInput("subtitle")} />
                <AppFormInput className={"inputClass"} labelContent={'Description*'} inputId={'description'} inputType={'text'} inputHtmlFor={'description'} value={formData.description} inputName={'description'} required={true} onChange={handleInput("description")} />
                <AppFormInput className={"inputClass"} labelContent={'Phone Number*'} inputId={'phone'} inputType={'tel'} inputHtmlFor={'phone'} inputName={'phone'} value={formData.phone} required={true} onChange={handlePhone} />
                {!isPhoneValid && <p className='phoneInvalidMessage'>"phone" must be a standard Israeli phone number</p>}
                <AppFormInput className={"inputClass"} labelContent={'Email*'} inputId={'email'} inputType={'email'} inputHtmlFor={'email'} inputName={'email'} value={formData.email} required={true} onChange={handleEmail} />
                {!isEmailValid && <p className='emailInvalidMessage'>"email" must be a standard email</p>}
                <AppFormInput className={"inputClass"} labelContent={'Web'} inputId={'web'} inputType={'text'} inputHtmlFor={'web'} inputName={'web'} value={formData.web} onChange={handleWeb} />
                {!isWebValid && <p className='imageInvalidMessage'>
                    "Web" must be a standard URL</p>}
                <AppFormInput className={"inputClass"} labelContent={'Image url'} inputId={'imageUrl'} inputType={'text'} inputHtmlFor={'imageUrl'} inputName={'imageUrl'} required={false} value={formData.image.url} onChange={handleImage} />
                {!isImageValid && <p className='imageInvalidMessage'>
                    "image/url" must be a standard URL</p>}
                <AppFormInput className={"inputClass"} labelContent={'Image alt'} inputId={'imageAlt'} inputType={'text'} inputHtmlFor={'imageAlt'} inputName={'imageAlt'} required={false} value={formData.image.alt} onChange={handleInput("alt")} />
                <AppFormInput className={"inputClass"} labelContent={'State'} inputId={'state'} inputType={'text'} inputHtmlFor={'state'} inputName={'state'} required={false} value={formData.address.state} onChange={handleInput("state")} />
                <AppFormInput className={"inputClass"} labelContent={'Country*'} inputId={'country'} inputType={'text'} inputHtmlFor={'country'} inputName={'country'} required={true} value={formData.address.country} onChange={handleInput("country")} />
                <AppFormInput className={"inputClass"} labelContent={'City*'} inputId={'city'} inputType={'text'} inputHtmlFor={'city'} inputName={'city'} required={true} value={formData.address.city} onChange={handleInput("city")} />
                <AppFormInput className={"inputClass"} labelContent={'Street*'} inputId={'street'} inputType={'text'} inputHtmlFor={'street'} inputName={'street'} required={true} value={formData.address.street} onChange={handleInput("street")} />
                <AppFormInput className={"inputClass"} labelContent={'House number*'} inputId={'houseNumber'} inputType={'text'} inputHtmlFor={'houseNumber'} inputName={'houseNumber'} required={true} value={`${formData.address.houseNumber}`} onChange={handleInput("houseNumber")} />
                <AppFormInput className={"inputClass"} labelContent={'Zip'} inputId={'zip'} inputType={'text'} inputHtmlFor={'zip'} inputName={'zip'} required={true} value={`${formData.address.zip}`} onChange={handleInput("zip")} />
                <div className="form-group btnDiv">
                    <Button className='SubmitBtn' variant="success" disabled={!isFormValid} onClick={handleBtn}>Submit</Button>
                </div>
            </form >
        </div>)
}
