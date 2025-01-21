export interface Talent {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  description?: string;
  skills?: {
    name: string;
    expertiseLevel: string;
    yearsOfExperience: number;
  }[];
  status?: 'pending' | 'approved' | 'rejected';
  isVisible?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
