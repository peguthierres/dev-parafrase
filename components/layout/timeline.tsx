"use client"

import { QuoteCard } from "@/components/quotes/quote-card"
import { Card, CardContent } from "@/components/ui/card"

interface TimelineProps {
  quotes: Array<{
    id: string
    content: string
    author: {
      id: string
      name: string
      category: string
      avatar: string
    }
    note?: string
    likes: number
    comments: number
    views: number
    isLiked: boolean
  }>
}

export function Timeline({ quotes }: TimelineProps) {
  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Timeline de Frases</h1>
        <p className="text-muted-foreground">Descubra frases inspiradoras dos maiores pensadores</p>
      </div>

      {quotes.map((quote, index) => (
        <div key={quote.id}>
          <QuoteCard {...quote} />

          {/* Ad placeholder every 3 quotes */}
          {(index + 1) % 3 === 0 && (
            <Card className="mt-6 bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-32 bg-muted/50 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <div className="text-sm font-medium mb-1">Publicidade</div>
                    <div className="text-xs">Anúncio Timeline</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  )
}
