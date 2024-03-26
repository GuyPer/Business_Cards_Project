
export interface IUsers {
    _id: string,
    name: {
        first: string,
        middle: string,
        last: string,
    }
    phone: string,
    email: string,
    image: {
        url: string,
        alt: string,
    },
    address: {
        state: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number,
    },
    isAdmin: boolean,
    isBusiness: boolean,
    createdAt: string
}

export interface IEditUser {
    name: {
        first: string,
        middle: string,
        last: string
    },
    phone: string,
    image: {
        url: string,
        alt: string
    },
    address: {
        state: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number
    }
}

export interface CostumJwtPayload {
    _id: string
    isBusiness: boolean
    isAdmin: boolean
    iat: number
}

export interface IUserImage {
    imageUrl?: string
    ImageAlt?: string
}