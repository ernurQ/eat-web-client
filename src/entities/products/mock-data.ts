import { ProductFullData } from '@/entities/products/product-types'

export const mockProducts: ProductFullData[] = [
	{
		id: '1',
		name: 'Organic Almonds',
		department: { id: '101', name: 'Healthy Snacks Co.' },
		price: 12.99,
		discount: 10,
		isFavorite: true,
		thumbnail: '/images/products.jpg',
		category: 'Nuts',
		quantity: '200g',
		description: 'Premium organic almonds rich in nutrients.',
		expirationDate: '2025-12-31',
		composition: '100% Almonds',
		nutrition: {
			calories: 576,
			proteins: 21,
			fats: 49,
			carbohydrates: 22
		}
	},
	{
		id: '2',
		name: 'Dark Chocolate Bar',
		department: { id: '102', name: 'Choco Bliss' },
		price: 3.49,
		discount: 5,
		thumbnail: '/images/products.jpg',
		isFavorite: false,
		category: 'Sweets',
		quantity: '100g',
		description: 'Rich dark chocolate with 70% cocoa.',
		expirationDate: '2024-08-15',
		composition: 'Cocoa mass, sugar, cocoa butter',
		nutrition: {
			calories: 546,
			proteins: 7,
			fats: 35,
			carbohydrates: 50
		}
	},
	{
		id: '3',
		name: 'Greek Yogurt',
		department: { id: '103', name: 'Dairy Fresh' },
		price: 1.99,
		discount: 0,
		thumbnail: '/images/products.jpg',
		category: 'Dairy',
		isFavorite: true,
		quantity: '150g',
		description: 'Creamy and tangy Greek-style yogurt.',
		expirationDate: '2024-03-01',
		composition: 'Milk, active cultures',
		nutrition: {
			calories: 59,
			proteins: 10,
			fats: 0,
			carbohydrates: 4
		}
	},
	{
		id: '4',
		name: 'Whole Wheat Bread',
		department: { id: '104', name: 'Bakery Delights' },
		price: 2.49,
		discount: 15,
		thumbnail: '/images/products.jpg',
		category: 'Bakery',
		quantity: '400g',
		isFavorite: true,
		description: 'Soft and healthy whole wheat bread.',
		expirationDate: '2024-02-10',
		composition: 'Whole wheat flour, water, yeast, salt',
		nutrition: {
			calories: 250,
			proteins: 9,
			fats: 3,
			carbohydrates: 49
		}
	},
	{
		id: '5',
		name: 'Extra Virgin Olive Oil',
		department: { id: '105', name: 'Mediterranean Harvest' },
		price: 9.99,
		discount: 20,
		thumbnail: '/images/products.jpg',
		category: 'Cooking Oils',
		isFavorite: true,
		quantity: '500ml',
		description: 'Cold-pressed extra virgin olive oil.',
		expirationDate: '2025-10-01',
		composition: '100% Olive Oil',
		nutrition: {
			calories: 884,
			fats: 100
		}
	},
	{
		id: '6',
		name: 'Honey',
		department: { id: '106', name: 'Golden Hive' },
		price: 6.99,
		discount: 5,
		thumbnail: '/images/products.jpg',
		category: 'Sweeteners',
		isFavorite: false,
		quantity: '250g',
		description: 'Pure and natural wildflower honey.',
		expirationDate: '2026-05-20',
		composition: '100% Honey',
		nutrition: {
			calories: 304,
			carbohydrates: 82
		}
	},
	{
		id: '7',
		name: 'Apple Juice',
		department: { id: '107', name: 'Juicy Fresh' },
		price: 3.99,
		discount: 10,
		thumbnail: '/images/products.jpg',
		category: 'Beverages',
		isFavorite: true,
		quantity: '1L',
		description: '100% pure apple juice with no added sugar.',
		expirationDate: '2024-09-01',
		composition: 'Apple juice concentrate, water',
		nutrition: {
			calories: 46,
			carbohydrates: 11
		}
	},
	{
		id: '8',
		name: 'Cheddar Cheese',
		department: { id: '108', name: 'Cheese Lovers' },
		price: 5.49,
		discount: 0,
		isFavorite: true,
		thumbnail: '/images/products.jpg',
		category: 'Dairy',
		quantity: '200g',
		description: 'Aged cheddar cheese with rich flavor.',
		expirationDate: '2024-06-30',
		composition: 'Milk, salt, enzymes',
		nutrition: {
			calories: 402,
			proteins: 25,
			fats: 33,
			carbohydrates: 1
		}
	},
	{
		id: '9',
		name: 'Granola Mix',
		department: { id: '109', name: 'Healthy Bites' },
		price: 4.99,
		discount: 10,
		thumbnail: '/images/products.jpg',
		category: 'Snacks',
		isFavorite: true,
		quantity: '300g',
		description: 'Crunchy granola with dried fruits and nuts.',
		expirationDate: '2025-02-28',
		composition: 'Oats, honey, dried fruits, nuts',
		nutrition: {
			calories: 471,
			proteins: 10,
			fats: 20,
			carbohydrates: 64
		}
	},
	{
		id: '10',
		name: 'Green Tea',
		department: { id: '110', name: 'Tea Time' },
		price: 2.99,
		discount: 5,
		thumbnail: '/images/products.jpg',
		category: 'Beverages',
		quantity: '50g',
		description: 'Refreshing and calming green tea leaves.',
		expirationDate: '2026-01-01',
		isFavorite: false,
		composition: '100% Green Tea Leaves',
		nutrition: {
			calories: 0
		}
	},
	{
		id: '11',
		name: 'Quinoa',
		department: { id: '111', name: 'Super Grains Co.' },
		price: 8.99,
		discount: 15,
		thumbnail: '/images/products.jpg',
		category: 'Grains',
		quantity: '500g',
		description: 'High-protein gluten-free quinoa.',
		expirationDate: '2025-07-15',
		composition: '100% Quinoa',
		isFavorite: true,
		nutrition: {
			calories: 368,
			proteins: 14,
			fats: 6,
			carbohydrates: 64
		}
	},
	{
		id: '12',
		name: 'Almond Milk',
		department: { id: '112', name: 'Nutty Delights' },
		price: 3.49,
		discount: 0,
		thumbnail: '/images/products.jpg',
		category: 'Beverages',
		quantity: '1L',
		description: 'Smooth and creamy almond milk.',
		expirationDate: '2024-04-10',
		composition: 'Water, almonds, calcium, vitamins',
		isFavorite: true,
		nutrition: {
			calories: 30,
			proteins: 1,
			fats: 2.5,
			carbohydrates: 1
		}
	},
	{
		id: '13',
		name: 'Avocado Oil',
		department: { id: '113', name: "Nature's Oils" },
		price: 10.99,
		discount: 10,
		thumbnail: '/images/products.jpg',
		category: 'Cooking Oils',
		quantity: '250ml',
		description: 'Cold-pressed avocado oil rich in nutrients.',
		expirationDate: '2025-12-10',
		isFavorite: true,
		composition: '100% Avocado Oil',
		nutrition: {
			calories: 884,
			fats: 100
		}
	},
	{
		id: '14',
		name: 'Protein Bars',
		department: { id: '114', name: 'Fit Energy' },
		price: 1.99,
		discount: 5,
		thumbnail: '/images/products.jpg',
		category: 'Snacks',
		quantity: '50g',
		description: 'High-protein energy bars for quick boosts.',
		isFavorite: false,
		expirationDate: '2024-09-15',
		composition: 'Protein blend, oats, honey',
		nutrition: {
			calories: 220,
			proteins: 20,
			fats: 7,
			carbohydrates: 20
		}
	},
	{
		id: '15',
		name: 'Raspberry Jam',
		department: { id: '115', name: 'Berry Good Co.' },
		price: 4.49,
		discount: 10,
		thumbnail: '/images/products.jpg',
		category: 'Spreads',
		quantity: '300g',
		isFavorite: false,
		description: 'Delicious raspberry jam with natural sweetness.',
		expirationDate: '2025-03-01',
		composition: 'Raspberries, sugar, pectin',
		nutrition: {
			calories: 240,
			carbohydrates: 60
		}
	},
	{
		id: '16',
		name: 'Spaghetti Pasta',
		department: { id: '116', name: 'Italian Delights' },
		price: 2.99,
		discount: 0,
		thumbnail: '/images/products.jpg',
		isFavorite: false,
		category: 'Pasta',
		quantity: '500g',
		description: 'Traditional Italian spaghetti pasta.',
		expirationDate: '2026-02-01',
		composition: 'Durum wheat semolina',
		nutrition: {
			calories: 370,
			proteins: 12,
			fats: 1.5,
			carbohydrates: 75
		}
	}
]
