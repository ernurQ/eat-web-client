import { ProductFullData } from '@/entities/products/product-types'

export const mockProducts: ProductFullData[] = [
	{
		id: '1',
		name: 'Круассан',
		department: { id: '101', name: 'CoffeBoom Mangilik El', logo: '/images/companyLogos/coffeBoom.png' },
		price: 1000,
		discountedPrice: 350,
		isFavorite: true,
		thumbnail: '/images/catalogProducts/croissant.jpg',
		category: 'Выпечка',
		weight: '200g',
		description: 'Premium organic almonds rich in nutrients.',
		expirationDate: '2025-12-31',
		maxQuantity: 15,
		composition: '100% Almonds',
		nutrition: {
			calories: 576,
			proteins: 21,
			fats: 49,
			carbohydrates: 22
		},
		location: {lat: 51.09311067311711, lng: 71.42478204781597}
	},
	{
		id: '2',
		name: 'Сочник с творогом',
		department: { id: '102', name: 'CoffeBoom Mega', logo: '/images/companyLogos/coffeBoom.png' },
		price: 1000,
		discountedPrice: 400,
		thumbnail: '/images/catalogProducts/curdpastries.jpg',
		isFavorite: false,
		category: 'Выпечка',
		weight: '100g',
		description: 'Rich dark chocolate with 70% cocoa.',
		expirationDate: '2024-08-15',
		maxQuantity: 15,
		composition: 'Cocoa mass, sugar, cocoa butter',
		nutrition: {
			calories: 546,
			proteins: 7,
			fats: 35,
			carbohydrates: 50
		},
		location: {lat: 51.09311067311711, lng: 71.42478204781597}
	},
	{
		id: '3',
		name: 'Ватрушка с творогом',
		department: { id: '103', name: 'Mio Mar Orbita', logo: '/images/companyLogos/mioMar.png' },
		price: 800,
		discountedPrice: 300,
		thumbnail: '/images/catalogProducts/cheeseBun.jpg',
		category: 'Десерты',
		isFavorite: true,
		weight: '150g',
		description: 'Creamy and tangy Greek-style yogurt.',
		expirationDate: '2024-03-01',
		maxQuantity: 15,
		composition: 'Milk, active cultures',
		nutrition: {
			calories: 59,
			proteins: 10,
			fats: 0,
			carbohydrates: 4
		},
		location: {lat: 43.200524194046, lng: 76.8861676717255}
	},
	{
		id: '4',
		name: 'Чизкейк',
		department: { id: '104', name: 'Mio Mar', logo: '/images/companyLogos/mioMar.png' },
		price: 1200,
		discountedPrice: 600,
		thumbnail: '/images/catalogProducts/cheesecake.jpg',
		category: 'Десерты',
		weight: '400g',
		isFavorite: true,
		description: 'Soft and healthy whole wheat bread.',
		expirationDate: '2024-02-10',
		maxQuantity: 15,
		composition: 'Whole wheat flour, water, yeast, salt',
		nutrition: {
			calories: 250,
			proteins: 9,
			fats: 3,
			carbohydrates: 49
		},
		location: {lat: 43.200524194046, lng: 76.8861676717255}
	},
	{
		id: '5',
		name: 'Заварные кольца',
		department: { id: '105', name: 'Кулпынай', logo: '/images/companyLogos/coffeBoom.png' },
		price: 1000,
		discountedPrice: 500,
		thumbnail: '/images/catalogProducts/custardRings.jpg',
		category: 'Десерты',
		isFavorite: true,
		weight: '500ml',
		description: 'Cold-pressed extra virgin olive oil.',
		expirationDate: '2025-10-01',
		maxQuantity: 15,
		composition: '100% Olive Oil',
		nutrition: {
			calories: 884,
			fats: 100
		},
		location: {lat: 51.09311067311711, lng: 71.42478204781597}
	},
	{
		id: '6',
		name: 'Пирог',
		department: { id: '106', name: 'Фабрика вкуса', logo: '/images/companyLogos/coffeBoom.png' },
		price: 1000,
		discountedPrice: 500,
		thumbnail: '/images/catalogProducts/pie.jpg',
		category: 'Выпечка',
		isFavorite: false,
		weight: '250g',
		description: 'Pure and natural wildflower honey.',
		expirationDate: '2026-05-20',
		maxQuantity: 15,
		composition: '100% Honey',
		nutrition: {
			calories: 304,
			carbohydrates: 82
		},
		location: {lat: 51.09311067311711, lng: 71.42478204781597}
	},
	{
		id: '7',
		name: 'Шоколадное печенье',
		department: { id: '107', name: 'Mio Mar', logo: '/images/companyLogos/coffeBoom.png' },
		price: 800,
		discountedPrice: 300,
		thumbnail: '/images/catalogProducts/chocolateCookie.jpg',
		category: 'Десерты',
		isFavorite: true,
		weight: '1L',
		description: '100% pure apple juice with no added sugar.',
		expirationDate: '2024-09-01',
		composition: 'Apple juice concentrate, water',
		maxQuantity: 15,
		nutrition: {
			calories: 46,
			carbohydrates: 11
		},
		location: {lat: 51.09311067311711, lng: 71.42478204781597}
	},
	{
		id: '8',
		name: 'Пончик',
		department: { id: '108', name: 'Mio Mar', logo: '/images/companyLogos/coffeBoom.png' },
		price: 1000,
		discountedPrice: 600,
		isFavorite: true,
		thumbnail: '/images/catalogProducts/donut.jpg',
		category: 'Десерты',
		weight: '50g',
		description: 'Aged cheddar cheese with rich flavor.',
		expirationDate: '2024-06-30',
		maxQuantity: 15,
		composition: 'Milk, salt, enzymes',
		nutrition: {
			calories: 402,
			proteins: 25,
			fats: 33,
			carbohydrates: 1
		},
		location: {lat: 51.09311067311711, lng: 71.42478204781597}
	},
	{
		id: '9',
		name: 'Салат Греческий',
		department: { id: '109', name: 'CoffeBoom', logo: '/images/companyLogos/coffeBoom.png' },
		price: 2500,
		discountedPrice: 1000,
		thumbnail: '/images/catalogProducts/greekSalad.png',
		category: 'Салаты',
		isFavorite: true,
		weight: '200g',
		description: 'Crunchy granola with dried fruits and nuts.',
		expirationDate: '2025-02-28',
		maxQuantity: 15,
		composition: 'Oats, honey, dried fruits, nuts',
		nutrition: {
			calories: 471,
			proteins: 10,
			fats: 20,
			carbohydrates: 64
		},
		location: {lat: 51.09311067311711, lng: 71.42478204781597}
	},
	{
		id: '10',
		name: 'Салат Грин',
		department: { id: '110', name: 'CoffeBoom', logo: '/images/companyLogos/coffeBoom.png' },
		price: 2400,
		discountedPrice: 900,
		thumbnail: '/images/catalogProducts/greenSalad.png',
		category: 'Салаты',
		weight: '150g',
		description: 'Refreshing and calming green tea leaves.',
		expirationDate: '2026-01-01',
		maxQuantity: 15,
		isFavorite: false,
		composition: '100% Green Tea Leaves',
		nutrition: {
			calories: 0
		},
		location: {lat: 51.09311067311711, lng: 71.42478204781597}
	},
]
