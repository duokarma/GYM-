import { randInt, pick } from './utils'

export interface InventoryItem {
  id: string
  name: string
  category: 'Supplements' | 'Merchandise' | 'Consumables'
  stock: number
  reorderLevel: number
  price: number
  supplier: string
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
}

const items: Record<InventoryItem['category'], string[]> = {
  Supplements: ['Whey Protein 2kg', 'BCAA 300g', 'Creatine Monohydrate', 'Mass Gainer 3kg', 'Pre-Workout Blend', 'Multivitamin Pack'],
  Merchandise: ['Ironclad Gym Tee', 'Shaker Bottle', 'Gym Towel', 'Lifting Straps', 'Resistance Band Set', 'Gym Duffel Bag'],
  Consumables: ['Disinfectant Spray', 'Paper Towels', 'Chalk Blocks', 'Hand Sanitizer', 'Disposable Cups'],
}
const suppliers = ['NutriSport Distributors', 'FitGear Wholesale', 'CleanZone Supplies', 'PowerLine Merch Co.']

export const inventory: InventoryItem[] = (Object.keys(items) as InventoryItem['category'][]).flatMap((category) =>
  items[category].map((name, i) => {
    const stock = randInt(0, 120)
    const reorderLevel = 20
    return {
      id: `INV-${category.slice(0, 2).toUpperCase()}-${i}`,
      name,
      category,
      stock,
      reorderLevel,
      price: randInt(99, 3499),
      supplier: pick(suppliers),
      status: stock === 0 ? 'out_of_stock' : stock < reorderLevel ? 'low_stock' : 'in_stock',
    } as InventoryItem
  })
)
