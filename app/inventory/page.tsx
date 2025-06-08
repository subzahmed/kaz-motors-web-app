import { SearchFilters } from "@/components/search-filters"
import { CarGrid } from "@/components/car-grid"
import { Pagination } from "@/components/pagination"

export default function InventoryPage() {
  return (
    <div className="bg-black">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">
          Our <span className="text-hom-red">Inventory</span>
        </h1>
        <div className="bg-hom-dark p-6 rounded-lg mb-8">
          <SearchFilters />
        </div>
        <CarGrid />
        <Pagination />
      </div>
    </div>
  )
}
