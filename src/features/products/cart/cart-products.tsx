'use client'

import { Header } from '@/shared/ui/header'

import { BuyCartProductsButton } from '@/features/products/cart/buy-cart-products-button'
import { ProductsList } from '@/features/products/cart/products-list'

export function CartProducts() {
	return (
		<div className={'py-10 flex flex-col'}>
			<Header className={'mx-auto'}>Корзина</Header>
			<ProductsList />
			<BuyCartProductsButton />
		</div>
	)
}
