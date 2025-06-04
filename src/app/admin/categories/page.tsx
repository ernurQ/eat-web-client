'use client'

import { AddCategoryForm } from '@/features/category/add-category-form'

import { CategoriesTable } from '@/app/admin/categories/_ui/categories-table'

export default function CategoriesPage() {
	return (
		<>
			<AddCategoryForm />
			<CategoriesTable />
		</>
	)
}
