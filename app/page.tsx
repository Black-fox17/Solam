"use client";
import Image from "next/image"
import Link from "next/link"
import { useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Head from "next/head";
import  AzureMap from "@/components/azuremap"
import {
  Microscope,
  FlaskRoundIcon as Flask,
  FileText,
  Search,
  Droplets,
  UserCheck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",  
    phone: "",
    service: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    message: "",
    isError: false,
    isSubmitting: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Map hyphenated ID to correct formData keys
    const fieldMapping = {
      name: "name",
      email: "email",
      phone: "phone",
      service: "service",
      message: "message",
    };

    setFormData({
      ...formData,
      [fieldMapping[id]]: value, // Use mapped key
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://solam-api-1.onrender.com/');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, isSubmitting: true });

    try {
      console.log(formData);
      const response = await fetch('https://solam-api-1.onrender.com/api/v1/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: formData.service.toUpperCase(), // Convert to uppercase if backend expects this format
        }),
      });

      if (response.status === 201) {
        setFormStatus({
          message: "Thank you! Your request has been submitted successfully.",
          isError: false,
          isSubmitting: false,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setFormStatus({
          message: "Something went wrong. Please try again later.",
          isError: true,
          isSubmitting: false,
        });
      }
    } catch (error) {
      setFormStatus({
        message: "An error occurred. Please try again later.",
        isError: true,
        isSubmitting: false,
      });
    }
  };
  return (
    <>
      <Head>
        <link rel="icon" href="/med.svg" />
      </Head>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex gap-2 items-center text-primary">
            <Image src="/lab.png" width={35} height={35} alt="Icon Lab" />
              <span className="font-bold text-xl">Solam Diagnostic Centre</span>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-2 md:space-x-6">
                <Link href="#services" className="text-sm font-medium hover:text-primary">
                  Services
                </Link>
                <Link href="#about" className="text-sm font-medium hover:text-primary">
                  About
                </Link>
                <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
                  Testimonials
                </Link>
                <Link href="#contact" className="text-sm font-medium hover:text-primary">
                  Contact
                </Link>
                <Button>Book Appointment</Button>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative">
            <div className="absolute inset-0 z-0">
              <Image
                src="/diagnostic_lab.png"
                alt="Medical laboratory"
                fill
                className="object-cover brightness-[0.4]"
                priority
              />
            </div>
            <div className="container relative z-10 py-24 md:py-32 lg:py-40">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                    Advanced Diagnostics for Better Healthcare
                  </h1>
                  <p className="max-w-[600px] text-lg text-gray-200">
                    Solam Diagnostic Centre provides accurate, reliable, and timely diagnostic services to help healthcare
                    providers make informed decisions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href = "#services">
                    <Button size="lg">Our Services</Button>
                    </a>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-primary/60 opacity-75 blur"></div>
                  <div className="relative overflow-hidden rounded-lg border bg-background p-8">
                    <div className="flex justify-center mb-4">
                      <Image
                        src="https://com.ui.edu.ng/images/Faculties/Basic_Medical_Sciences/Pathology/musthapha_ajani.jpg"
                        alt="Dr. Ajani"
                        width={150}
                        height={150}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center">Dr. Ajani</h3>
                    <p className="text-center text-muted-foreground">Lead Medical Professional</p>
                    <p className="mt-4 text-center">
                      With over 15 years of experience in medical diagnostics, Dr. Ajani leads our team with expertise and
                      compassion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-16 md:py-24 bg-muted/50">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Diagnostic Services</h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Comprehensive diagnostic solutions for accurate medical assessments
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <ServiceCard
                  icon={<Microscope className="h-10 w-10" />}
                  title="Pathology"
                  description="Comprehensive pathology services including tissue analysis, disease diagnosis, and laboratory testing."
                />
                <ServiceCard
                  icon={<FileText className="h-10 w-10" />}
                  title="Histology"
                  description="Microscopic examination of tissue structures to diagnose diseases and abnormalities."
                />
                <ServiceCard
                  icon={<Search className="h-10 w-10" />}
                  title="Autopsy"
                  description="Post-mortem examinations to determine cause of death and advance medical knowledge."
                />
                <ServiceCard
                  icon={<Flask className="h-10 w-10" />}
                  title="Medical Research Work"
                  description="Supporting medical advancements through specialized diagnostic research and collaboration."
                />
                <ServiceCard
                  icon={<Droplets className="h-10 w-10" />}
                  title="Cytology"
                  description="Examination of cells from various body fluids and tissues to detect abnormalities and diseases."
                />
                <ServiceCard
                  icon={<UserCheck className="h-10 w-10" />}
                  title="Personal Consultation"
                  description="One-on-one consultations with our diagnostic specialists to discuss test results and treatment options."
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 md:py-24">
            <div className="container">
              <div className="grid gap-12 md:grid-cols-2 items-center">
                <div>
                  <Image
                    src="/lab2.jpg"
                    alt="Medical laboratory"
                    width={600}
                    height={600}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Solam Diagnostic Centre</h2>
                  <p className="text-lg text-muted-foreground">
                    Located at University College Hospital, Ibadan, Solam Diagnostic Centre is committed to providing
                    accurate, reliable, and timely diagnostic services to help healthcare providers make informed
                    decisions.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Our mission is to improve patient care through precise diagnostics, innovative technology, and
                    exceptional service. We strive to be the most trusted diagnostic partner for healthcare professionals
                    and patients alike.
                  </p>

                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <StatCard number="5,000+" text="Accurate Diagnoses" />
                    <StatCard number="9+" text="Years Experience" />
                    <StatCard number="12" text="Specialists" />
                    <StatCard number="24/7" text="Support" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-16 md:py-24 bg-muted/50">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
                <p className="mt-4 text-xl text-muted-foreground">Trusted by healthcare professionals and patients</p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <TestimonialCard
                  quote="The diagnostic services at Solam have been instrumental in helping me provide accurate treatment plans for my patients."
                  name="Dr. Adebayo"
                  title="Cardiologist"
                />
                <TestimonialCard
                  quote="Fast, accurate results and a professional team. I couldn't ask for better diagnostic support for my practice."
                  name="Dr. Okonkwo"
                  title="General Practitioner"
                />
                <TestimonialCard
                  quote="As a patient, I appreciated the clear explanations and compassionate care I received during my diagnostic procedures."
                  name="Mrs. Adekunle"
                  title="Patient"
                />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-16 md:py-24">
            <div className="container">
              <div className="grid gap-12 md:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h2>
                  <p className="text-lg text-muted-foreground">
                    Have questions or need to schedule a diagnostic service? Reach out to our team and we'll get back to
                    you promptly.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <p>University College Hospital, Ibadan, Nigeria</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <p>+234 812 827 2339</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <p>solamdiagnostics@gmail.com</p>
                    </div>
                  </div>

                  <div className="aspect-video w-full rounded-lg overflow-hidden border mt-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.574323132975!2d3.897365009529629!3d7.401499312309411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d5dc7efc903%3A0x5d241490ff04fca9!2sInstitute%20for%20Advanced%20Medical%20Research%20and%20Training%20-%20IAMRAT!5e0!3m2!1sen!2sng!4v1742031875450!5m2!1sen!2sng"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                    {/* This would be replaced with an actual Google Maps embed */}
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">Google Maps Integration</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Book a Consultation</h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
                      </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <Input id="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-medium">
                        Service
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select a service</option>
                        <option value="pathology">Pathology</option>
                        <option value="histology">Histology</option>
                        <option value="autopsy">Autopsy</option>
                        <option value="research">Medical Research Work</option>
                        <option value="cytology">Cytology</option>
                        <option value="consultation">Personal Consultation</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" value={formData.message} onChange={handleInputChange} placeholder="Enter your message" rows={4} />
                    </div>

                    {formStatus.message && (
                      <p className={formStatus.isError ? "text-red-500" : "text-green-500"}>{formStatus.message}</p>
                    )}

                    <Button type="submit" className="w-full" disabled={formStatus.isSubmitting}>
                      {formStatus.isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/50">
          <div className="container py-8 md:py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <div className="flex gap-2 items-center text-primary">
                  <Microscope className="h-5 w-5" />
                  <span className="font-bold text-lg">Solam Diagnostic</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Advanced diagnostic services for better healthcare outcomes.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#services" className="hover:text-primary">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="#about" className="hover:text-primary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#testimonials" className="hover:text-primary">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="hover:text-primary">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Services</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Pathology
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Histology
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Autopsy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Medical Research
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Cytology
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Consultation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>University College Hospital, Ibadan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+234 812 827 2339</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>solamdiagnostics@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Solam Diagnostic Centre. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Component for service cards
function ServiceCard({ icon, title, description }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// Component for statistics cards
function StatCard({ number, text }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
      <span className="text-3xl font-bold text-primary">{number}</span>
      <span className="text-sm text-muted-foreground text-center">{text}</span>
    </div>
  )
}

// Component for testimonial cards
function TestimonialCard({ quote, name, title }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 opacity-50"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <p className="mb-4">{quote}</p>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium">{name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

