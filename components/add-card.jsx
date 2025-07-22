"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard, Lock, Plus } from "lucide-react"
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
import { addCreditCard } from "@/actions/actions.js"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useRouter } from "next/navigation"


const formSchema = z.object({
  cardType: z.string({
    required_error: "Please select a card type.",
  }),
  cardNumber: z.string()
    .min(16, { message: "Card number must be at least 16 characters." })
    .max(19, { message: "Card number cannot exceed 19 digits." })
    .regex(/^\d+$/, { message: "Card number must contain only digits." }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be mm/yy format." }),
  cvv: z.string()
    .min(3, { message: "CVV must be at least 3 digits." })
    .max(4, { message: "CVV must be at most 4 digits." })
    .regex(/^\d+$/, { message: "CVV must contain only digits." }),
  cardholderName: z.string()
    .min(2, { message: "Cardholder name must be at least 2 characters." }),
  cardName: z.string()
    .min(2, { message: "Card name must be at least 2 characters." }),
})

const cardTypes = [
  { value: "Visa", label: "Visa" },
  { value: "Mastercard", label: "Mastercard" },
  { value: "Creditcard", label: "Creditcard" },
  { value: "Debitcard", label: "Debitcard" },
  { value: "RuPay", label: "RuPay" },
,
]

export function AddCard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { user } = useUser();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values) {
    //  e.preventDefault()
    setIsExpanded(false);
    console.log("form submit");
    if (user.id) {
      addCreditCard(values.cardName, values.cardNumber, values.expiryDate, values.cvv, values.cardholderName,values.cardType, user.id);
      toast.success("Card Successfully Added")
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

              <CreditCard className="h-6 w-6" />

              <span>
                Add Credit Card
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

          <CreditCard className="h-5 w-5" />

          Add Credit Card
        </CardTitle>
        <CardDescription>
          Securely store your credit card information

        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <>
              <div className="grid grid-cols-2 gap-4 ">
                <FormField 
                  control={form.control}
                  name="cardType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Type</FormLabel>
                      <Select  onValueChange={field.onChange}  defaultValue={field.value} >
                        <FormControl >
                          <SelectTrigger className="w-[18rem] ">
                            <SelectValue placeholder="Select card type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                          {cardTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                         <FormDescription className=" relative ">
                      Select prefer card type 
                    </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Visa Card" {...field} />
                      </FormControl>
                      <FormDescription>
                        Give your card a memorable name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <FormField
                control={form.control}
                name="cardNumber"
                render={({  field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your 16-digit card number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormDescription>
                        Format: MM/YY
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field}  />
                      </FormControl>
                      <FormDescription>
                        3-4 digit security code
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Name as it appears on the card
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>


            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Save Card
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