export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface HireRequest {
    id: string;
    clientId: string;
    talentId: string;
    projectDescription: string;
    budget?: number;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
  }