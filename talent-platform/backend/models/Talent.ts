export interface Skill {
    name: string;
    yearsOfExperience: number;
    expertiseLevel: 'Beginner' | 'Intermediate' | 'Expert';
  }
  
  export interface Talent {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    skills: Skill[];
    description: string;
    profilePhoto: string;
    status: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
  }