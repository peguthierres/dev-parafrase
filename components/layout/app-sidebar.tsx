"use client"

import { Home, Search, Settings, Users, BookOpen, TrendingUp, Star, Plus } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

// Menu items
const items = [
  {
    title: "Início",
    url: "/",
    icon: Home,
  },
  {
    title: "Buscar",
    url: "/search",
    icon: Search,
  },
  {
    title: "Autores",
    url: "/authors",
    icon: Users,
  },
  {
    title: "Categorias",
    url: "/categories",
    icon: BookOpen,
  },
  {
    title: "Populares",
    url: "/popular",
    icon: TrendingUp,
  },
  {
    title: "Favoritas",
    url: "/favorites",
    icon: Star,
  },
]

const topAuthors = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Aristóteles",
    category: "Filósofo",
    followers: 1250,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Fernando Pessoa",
    category: "Poeta",
    followers: 980,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Einstein",
    category: "Cientista",
    followers: 875,
    avatar: "https://images.unsplash.com/photo-15602500970b93528c311a?w=40&h=40&fit=crop&crop=face",
  },
]

const mostRead = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    content: "Ser ou não ser, eis a questão.",
    author: "Shakespeare",
    views: 2340,
  },
  { id: "550e8400-e29b-41d4-a716-446655440002", content: "Só sei que nada sei.", author: "Sócrates", views: 1890 },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    content: "A imaginação é mais importante que o conhecimento.",
    author: "Einstein",
    views: 1650,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="hidden lg:flex">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg">
            <span className="text-xl font-bold">ParaFrase</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Ações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/add-quote">
                    <Plus />
                    <span>Adicionar Frase</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Top Authors */}
        <div className="px-4 py-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                Top Autores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topAuthors.map((author, index) => (
                <Link key={author.id} href={`/authors/${author.id}`} className="block">
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={author.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs truncate">{author.name}</p>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          {author.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Most Read */}
        <div className="px-4 py-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4 text-primary" />
                Mais Lidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mostRead.map((quote, index) => (
                <Link key={quote.id} href={`/quotes/${quote.id}`} className="block">
                  <div className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-2 mb-1">
                      <div className="flex-1">
                        <p className="text-xs leading-relaxed line-clamp-2">"{quote.content}"</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-muted-foreground">— {quote.author}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {quote.views}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
