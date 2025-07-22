import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Key, Zap, Users, Award } from "lucide-react"

import { generateMetadata as genMeta } from "@/util/metadata.js"

export const metadata = genMeta({
  title: "Npass - About SecureVault - Military-Grade Password Security",
  description:
    "Learn about SecureVault's mission to protect your digital identity with zero-knowledge encryption, advanced security features, and trusted password management solutions.",
  url: "/about",
  keywords: [
    "about securevault",
    "password security",
    "zero-knowledge encryption",
    "digital security company",
    "cybersecurity mission",
  ],
})



export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: "Military-Grade Encryption",
      description:
        "Your data is protected with AES-256 encryption, the same standard used by governments and financial institutions.",
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Architecture",
      description:
        "We never see your passwords. All encryption and decryption happens on your device before data reaches our servers.",
    },
    {
      icon: Key,
      title: "Secure Password Generation",
      description: "Generate strong, unique passwords for all your accounts with our advanced password generator.",
    },
    {
      icon: Zap,
      title: "Auto-Fill & Sync",
      description: "Seamlessly fill passwords across all your devices with real-time synchronization.",
    },
    {
      icon: Users,
      title: "Secure Sharing",
      description: "Share passwords and sensitive information securely with family members or team members.",
    },
    {
      icon: Award,
      title: "Security Audits",
      description: "Regular third-party security audits ensure your data remains protected at all times.",
    },
  ]

  const stats = [
    // { number: "10M+", label: "Users Trust Us" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "256-bit", label: "AES Encryption" },
    { number: "24/7", label: "Security Monitoring" },
  ]

  return (
    <section id="about" className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            About SecureVault
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Your Digital Life, <span className="text-primary">Secured</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            SecureVault is a next-generation password manager designed to keep your digital identity safe. With
            military-grade encryption and zero-knowledge architecture, we ensure your sensitive information remains
            private and secure.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SecureVault?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with security-first principles and designed for modern digital life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  In an increasingly digital world, password security has become more critical than ever. Our mission is
                  to make robust security accessible to everyone, without compromising on usability or privacy.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that security should be simple, transparent, and trustworthy. That's why we've built
                  SecureVault with open-source principles, regular security audits, and a commitment to never compromise
                  on your privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </section>
  )
}
