export type Product = {
	id: string;
  name: string;
  department: { id: string; name: string, logo: string };
  price: number;
  discountedPrice?: number;
  isFavorite: boolean;
  thumbnail: string;
  category: string;
  weight: string;
  description: string;
  expirationDate: string;
  maxQuantity: number;
  composition: string;
  nutrition: {
    calories: number;
    proteins?: number;
    fats?: number;
    carbohydrates?: number;
  };
  location: { lat: number; lng: number };
}

export type ProductFullData = Product & {
	description?: string
	expirationDate: string
	composition?: string
	nutrition?: {
		calories?: number
		proteins?: number
		fats?: number
		carbohydrates?: number
	}
}
