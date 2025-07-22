"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Shield, Users } from "lucide-react"
import emailjs from '@emailjs/browser'
import toast from "react-hot-toast"




export default function Contact() {
    const form = useRef();
const [isSend, setIsSend] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log("Form submitted:", form)
        emailjs.sendForm(
            "service_fjgr6mh",
            "template_szu9gyg",
            form.current,
            "oYOFOkiz9wMipeZcD"
        )
            .then(
                () => {
                    setIsSend(true);
                    form.current.reset();
                    toast.success("Message Send Successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark'
                    });
                }, (Error) => {
                    toast.error("Error Sending Messages", Error);
                    toast.error("Failed to send  Message ,Please Try Again", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark'
                    })
                }
            )
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Support",
            description: "Get help from our support team",
            contact: "collegeproject3119@gmail.com",
            availability: "24/7 Response",
        },
        {
            icon: Phone,
            title: "Phone Support",
            description: "Speak directly with our experts",
            contact: "+1 (555) 123-4567",
            availability: "Mon-Fri, 9AM-6PM EST",
        },
        // {
        //   icon: MapPin,
        //   title: "Office Location",
        //   description: "Visit our headquarters",
        //   contact: "123 Security Street, Tech City, TC 12345",
        //   availability: "By appointment only",
        // },
        // {
        //   icon: MessageSquare,
        //   title: "Live Chat",
        //   description: "Instant help when you need it",
        //   contact: "Available on our website",
        //   availability: "24/7 Available",
        // },
    ]

    const supportCategories = [
        {
            icon: Shield,
            title: "Security Issues",
            description: "Report security concerns or breaches",
            responseTime: "< 1 hour",
        },
        {
            icon: Users,
            title: "Account Support",
            description: "Help with account access and billing",
            responseTime: "< 4 hours",
        },
        {
            icon: MessageSquare,
            title: "General Inquiries",
            description: "Questions about features and usage",
            responseTime: "< 24 hours",
        },
    ]

    const faqs = [
        {
            question: "How secure is my data?",
            answer:
                "Your data is protected with AES-256 encryption and zero-knowledge architecture. We never see your passwords.",
        },
        {
            question: "Can I recover my master password?",
            answer:
                "Due to our zero-knowledge security model, we cannot recover your master password. However, we can help you with account recovery options.",
        },
        {
            question: "Do you offer business plans?",
            answer:
                "Yes, we offer comprehensive business solutions with team management, admin controls, and enterprise features.",
        },
        {
            question: "Is there a mobile app?",
            answer: "Yes, SecureVault is available on iOS and Android with full synchronization across all your devices.",
        },
    ]

    return (
        <section id="contact" className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <Badge variant="secondary" className="mb-4">
                        Contact Us
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        We're Here to <span className="text-primary">Help</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Have questions about SecureVault? Need technical support? Our team is ready to assist you with any inquiries
                        or concerns.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-xl text-muted-foreground">Choose the best way to reach us</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {contactInfo.map((info, index) => (
                            <Card key={index} className="text-center h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <info.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg">{info.title}</CardTitle>
                                    <CardDescription>{info.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-medium mb-2">{info.contact}</p>
                                    <Badge variant="outline" className="text-xs">
                                        {info.availability}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Support Categories */}
            <section className="py-20 px-4 bg-muted/50">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and we'll get back to you as soon as possible
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form ref={form}  onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                 
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                   
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category *</Label>
                                            <Select  name="category">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="security">Security Issues</SelectItem>
                                                    <SelectItem value="account">Account Support</SelectItem>
                                                    <SelectItem value="billing">Billing Questions</SelectItem>
                                                    <SelectItem value="technical">Technical Support</SelectItem>
                                                    <SelectItem value="business">Business Inquiries</SelectItem>
                                                    <SelectItem value="general">General Questions</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject *</Label>
                                            <Input
                                                id="subject"
                                                 name="subject"
                                                placeholder="Brief description of your inquiry"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                 name="message"
                                               
                                                placeholder="Please provide detailed information about your inquiry..."
                                                rows={6}
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="w-full" size="lg">
                                            <Send className="h-4 w-4 mr-2" />
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Support Categories */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Support Categories</CardTitle>
                                    <CardDescription>Expected response times by category</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {supportCategories.map((category, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <category.icon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{category.title}</h4>
                                                <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                                                <Badge variant="outline" className="text-xs">
                                                    Response: {category.responseTime}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Business Hours
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Monday - Friday</span>
                                        <span className="text-sm font-medium">9:00 AM - 6:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Saturday</span>
                                        <span className="text-sm font-medium">10:00 AM - 4:00 PM EST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Sunday</span>
                                        <span className="text-sm font-medium">Closed</span>
                                    </div>
                                    <div className="pt-2 border-t">
                                        <p className="text-xs text-muted-foreground">Emergency security issues are handled 24/7</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-muted-foreground">Quick answers to common questions</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {faqs.map((faq, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            {/* <section className="py-16 px-4 bg-muted/50">
                <div className="container mx-auto">
                    <Card className="max-w-4xl mx-auto border-destructive/20 bg-destructive/5">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-destructive" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Security Emergency?</h3>
                            <p className="text-muted-foreground mb-6">
                                If you suspect a security breach or unauthorized access to your account, contact us immediately.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="destructive" size="lg">
                                    <Phone className="h-4 w-4 mr-2" />
                                    Emergency Hotline
                                </Button>
                                <Button  variant="outline" size="lg">
                                    <Mail className="h-4 w-4 mr-2" />
                                    collegeproject3119@gmail.com
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section> */}
        </section>
    )
}
