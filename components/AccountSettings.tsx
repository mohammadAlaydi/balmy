"use client";

import React, { useState } from "react";
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";
import { Bell, Package, ShoppingCart, Heart, User, LogOut } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  isActive?: boolean;
}

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    firstName: "TAHA",
    lastName: "MOHAMED",
    gender: "",
    dateOfBirth: "",
    countryCode: "+966",
    phoneNumber: "552661693",
    email: "TAHADESIGN82@GMAIL.COM",
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "الرئيسية", href: "/" },
    { label: "حسابي", href: "/user-profile" },
  ];

  const menuItems: MenuItem[] = [
    {
      id: "notifications",
      label: "الإشعارات",
      icon: <Bell className="w-5 h-5" />,
      href: "/notifications",
    },
    {
      id: "orders",
      label: "طلباتي",
      icon: <Package className="w-5 h-5" />,
      href: "/orders",
    },
    {
      id: "pending-payment",
      label: "طلبات بانتظار الدفع",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/pending-payment",
    },
    {
      id: "wishlist",
      label: "المفضلة",
      icon: <Heart className="w-5 h-5" />,
      href: "/favourites",
    },
    {
      id: "account",
      label: "حسابي",
      icon: <User className="w-5 h-5" />,
      href: "/user-profile",
      isActive: true,
    },
    {
      id: "logout",
      label: "تسجيل الخروج",
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Right Sidebar - Navigation Menu */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow-sm p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href || "#"}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg border border-[#707070] transition-colors
                      ${
                        item.isActive
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Left Column - Form */}
          <div className="lg:col-span-9 border-r border-black" >
            <div className="bg-white rounded-lg shadow-sm p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Row 1: First Name, Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        الاسم الاخير
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="MOHAMED"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      />
                    </div>                    
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        الاسم الاول
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="TAHA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Gender, Date of Birth */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        تاريخ الميلاد
                      </label>
                      <input
                        type="text"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        placeholder="اختر تاريخ الميلاد"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      />
                    </div>                    
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        الجنس
                      </label>
                      <div className="relative">
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all appearance-none bg-white"
                        >
                          <option value="">حدد نوع الجنس</option>
                          <option value="male">ذكر</option>
                          <option value="female">أنثى</option>
                        </select>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Mobile Number, Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        البريد الالكتروني
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="TAHADESIGN82@GMAIL.COM"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      />
                    </div>                   
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        رقم الجوال
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="552661693"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                        />                        
                        <input
                          type="text"
                          id="countryCode"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          className="w-20 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      حفظ المعلومات
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
