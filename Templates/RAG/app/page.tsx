import { SearchInput } from "@/components/search-input"
import { ProductGrid } from "@/components/product-grid"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">AI Shopping Assistant</h1>
          <ThemeToggle />
        </div>
        <SearchInput />
        <ProductGrid />
      </div>
    </main>
  )
}

