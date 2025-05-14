// app/owner/account/page.tsx
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

type Company = {
  id: string;
  name: string;
  bin: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string;
};

const fields: {
  label: string;
  name: keyof Company;
  type: 'text' | 'email' | 'tel';
  pattern?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  title?: string;
}[] = [
  { label: 'Название компании', name: 'name', type: 'text' },
  {
    label: 'BIN/ИИН',
    name: 'bin',
    type: 'text',
    pattern: '\\d{12}',
    inputMode: 'numeric',
    title: 'Должно быть 12 цифр',
  },
  { label: 'Контактное лицо', name: 'contactName', type: 'text' },
  { label: 'Email', name: 'email', type: 'email', title: 'Введите корректный email' },
  {
    label: 'Телефон',
    name: 'phone',
    type: 'tel',
    pattern: '\\+?\\d{10,15}',
    inputMode: 'tel',
    title: 'От 10 до 15 цифр, можно с +',
  },
  { label: 'Адрес', name: 'address', type: 'text' },
];

export default function CompanyAccountPage() {
  const defaultCompany: Company = {
    id: '1',
    name: 'CoffeeBoom',
    bin: '123456789012',
    contactName: 'Иван Петров',
    email: 'info@coffeeboom.kz',
    phone: '+77001234567',
    address: 'г. Алматы, ул. Панфилова, 10',
    logoUrl: '/logo-coffeeboom.png',
  };

  const [company, setCompany] = useState<Company>(defaultCompany);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(defaultCompany.logoUrl);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof Company;
    setCompany(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setLogoFile(file);
    setLogoPreview(file ? URL.createObjectURL(file) : defaultCompany.logoUrl);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    // HTML5 will prevent submission if patterns don't match
    try {
      const formData = new FormData();
      Object.entries(company).forEach(([k, v]) => {
        if (k !== 'logoUrl' && typeof v === 'string') {
          formData.append(k, v);
        }
      });
      if (logoFile) formData.append('logo', logoFile);

      // await fetch('/api/owner/profile', { ... })

      setMessage('Профиль успешно обновлён (тестовый режим)');
    } catch {
      setMessage('Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6">
          Профиль компании
        </h1>
        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Logo */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Логотип компании
            </label>
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-dashed border-green-300">
                <img
                  src={logoPreview}
                  alt="Логотип"
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <label
                  htmlFor="logo"
                  className="inline-block px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg cursor-pointer transition"
                >
                  Загрузить новый
                </label>
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </div>
            </div>
          </section>

          {/* Fields */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={company[field.name]}
                  onChange={handleChange}
                  pattern={field.pattern}
                  inputMode={field.inputMode}
                  title={field.title}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400 
                             focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition"
                  required
                />
              </div>
            ))}
          </section>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl 
                       shadow-md transition disabled:opacity-50"
          >
            {saving ? 'Сохранение…' : 'Сохранить изменения'}
          </button>
        </form>
      </div>
    </div>
  );
}
