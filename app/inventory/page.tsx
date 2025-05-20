import { SearchFilters } from "@/components/search-filters"
import { CarGrid } from "@/components/car-grid"
import { Pagination } from "@/components/pagination"

export default function InventoryPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Our Inventory</h1>
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <SearchFilters />
      </div>
      <CarGrid />
      <Pagination />
    </div>
  )
}
