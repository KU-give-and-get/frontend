export type Reservation = {
  _id: string;
  requestedQuantity: number;
  status:string;
  requesterId: {
    _id: string;
    name: string;
    email: string;
    profileImageUrl?: string;
  };
  createdAt: string;
};