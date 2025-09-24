export type Product = {
  _id: string; 
  name: string;
  description?: string;
  category?: string;
  imageUrl: string[];
  donorId: string; 
  status: string; 
  createdAt: string; 
  location?: string;
  contact?: {
    phone?: string;
    instagram?: string;
    facebook?: string;
    others?: string;
  };
  quantity: number; 
};