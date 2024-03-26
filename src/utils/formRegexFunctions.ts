
export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,}$/;
    return passwordRegex.test(password);
};
export const validatePhone = (phoneNumber: string): boolean => {
    const phoneRegex = /^(?:0(?:5[^7]|[23489]))[0-9]{7}$/;
    return phoneRegex.test(phoneNumber)

};
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
};

export const validateImage = (image: string): boolean => {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    return urlRegex.test(image);
};

export const validateWeb = (web: string): boolean => {
    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?\S+\.\S+/;
    return urlRegex.test(web);
};

export const validateFullName = (name: string) : boolean => {
    const nameRegex = /^[a-zA-Z ]{2,20}$/
    return nameRegex.test(name)
}
export const validateData = (data: string) : boolean => {
    const dataRegex = /^[a-zA-Z0-9]{1,250}$/
    return dataRegex.test(data)
}