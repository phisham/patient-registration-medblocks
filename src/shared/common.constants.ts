export interface IUserDetails{
    userId?: string,
    name?: string,
    email?: string,
    photoUrl?: string
}

export interface IPatientDetails{
    id: number,
    userId: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    treatmentInfo?: string,
    doctorName: string
}