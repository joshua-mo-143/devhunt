import Logo from '@/components/ui/ProductCard/Product.Logo'
import Name from '@/components/ui/ProductCard/Product.Name'
import Tags from '@/components/ui/ProductCard/Product.Tags'
import Title from '@/components/ui/ProductCard/Product.Title'
import Votes from '@/components/ui/ProductCard/Product.Votes'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import { getTopProducts } from '@/libs/supabase/services/products'

export default async function Home() {
  const products = await getTopProducts('votes_counter', false)

  return (
    <section className="max-w-4xl mt-20 mx-auto px-4 md:px-8">
      <h1 className="text-slate-50 text-lg font-semibold xl:px-4">Find your next favorite product</h1>

      <div className="mt-10 mb-12">
        <ul className="divide-y divide-slate-800/60">
          {products.map((product, idx) => (
            <li key={idx} className="py-3">
              <ProductCard href={'/tool/' + product.slug}>
                <Logo src={product.logo_url || ''} alt={product.name} />
                <div className="space-y-1">
                  <Name>{product.name}</Name>
                  <Title className="line-clamp-1 sm:line-clamp-2">{product.slogan}</Title>
                  {/* @ts-expect-error */}
                  <Tags
                    items={[
                      product.product_pricing_types?.title || 'Free',
                      ...product.product_categories.map(c => c.name),
                    ]}
                  />
                </div>
                <div className="flex-1 self-center flex justify-end">
                  <Votes count={product.votes_counter} />
                </div>
              </ProductCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
