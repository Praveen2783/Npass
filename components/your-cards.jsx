"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Eye, EyeOff, MoreVertical, Copy } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteCreditCard, editCreditCard } from "@/actions/actions.js"
import { useRouter } from "next/navigation"
// import { currentUser } from "@clerk/nextjs/server"4
// import { UpdateCard } from "./UpdateCard"
import toast from "react-hot-toast"
import id from "zod/v4/locales/id.cjs"



export function YourCards({ cardsData, userdata }) {
  const [visibleCards, setVisibleCards] = useState(new Set())
  const [updateCard, setUpdateCard] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const router = useRouter();
  const toggleCardVisibility = (cardId) => {
    const newVisible = new Set(visibleCards)
    if (newVisible.has(cardId)) {
      newVisible.delete(cardId)
    } else {
      newVisible.add(cardId)
    }
    setVisibleCards(newVisible)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  // Improved date formatting function
  const formatLastUpdated = (date) => {
    const now = new Date()
    const updatedDate = new Date(date)

    // Check if date is valid
    if (isNaN(updatedDate.getTime())) {
      return "Invalid date"
    }

    const diffInMs = now.getTime() - updatedDate.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInWeeks = Math.floor(diffInDays / 7)
    const diffInMonths = Math.floor(diffInDays / 30)
    const diffInYears = Math.floor(diffInDays / 365)

    // Return relative time for recent dates
    if (diffInMinutes < 1) {
      return "Just now"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`
    } else if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`
    } else {
      return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`
    }
  }

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")
    // Add spaces every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ")
    return formatted.slice(0, 19) // Limit to 16 digits + 3 spaces
  }


  const handleDelete = async (cardId) => {
     
   await deleteCreditCard(userdata, cardId)
    router.refresh();
  }






  if (cardsData.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No credit cards saved yet</p>
        </CardContent>
      </Card>
    );
  }




  return (
    <>
      <div className="space-y-4">
        {cardsData.map((card, i) => (
          <Card key={i} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5" />
                  {card.cardName}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{card.cardType}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* <DropdownMenuItem onClick={
                        () => handleUpdate(card)
                      }>Edit</DropdownMenuItem> */}
                      <DropdownMenuItem className="text-destructive" onClick={()=>{
                        handleDelete(card.id)
                      }}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Card Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">
                    {visibleCards.has(i) ? ` ${formatCardNumber(card.cardNo)}` : "•••• •••• •••• ••••"}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => toggleCardVisibility(i)}>
                    {visibleCards.has(i) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(`${card.cardNo}`)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Expires</span>
                <span className="font-mono">
                  {card.expiry}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cardholder</span>
                <span>{card.cardHolderName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm">{formatLastUpdated(card.date)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    

    </>
  );
}
