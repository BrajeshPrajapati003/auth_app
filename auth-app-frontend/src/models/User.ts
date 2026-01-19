export default interface User{
    id: string;
    email: string;
    name?: string;
    image?: string;
    enabled: boolean;
    createdAt?: string;
    updatedAt?: string;
    provider: string;
}