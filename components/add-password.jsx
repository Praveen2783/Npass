"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {  Lock, Plus } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import { addCreditCard } from "@/actions/actions.js"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"
import { addPassword } from "@/actions/actions"
import { useRouter } from "next/navigation"


const formSchema = z.object({

  // Password fields
  siteName: z.string()
    .min(2, { message: "Site name must be at least 2 characters." })
    .max(50, { message: "Site name cannot exceed 50 characters." }),
    // .optional(),
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(100, { message: "Username cannot exceed 100 characters." }),
  password: z.
    string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(128, { message: "Password cannot exceed 128 characters." })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
        message: "Password must contain at least one special character.",
      })
    ,
  url: z.string()
    .url({ message: "Please enter a valid URL." })
    .max(500, { message: "URL cannot exceed 500 characters." })
    .or(z.literal("")),

})

export function AddPassword() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { user } = useUser();
  const router =useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values) {
    //  e.preventDefault()
    setIsExpanded(false);
    console.log("form submit");
    if(user.id){
        addPassword(values.siteName,values.username,values.password,values.url,user.id)
        toast.success("Password successfully Added")
    }

    form.reset();
    router.refresh();
  }

  if (!isExpanded) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <Button
            onClick={() => setIsExpanded(true)}
            className="w-full h-20 border-2 border-dashed border-muted-foreground/25 bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            variant="outline"
          >
            <div className="flex flex-col items-center gap-2">
            
                <Lock className="h-6 w-6" />
             
              <span>
                Add Password
              </span>
            </div>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
        
            <Lock className="h-5 w-5" />
      
          Add Password
        </CardTitle>
        <CardDescription>
          Create a new Password Entry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
              <>
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site/App Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Google, Facebook, etc." {...field} />
                      </FormControl>
                      <FormDescription>
                        Name of the website or application
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username/Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your login username or email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your account password
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        The website's login URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </>
         

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Save Password
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsExpanded(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}