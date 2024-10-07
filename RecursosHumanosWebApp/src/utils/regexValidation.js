export const validateEmail = (email) => {
    const emailRegex = new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );
    return emailRegex.test(email);
};

export const validateName = (name) => {
    const nameRegex = new RegExp("^[A-Za-z]{2,}(?:[-' ][A-Za-z]+)*$");
    return nameRegex.test(name);
};

export const validateText = (text) => {
    const textRegex = new RegExp("^[a-zA-Z0-9ñÑ\\s]{3,}$");
    return textRegex.test(text);
};

export const validateSelect = (text) => {
    return text === "seleccionar-opcion" ? false : true;
};

export const validateDNI = (dni) => {
    const dniRegex = new RegExp("^\\d{8}$");
    return dniRegex.test(dni);
};

export const validatePhoneNumber = (phone) => {
    const phoneRegex = new RegExp("^\\+54.{4,}$");
    return phoneRegex.test(phone);
};

export const validateCurrentJob = (job) => {
    const jobRegex = new RegExp("^[a-zA-Z0-9ñÑ\\s-]{3,}$");
    return jobRegex.test(job);
};
