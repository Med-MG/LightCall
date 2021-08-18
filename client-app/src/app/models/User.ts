export interface User  {
    userName: string;
	firstName: string;
	lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    token: string;
    roles: string[];
    skypeId: string;
    image?: string;
}


export interface UserFormValues {
    userName?: string;
	firstName?: string;
	lastName?: string;
    password: string;
    email: string;
    skypeId?: string;
}

export interface ProfileFormValues {
    userName?: string;
	firstName?: string;
	lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
}


