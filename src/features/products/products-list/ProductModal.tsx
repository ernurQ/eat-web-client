"use client";

import L from "leaflet";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Swal from "sweetalert2";
import { Product } from "@/entities/products";
import "leaflet/dist/leaflet.css";
import { useQueryClient } from "@tanstack/react-query";

// Define an interface for items in the cart.
interface CartItem {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(0);

  const customIcon = L.icon({
    iconUrl: product.department.logo,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cartString = localStorage.getItem("cart") || "[]";
    try {
      const cart = JSON.parse(cartString) as CartItem[];
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
    } catch (e) {
      console.error("Error parsing cart data:", e);
    }
  }, [product.id]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const updateCart = (cart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    queryClient.invalidateQueries(["cart"]);

  };

  function handleFirstAddToCart() {
    if (typeof window === "undefined") return;
    if (quantity > 0) return; // Already in cart

    const cartString = localStorage.getItem("cart") || "[]";
    let cart: CartItem[] = [];
    try {
      cart = JSON.parse(cartString);
    } catch (e) {
      console.error("Error parsing cart data:", e);
    }

    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      thumbnail: product.thumbnail,
      price: product.discountedPrice ?? product.price,
      quantity: 1,
    };

    cart.push(newItem);
    updateCart(cart);
    setQuantity(1);
  }

  function handleIncrement() {
    if (typeof window === "undefined") return;
    if (quantity >= product.maxQuantity) return;

    const cartString = localStorage.getItem("cart") || "[]";
    let cart: CartItem[] = [];
    try {
      cart = JSON.parse(cartString);
    } catch (e) {
      console.error("Error parsing cart data:", e);
    }

    const item = cart.find((i) => i.id === product.id);
    if (item) {
      item.quantity += 1;
      setQuantity(item.quantity);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        thumbnail: product.thumbnail,
        price: product.discountedPrice ?? product.price,
        quantity: 1,
      });
      setQuantity(1);
    }
    updateCart(cart);
  }

  function handleDecrement() {
    if (typeof window === "undefined") return;

    const cartString = localStorage.getItem("cart") || "[]";
    let cart: CartItem[] = [];
    try {
      cart = JSON.parse(cartString);
    } catch (e) {
      console.error("Error parsing cart data:", e);
    }

    const itemIndex = cart.findIndex((i) => i.id === product.id);
    if (itemIndex < 0) return; // Not found

    const item = cart[itemIndex];
    if (item.quantity > 1) {
      item.quantity -= 1;
      setQuantity(item.quantity);
    } else {
      cart.splice(itemIndex, 1);
      setQuantity(0);
    }
    updateCart(cart);
  }

  function handleFinalAddToCart() {
    Swal.fire({
      icon: "success",
      title: "Товар добавлен в корзину!",
      text: "Вы успешно добавили товар в корзину.",
      showConfirmButton: false,
      timer: 1800,
      background: "#fff",
      color: "#333",
    });
    onClose();
  }

  const totalPrice = (product.discountedPrice ?? product.price) * quantity;
  const isMaxReached = quantity >= product.maxQuantity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-[900px] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        <div className="flex">
          {/* Left Side */}
          <div className="flex-1 pr-6">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <div className="flex gap-3 mt-4">
              <div>
                <p className="text-green-600 font-semibold">{product.department.name}</p>
                <p className="mt-3 text-gray-700">{product.description}</p>

                {/* Price & Cart Section */}
                <div className="flex flex-col items-start mt-4 gap-4">
                  {quantity === 0 ? (
                    <button
                      onClick={handleFirstAddToCart}
                      className="bg-[#F7C04F] text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-[#ba903c] transition-colors"
                    >
                      Добавить в корзину
                    </button>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleDecrement}
                          className="bg-[#F7C04F] px-3 py-1 rounded hover:bg-[#ba903c] transition-colors"
                        >
                          -
                        </button>
                        <span className="font-semibold text-lg">{quantity}</span>
                        <button
                          onClick={handleIncrement}
                          className={
                            isMaxReached
                              ? "bg-gray-400 px-3 py-1 rounded cursor-not-allowed"
                              : "bg-[#F7C04F] px-3 py-1 rounded hover:bg-[#ba903c] transition-colors"
                          }
                          disabled={isMaxReached}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={handleFinalAddToCart}
                        className="bg-[#F7C04F] text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-[#ba903c] transition-colors"
                      >
                        Оплатить
                      </button>
                    </div>
                  )}

                  {/* Price Info */}
                  <div className="text-black">
                    <span className="font-semibold">Общая сумма: </span>
                    {totalPrice} тг
                  </div>

                  <div className="flex flex-col">
                    <span>
                      <span className="font-semibold">Оставшееся количество:</span>{" "}
                      {product.maxQuantity}
                    </span>
                    <span>
                      <span className="font-semibold">Истекает в:</span>{" "}
                      {product.expirationDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div>
                <div className="relative">
                  <div className="absolute left-[-1rem] top-[-1rem] w-[220px] h-[250px] border-2 border-yellow-500 z-0" />
                  <div className="relative z-10">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      width={250}
                      height={250}
                    />
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-lg mt-4">Состав:</h3>
            <p className="text-gray-600">{product.composition}</p>

            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#F7C04F] p-2 rounded-lg">
                <p className="text-sm font-semibold text-white">Ккал</p>
                <p className="text-lg font-bold text-white">
                  {product.nutrition.calories}
                </p>
              </div>
              <div className="bg-[#F7C04F] p-2 rounded-lg">
                <p className="text-sm font-semibold text-white">Б</p>
                <p className="text-lg font-bold text-white">
                  {product.nutrition.proteins} г
                </p>
              </div>
              <div className="bg-[#F7C04F] p-2 rounded-lg">
                <p className="text-sm font-semibold text-white">Ж</p>
                <p className="text-lg font-bold text-white">
                  {product.nutrition.fats} г
                </p>
              </div>
              <div className="bg-[#F7C04F] p-2 rounded-lg">
                <p className="text-sm font-semibold text-white">У</p>
                <p className="text-lg font-bold text-white">
                  {product.nutrition.carbohydrates} г
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="w-1/3 flex flex-col items-center">
            <MapContainer
              center={[product.location.lat, product.location.lng]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[product.location.lat, product.location.lng]}
                icon={customIcon}
              >
                <Popup>
                  <strong>{product.department.name}</strong>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}