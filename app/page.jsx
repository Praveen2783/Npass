import { AddCard } from "@/components/add-card"
import { AddPassword} from "@/components/add-password"
import { YourCards } from "@/components/your-cards"
import { YourPasswords } from "@/components/your-passwords"
import { currentUser } from "@clerk/nextjs/server";



import { generateMetadata as genMeta } from "@/util/metadata.js"

export const metadata = genMeta({
  title: "Npass - Secure Password Management",
  description:
    "Manage your passwords, credit cards, and digital security from your SecureVault dashboard. Generate strong passwords, monitor security, and sync across all devices.",
  url: "/",
  keywords: ["password dashboard", "security management", "password generator", "digital vault"],
})

export default async function Home() {
  const user = await currentUser();
  const { cards } = user.privateMetadata  
  const { passwords } = user.privateMetadata 
  
  //  console.log(cards)
  // const userId = user.id

  return (

    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 mt-24 ">
          <h1 className="text-3xl font-bold tracking-tight">Password Manager</h1>
          <p className="text-muted-foreground mt-2">Securely store and manage your passwords and credit cards</p>
        </div>

        {/* Add new items section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Add a Credit Card</h2>
            <AddCard  />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Add a Password</h2>
            <AddPassword/>
          </div>
        </div>

        {/* Saved items section */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Cards</h2>
          
              <YourCards userdata={user.id}  cardsData={cards?cards:[]} />
             
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Passwords</h2>
            <YourPasswords userdata={user.id} passwordsData ={passwords?passwords:[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
