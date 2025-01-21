export interface Talent {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  skills: {
    name: string;
    yearsOfExperience: number;
    expertiseLevel: string;
  }[];
  description: string;
  profilePhoto: string;
  status: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}
