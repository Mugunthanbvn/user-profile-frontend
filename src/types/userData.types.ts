interface IUserData{
    fullName: string;
    email: string;
    dob: string;
    password: string;
    phoneNumber: string;
    securityAnswer: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    confirmPassword?: string;
}

export type {IUserData};