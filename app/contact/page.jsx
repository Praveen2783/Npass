import Contact from '@/components/Contact'
import React from 'react'

import { generateMetadata as genMeta } from "@/util/metadata.js"

export const metadata = genMeta({
  title: "Npass - Contact SecureVault Support - Get Help & Technical Support",
  description:
    "Contact SecureVault for technical support, security questions, billing inquiries, and business solutions. 24/7 emergency support available for security issues.",
  url: "/contact",
  keywords: ["contact support", "password manager help", "technical support", "security emergency", "customer service"],
})
const page = () => {
  return (
    <>
    <Contact/>
    </>
  )
}

export default page