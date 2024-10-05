export interface ICompany {
	id: string
	name: string
	description: string
	profileImage: string
	headerBackground: string
	location: string
	contacts: ICompanyContact[]
}

export interface ICompanyContact {
	id: string
	type: 'phone' | 'whatsapp' | 'instagram'
	value: string
}
