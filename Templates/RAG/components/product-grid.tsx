"use client"

import { motion } from "framer-motion"
import { ProductCard } from "./product-card"

// Example product data - replace with actual API response
const products = [
  {
    id: "1",
    title: "Ergonomic Office Chair",
    description: "High-back mesh chair with lumbar support",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    source: "https://example.com/chair",
    sourceName: "Office Depot",
  },
  {
    id: "2",
    title: "Standing Desk",
    description: "Electric height adjustable desk",
    price: 299.99,
    image: "/placeholder.svg?height=400&width=400",
    source: "https://example.com/desk",
    sourceName: "IKEA",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function ProductGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}

