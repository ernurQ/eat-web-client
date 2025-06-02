'use client';

import { useCompany } from "../../context/companyContext";

export default function CompanyReviewsPage() {
  const company = useCompany();

  const ratingToStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Отзывы</h1>
      <div className="my-4 text-start">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
          Оставить отзыв
        </button>
      </div>
      {company.reviews && company.reviews.length > 0 ? (
        <div className="space-y-6">
          {company.reviews.map((review: any) => (
            <div key={review.id} className="bg-[#ddf1a1] rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {review.username}
                </h3>
                <div className="text-yellow-500 text-lg">
                  {ratingToStars(review.rating)}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {review.content}
              </p>
              <div className="flex justify-end mt-3">
                <p className="text-gray-700">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Пока нет отзывов
          </h3>
          <p className="text-gray-500 mb-6">
            Будьте первым, кто оставит отзыв об этом заведении
          </p>
        </div>
      )}
    </div>
  );
}