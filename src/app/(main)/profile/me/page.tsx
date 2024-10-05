'use client'

import { useGetUserInfoQuery } from '@/entities/user'

export default function ProfilePage() {
	const { data: user } = useGetUserInfoQuery()

	if (!user) return null

	return (
		<section>
			<div>name: {user.name}</div>
			<div>surname: {user.surname}</div>
			<div>phone: {user.phone}</div>
		</section>
	)
}
