"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Category {
    id: string;
    name: string;
    count: number;
}

interface FilterCategoriesProps {
    selectedCategories?: string[];
    onCategoryChange?: (categories: string[]) => void;
    useRadio?: boolean;
}

export default function FilterCategories({
    selectedCategories = [],
    onCategoryChange,
    useRadio = false,
}: FilterCategoriesProps) {
    // Sample categories with product counts
    const categories: Category[] = [
        { id: "perfumes", name: "العطور", count: 156 },
        { id: "skincare", name: "العناية بالبشرة", count: 89 },
        { id: "makeup", name: "المكياج", count: 124 },
        { id: "haircare", name: "العناية بالشعر", count: 67 },
        { id: "bodycare", name: "العناية بالجسم", count: 45 },
        { id: "accessories", name: "الإكسسوارات", count: 32 },
    ];

    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        if (!onCategoryChange) return;

        if (checked) {
            onCategoryChange([...selectedCategories, categoryId]);
        } else {
            onCategoryChange(selectedCategories.filter((c) => c !== categoryId));
        }
    };

    const handleRadioChange = (value: string) => {
        if (!onCategoryChange) return;
        onCategoryChange([value]);
    };

    if (useRadio) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-black">الفئات</h3>
                <RadioGroup
                    value={selectedCategories[0] || ""}
                    onValueChange={handleRadioChange}
                    className="space-y-3"
                >
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center justify-between space-x-2 space-x-reverse"
                        >
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem
                                    id={category.id}
                                    value={category.id}
                                />
                                <Label
                                    htmlFor={category.id}
                                    className="text-sm font-normal cursor-pointer text-medium-gray hover:text-black transition-colors"
                                >
                                    {category.name}
                                </Label>
                            </div>
                            <span className="text-xs text-light-gray-3">({category.count})</span>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-black">الفئات</h3>
            <div className="space-y-3">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between space-x-2 space-x-reverse"
                    >
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                                id={category.id}
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={(checked) =>
                                    handleCategoryChange(category.id, checked as boolean)
                                }
                            />
                            <Label
                                htmlFor={category.id}
                                className="text-sm font-normal cursor-pointer text-medium-gray hover:text-black transition-colors"
                            >
                                {category.name}
                            </Label>
                        </div>
                        <span className="text-xs text-light-gray-3">({category.count})</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
