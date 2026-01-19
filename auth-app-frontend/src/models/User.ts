export default interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  enable: boolean;
  createdAt?: string;
  updatedAt?: string;
  provider: string;
  providerId?: string;
  roles?: { id: string; name: string }[];
}
