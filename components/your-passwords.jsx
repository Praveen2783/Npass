"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Eye, EyeOff, MoreVertical, Copy, ExternalLink, Shield } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PasswordStrengthIndicator } from "./password-strength-indicator"
// import { Dialog, DialogContent, DialogTitle, DialogTrigger, } from "@radix-ui/react-dialog"
import { DialogHeader,Dialog, DialogContent, DialogTitle, DialogTrigger, } from "./ui/dialog"
import { deletePassword } from "@/actions/actions"
import { useRouter } from "next/navigation"



export function YourPasswords({passwordsData,userdata}) {
  const [visiblePasswords, setVisiblePasswords] = useState(new Set())
  const router = useRouter();
  const togglePasswordVisibility = (passwordId) => {
    const newVisible = new Set(visiblePasswords)
    if (newVisible.has(passwordId)) {
      newVisible.delete(passwordId)
    } else {
      newVisible.add(passwordId)
    }
    setVisiblePasswords(newVisible)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getStrengthColor = (password) => {
    switch (password) {
      case "weak":
        return "destructive"
      case "medium":
        return "secondary"
      case "strong":
        return "default"
      default:
        return "secondary"
    }
  }

  
    const handleDelete =async (passId)=>{
     await deletePassword(userdata,passId)
      router.refresh();  
    }

  if (passwordsData.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No passwords saved yet</p>
        </CardContent>
      </Card>
    );
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
  

  return (
    <div className="space-y-4">
      {passwordsData.map((password,i) => (
        <Card key={i} className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="h-5 w-5" />
                {password.appName}
              </CardTitle>
              <div className="flex items-center gap-2">
               
                 <PasswordStrengthIndicator password={password.password}/>
                 <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                    <Shield className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                       <DialogTitle>Password Security Analysis</DialogTitle>
                    </DialogHeader>
                    <PasswordStrengthIndicator password={password.password} showDetails={true}/>
                  </DialogContent>
                 </Dialog>

                {password.webUrl && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={password.webUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                    <DropdownMenuItem className="text-destructive" 
                    onClick={()=>{
                      handleDelete(password.id)
                    }}
                    >Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between max-sm:justify-end ">
              <span className="text-sm text-muted-foreground  max-sm:hidden">Username</span>
              <div className="flex items-center  gap-2 ">
                <span className="font-mono">{password.email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(password.email)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between max-sm:justify-end">
              <span className="text-sm text-muted-foreground max-sm:hidden">Password</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">
                  {visiblePasswords.has(i) ? password.password : "••••••••••••"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordVisibility(i)}>
                  {visiblePasswords.has(i) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(password.password)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between max-sm:justify-end">
              <span className="text-sm text-muted-foreground max-sm:hidden">Last Updated</span>
              <span className="text-sm">{formatLastUpdated(password.date)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
