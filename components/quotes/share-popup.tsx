"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Share2, Copy, Download, Facebook, Twitter } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface SharePopupProps {
  isOpen: boolean
  onClose: () => void
  content: string
  authorName: string
  quoteId: string
  onShare?: () => void
}

export function SharePopup({ isOpen, onClose, content, authorName, quoteId, onShare }: SharePopupProps) {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  const shareText = `"${content}" - ${authorName}`
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/quotes/${quoteId}` : `/quotes/${quoteId}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: "Link copiado!",
        description: "O link da frase foi copiado para a área de transferência.",
      })
      onShare?.()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      })
    }
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      toast({
        title: "Texto copiado!",
        description: "A frase foi copiada para a área de transferência.",
      })
      onShare?.()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      })
    }
  }

  const handleSocialShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)

    let url = ""

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case "whatsapp":
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        break
      case "telegram":
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
        break
    }

    if (url && typeof window !== 'undefined') {
      window.open(url, "_blank", "width=600,height=400")
      onShare?.()
    }
  }

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true)
    try {
      // Create a canvas to generate the image
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) return

      canvas.width = 800
      canvas.height = 600

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#667eea")
      gradient.addColorStop(1, "#764ba2")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Quote text
      ctx.fillStyle = "white"
      ctx.font = "bold 32px Arial"
      ctx.textAlign = "center"

      // Word wrap for quote
      const words = content.split(" ")
      const lines = []
      let currentLine = ""

      for (const word of words) {
        const testLine = currentLine + word + " "
        const metrics = ctx.measureText(testLine)
        if (metrics.width > canvas.width - 100 && currentLine !== "") {
          lines.push(currentLine)
          currentLine = word + " "
        } else {
          currentLine = testLine
        }
      }
      lines.push(currentLine)

      const startY = (canvas.height - lines.length * 40) / 2
      lines.forEach((line, index) => {
        ctx.fillText(`"${line.trim()}"`, canvas.width / 2, startY + index * 40)
      })

      // Author name
      ctx.font = "24px Arial"
      ctx.fillText(`— ${authorName}`, canvas.width / 2, startY + lines.length * 40 + 60)

      // Quote ID
      ctx.font = "16px monospace"
      ctx.fillText(`#${quoteId}`, canvas.width / 2, canvas.height - 40)

      // Download the image
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `frase-${quoteId}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)

          toast({
            title: "Imagem gerada!",
            description: "A imagem da frase foi baixada com sucesso.",
          })
          onShare?.()
        }
      }, "image/png")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível gerar a imagem.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingImage(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Compartilhar Frase #{quoteId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quote preview */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm italic">"{content}"</p>
            <p className="text-xs text-muted-foreground mt-2">— {authorName}</p>
          </div>

          {/* Copy actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleCopyLink} className="gap-2 bg-transparent">
              <Copy className="h-4 w-4" />
              Copiar Link
            </Button>
            <Button variant="outline" onClick={handleCopyText} className="gap-2 bg-transparent">
              <Copy className="h-4 w-4" />
              Copiar Texto
            </Button>
          </div>

          {/* Generate image */}
          <Button
            variant="outline"
            onClick={handleGenerateImage}
            disabled={isGeneratingImage}
            className="w-full gap-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            {isGeneratingImage ? "Gerando..." : "Gerar Imagem"}
          </Button>

          {/* Social media sharing */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Compartilhar em:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => handleSocialShare("facebook")} className="gap-2">
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" onClick={() => handleSocialShare("twitter")} className="gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button variant="outline" onClick={() => handleSocialShare("whatsapp")} className="gap-2">
                <Share2 className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="outline" onClick={() => handleSocialShare("telegram")} className="gap-2">
                <Share2 className="h-4 w-4" />
                Telegram
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
