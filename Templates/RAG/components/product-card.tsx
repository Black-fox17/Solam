"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  title: string
  description: string
  price: number
  image: string
  source: string
  sourceName: string
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div variants={item}>
      <Card className="overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">{product.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild variant="outline" className="w-full">
            <a href={product.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <span>View on {product.sourceName}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

