"use client";

import { useState } from "react";
import {
  ProductFilters as IProductFilters,
  ProductSort,
} from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Filter, Search, SlidersHorizontal } from "lucide-react";
import { getAllBrands, getAllCategories } from "@/lib/products";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ProductFiltersProps {
  filters: IProductFilters;
  sort: ProductSort;
  onFiltersChange: (filters: IProductFilters) => void;
  onSortChange: (sort: ProductSort) => void;
  onReset: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const sortOptions = [
  {
    value: "createdAt-desc",
    label: "Newest First",
    field: "createdAt" as const,
    direction: "desc" as const,
  },
  {
    value: "createdAt-asc",
    label: "Oldest First",
    field: "createdAt" as const,
    direction: "asc" as const,
  },
  {
    value: "title-asc",
    label: "A to Z",
    field: "title" as const,
    direction: "asc" as const,
  },
  {
    value: "title-desc",
    label: "Z to A",
    field: "title" as const,
    direction: "desc" as const,
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
    field: "price" as const,
    direction: "asc" as const,
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
    field: "price" as const,
    direction: "desc" as const,
  },
  {
    value: "featured-desc",
    label: "Featured First",
    field: "featured" as const,
    direction: "desc" as const,
  },
];

export function ProductFilters({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onReset,
  isOpen = true,
  onToggle,
}: ProductFiltersProps) {
  const brands = getAllBrands();
  const categories = getAllCategories();
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.priceRange?.min || 0,
    filters.priceRange?.max || 1000,
  ]);

  const handleBrandChange = (brandSlug: string, checked: boolean) => {
    const currentBrands = filters.brands || [];
    const newBrands = checked
      ? [...currentBrands, brandSlug]
      : currentBrands.filter((b) => b !== brandSlug);

    onFiltersChange({
      ...filters,
      brands: newBrands.length > 0 ? newBrands : undefined,
    });
  };

  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    const currentCategories = filters.categories || [];
    const newCategories = checked
      ? [...currentCategories, categorySlug]
      : currentCategories.filter((c) => c !== categorySlug);

    onFiltersChange({
      ...filters,
      categories: newCategories.length > 0 ? newCategories : undefined,
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    onFiltersChange({
      ...filters,
      priceRange: { min: value[0], max: value[1] },
    });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({
      ...filters,
      search: search.trim() || undefined,
    });
  };

  const handleSortChange = (value: string) => {
    const option = sortOptions.find((opt) => opt.value === value);
    if (option) {
      onSortChange({
        field: option.field,
        direction: option.direction,
      });
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.brands?.length) count += filters.brands.length;
    if (filters.categories?.length) count += filters.categories.length;
    if (filters.priceRange) count += 1;
    if (filters.featured !== undefined) count += 1;
    if (filters.inStock !== undefined) count += 1;
    if (filters.search) count += 1;
    return count;
  };

  const currentSortValue = `${sort.field}-${sort.direction}`;
  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters & Sort
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleContent className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={filters.search || ""}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sort */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Sort By</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={currentSortValue} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sort option" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Active Filters</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="text-[#FF3D00] hover:text-[#FF3D00] hover:bg-[#FF3D00]/10"
                  >
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {filters.brands?.map((brandSlug) => {
                    const brand = brands.find((b) => b.slug === brandSlug);
                    return (
                      <Badge
                        key={brandSlug}
                        variant="secondary"
                        className="flex items-center gap-1 pr-1"
                      >
                        {brand?.name}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleBrandChange(brandSlug, false)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    );
                  })}
                  {filters.categories?.map((categorySlug) => {
                    const category = categories.find(
                      (c) => c.slug === categorySlug,
                    );
                    return (
                      <Badge
                        key={categorySlug}
                        variant="secondary"
                        className="flex items-center gap-1 pr-1"
                      >
                        {category?.name}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() =>
                            handleCategoryChange(categorySlug, false)
                          }
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    );
                  })}
                  {filters.search && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 pr-1"
                    >
                      "{filters.search}"
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleSearchChange("")}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Price Range */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Price Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="min-price" className="text-sm">
                    Min:
                  </Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      handlePriceRangeChange([
                        Number(e.target.value),
                        priceRange[1],
                      ])
                    }
                    className="w-20 h-8"
                    min={0}
                    max={priceRange[1]}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="max-price" className="text-sm">
                    Max:
                  </Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      handlePriceRangeChange([
                        priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-20 h-8"
                    min={priceRange[0]}
                    max={1000}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                ${priceRange[0]} - ${priceRange[1]}
              </p>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.slug}`}
                    checked={
                      filters.categories?.includes(category.slug) || false
                    }
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.slug, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`category-${category.slug}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Brands */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Brands</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.slug}`}
                    checked={filters.brands?.includes(brand.slug) || false}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand.slug, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`brand-${brand.slug}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {brand.name}
                  </Label>
                  {brand.featured && (
                    <Badge variant="outline" className="text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Additional Filters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Additional Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={filters.featured || false}
                  onCheckedChange={(checked) =>
                    onFiltersChange({
                      ...filters,
                      featured: checked ? true : undefined,
                    })
                  }
                />
                <Label
                  htmlFor="featured"
                  className="text-sm font-medium cursor-pointer"
                >
                  Featured Products Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock || false}
                  onCheckedChange={(checked) =>
                    onFiltersChange({
                      ...filters,
                      inStock: checked ? true : undefined,
                    })
                  }
                />
                <Label
                  htmlFor="in-stock"
                  className="text-sm font-medium cursor-pointer"
                >
                  In Stock Only
                </Label>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
