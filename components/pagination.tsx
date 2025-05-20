import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button variant="outline" size="icon">
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      <Button variant="outline" className="h-9 w-9">
        1
      </Button>
      <Button variant="outline" className="h-9 w-9 bg-primary text-primary-foreground">
        2
      </Button>
      <Button variant="outline" className="h-9 w-9">
        3
      </Button>
      <Button variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
