"use client";

import { useState } from "react";
import { AiOutlineCreditCard } from "react-icons/ai"; // For example icons
import { BsPlus } from "react-icons/bs";

export function PaymentTab() {
  const [cards, setCards] = useState<CardData[]>([]); 
  const [isAddingCard, setIsAddingCard] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");

  const noCardsUI = (
    <div className="flex flex-col items-center mt-10">
      <p className="text-center text-lg mb-6">У вас нет сохраненных карт</p>
      <button
        onClick={() => setIsAddingCard(true)}
        className="flex items-center gap-2 bg-white border border-gray-400 px-4 py-2 rounded-full hover:bg-gray-100"
      >
        <AiOutlineCreditCard />
        <span>Привязать карту</span>
        <BsPlus />
      </button>
    </div>
  );

  const addCardForm = (
    <div className="mt-8 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">Заполните данные</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Номер карты</label>
          <input
            type="text"
            placeholder="4400 3467 7890 5478"
            className="border border-gray-300 rounded-2xl p-2 w-full"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Срок действия</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="06"
                className="border border-gray-300 rounded-2xl p-2 w-1/2"
                value={expMonth}
                onChange={(e) => setExpMonth(e.target.value)}
              />
              <input
                type="text"
                placeholder="27"
                className="border border-gray-300 rounded-2xl p-2 w-1/2"
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">CVV/CVC</label>
            <input
              type="text"
              placeholder="678"
              className="border border-gray-300 rounded-2xl p-2 w-full"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* "Далее" button to save card */}
      <button
        onClick={handleAddCard}
        className="bg-[#F7C04F] text-white py-2 px-6 rounded-2xl mt-6 hover:bg-[#e0a42f]"
      >
        Далее
      </button>
    </div>
  );

  const cardsListUI = (
    <div className="mt-6 flex flex-col gap-4 max-w-md">
      {cards.map((card, index) => (
        <label
          key={index}
          className="flex items-center gap-2 p-3 border border-gray-300 rounded-2xl cursor-pointer"
        >
          <img
            src={getCardBrandIcon(card.brand)}
            alt={card.brand}
            className="h-6 w-auto"
          />
          <span className="ml-2 text-sm">
            **** {card.last4}
          </span>
          <input
            type="radio"
            name="selectedCard"
            className="ml-auto"
          />
        </label>
      ))}

      <button
        onClick={() => setIsAddingCard(true)}
        className="flex items-center gap-2 bg-white border border-gray-400 px-4 py-2 rounded-full hover:bg-gray-100 w-fit"
      >
        <AiOutlineCreditCard />
        <span>Привязать карту</span>
        <BsPlus />
      </button>
    </div>
  );

  // 5️⃣ Handler to "add card" on "Далее" click
  function handleAddCard() {
    // Minimal logic: parse brand from first digit, store last4, etc.
    if (!cardNumber) return;

    const brand = cardNumber.startsWith("4") ? "VISA" : "CARD"; 
    const last4 = cardNumber.slice(-4);

    const newCard: CardData = {
      brand,
      last4,
      expMonth,
      expYear,
    };

    setCards((prev) => [...prev, newCard]);
    // Reset form & close
    setCardNumber("");
    setExpMonth("");
    setExpYear("");
    setCvv("");
    setIsAddingCard(false);
  }

  return (
    <div className="mt-4">
      {/* If user has no cards and is not adding => show "no cards" */}
      {/* If user is adding => show add form */}
      {/* Otherwise => show list of saved cards */}
      {!cards.length && !isAddingCard
        ? noCardsUI
        : isAddingCard
        ? addCardForm
        : cardsListUI}
    </div>
  );
}

// 6️⃣ A minimal interface for card data
interface CardData {
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
}

function getCardBrandIcon(brand: string) {
  if (brand === "VISA") return "/images/payment/visacard.png";
  return "/images/payment/visacard.png";
}
