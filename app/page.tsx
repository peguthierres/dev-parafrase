import { Header } from "@/components/layout/header"
import { RightSidebar } from "@/components/layout/right-sidebar"
import { Footer } from "@/components/layout/footer"
import { Timeline } from "@/components/layout/timeline"

const mockQuotes = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    content: "A excelência não é um ato, mas um hábito.",
    author: {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "Aristóteles",
      category: "Filósofo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    likes: 234,
    comments: 12,
    views: 1250,
    isLiked: false,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    content: "Só sei que nada sei.",
    author: {
      id: "550e8400-e29b-41d4-a716-446655440002",
      name: "Sócrates",
      category: "Filósofo",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    likes: 189,
    comments: 8,
    views: 890,
    isLiked: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    content: "A imaginação é mais importante que o conhecimento.",
    author: {
      id: "550e8400-e29b-41d4-a716-446655440003",
      name: "Albert Einstein",
      category: "Cientista",
      avatar: "https://images.unsplash.com/photo-1560250097791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    note: "Frase adaptada de uma entrevista de 1929",
    likes: 312,
    comments: 24,
    views: 1650,
    isLiked: false,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    content: "Seja a mudança que você quer ver no mundo.",
    author: {
      id: "550e8400-e29b-41d4-a716-446655440004",
      name: "Mahatma Gandhi",
      category: "Político",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    likes: 445,
    comments: 31,
    views: 2100,
    isLiked: false,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 lg:max-w-2xl">
            <Timeline quotes={mockQuotes} />
          </div>

          <div className="lg:w-80">
            <RightSidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
