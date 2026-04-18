import React from 'react'
import RichText from '@/components/RichText'
import { Card } from '../../components/Card'

export const RelatedPosts: React.FC<any> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={className}>
      {introContent && (
        <div className="container mb-8">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}

      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {docs?.map((doc: any, index: number) => {
          if (typeof doc === 'string') return null

          return (
            <Card 
              key={index} 
              doc={doc} 
              relationTo="products" // Changed from posts to products
              showCategories 
            />
          )
        })}
      </div>
    </div>
  )
}

export default RelatedPosts