export type ReceivedItem = {
  _id: string;
  productId: {
    name: string;
    imageUrl?: string;
  };
  quantity: number;
  receivedAt: string;
}