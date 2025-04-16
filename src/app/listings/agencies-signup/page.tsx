"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Building2, Phone, Globe, FileCheck, Users, Home, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
// Add this import at the top with the other imports

// Define enums to match Prisma schema
const ServiceType = {
  BUY_SELL: "BUY_SELL",
  RENTAL: "RENTAL",
  INVESTMENT: "INVESTMENT",
  MARKETING: "MARKETING",
} as const

const PropertyType = {
  HOME: "HOME",
  PLOTS: "PLOTS",
  COMMERCIAL: "COMMERCIAL",
  CO_WORK_SPACE: "CO_WORK_SPACE",
} as const

const PropertyTypeDetails = {
  House: "House",
  Flat: "Flat",
  Upper_Portion: "Upper_Portion",
  Lower_Portion: "Lower_Portion",
  Farm_House: "Farm_House",
  Room: "Room",
  Penthouse: "Penthouse",
  Residential_Plot: "Residential_Plot",
  Commercial_Plot: "Commercial_Plot",
  Agriculture_Land: "Agriculture_Land",
  Industrial_Land: "Industrial_Land",
  Plot_File: "Plot_File",
  PLot_Form: "PLot_Form",
  Office: "Office",
  Shop: "Shop",
  Factory: "Factory",
  Warehouse: "Warehouse",
  Building: "Building",
  Other: "Other",
  Office_Room: "Office_Room",
  Software_House: "Software_House",
} as const

const VerificationStatus = {
  PENDING: "PENDING",
  VERIFIED: "VERIFIED",
} as const

// Create schema that matches the Prisma model
const formSchema = z.object({
  name: z.string().min(3, "Agency name must be at least 3 characters"),
  logo: z.string().optional(),
  tagline: z.string().optional(),
  establishedYear: z.string(),
  agencyType: z.string(),
  officeAddress: z.string().min(5, "Office address is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().optional(),
  socialMedia: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .optional(),
  registrationNumber: z.string().optional(),
  license: z.string().optional(),
  areasCovered: z.array(z.string()).min(1, "Please select at least one area"),
  totalAgents: z.coerce.number().min(1, "Number of agents is required"),
  servicesOffered: z
    .array(z.enum([ServiceType.BUY_SELL, ServiceType.RENTAL, ServiceType.INVESTMENT, ServiceType.MARKETING]))
    .min(1, "Select at least one service"),
  totalListings: z.coerce.number(),
  propertyTypes: z
    .array(z.enum([PropertyType.HOME, PropertyType.PLOTS, PropertyType.COMMERCIAL, PropertyType.CO_WORK_SPACE]))
    .min(1, "Select at least one property type"),
  propertyDetails: z
    .array(
      z.enum([
        "House",
        "Flat",
        "Upper_Portion",
        "Lower_Portion",
        "Farm_House",
        "Room",
        "Penthouse",
        "Residential_Plot",
        "Commercial_Plot",
        "Agriculture_Land",
        "Industrial_Land",
        "Plot_File",
        "PLot_Form",
        "Office",
        "Shop",
        "Factory",
        "Warehouse",
        "Building",
        "Other",
        "Office_Room",
        "Software_House",
      ]),
    )
    .optional(),
  exclusive: z.boolean(),
  listingLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  testimonials: z.array(z.string()),
  overallRating: z.coerce.number().min(0).max(5),
  responseTime: z.string(),
  businessCertificate: z.string().optional(),
  verificationStatus: z
    .enum([VerificationStatus.PENDING, VerificationStatus.VERIFIED])
    .default(VerificationStatus.PENDING),
})

const areaOptions = [
  { id: "dha_karachi", label: "DHA Karachi" },
  { id: "bahria_town_karachi", label: "Bahria Town Karachi" },
  { id: "gulshan_iqbal", label: "Gulshan Iqbal" },
  { id: "clifton", label: "Clifton" },
  { id: "dha_lahore", label: "DHA Lahore" },
  { id: "bahria_town_lahore", label: "Bahria Town Lahore" },
  { id: "johar_town", label: "Johar Town" },
  { id: "dha_islamabad", label: "DHA Islamabad" },
  { id: "bahria_town_islamabad", label: "Bahria Town Islamabad" },
]

const servicesOptions = [
  { id: ServiceType.BUY_SELL, label: "Buy/Sell" },
  { id: ServiceType.RENTAL, label: "Rental" },
  { id: ServiceType.INVESTMENT, label: "Investment" },
  { id: ServiceType.MARKETING, label: "Marketing" },
]

const propertyTypeOptions = [
  { id: "HOME", label: "Home" },
  { id: "PLOTS", label: "Plots" },
  { id: "COMMERCIAL", label: "Commercial" },
  { id: "CO_WORK_SPACE", label: "Co-Work Space" },
]

const propertyDetailsOptions = [
  { id: "House", label: "House" },
  { id: "Flat", label: "Flat" },
  { id: "Upper_Portion", label: "Upper Portion" },
  { id: "Lower_Portion", label: "Lower Portion" },
  { id: "Farm_House", label: "Farm House" },
  { id: "Room", label: "Room" },
  { id: "Penthouse", label: "Penthouse" },
  { id: "Residential_Plot", label: "Residential Plot" },
  { id: "Commercial_Plot", label: "Commercial Plot" },
  { id: "Agriculture_Land", label: "Agriculture Land" },
  { id: "Industrial_Land", label: "Industrial Land" },
  { id: "Plot_File", label: "Plot File" },
  { id: "PLot_Form", label: "Plot Form" },
  { id: "Office", label: "Office" },
  { id: "Shop", label: "Shop" },
  { id: "Factory", label: "Factory" },
  { id: "Warehouse", label: "Warehouse" },
  { id: "Building", label: "Building" },
  { id: "Other", label: "Other" },
  { id: "Office_Room", label: "Office Room" },
  { id: "Software_House", label: "Software House" },
]

export default function AgencySignup() {
  const userId = useSelector((state: RootState) => state.auth.user?.id)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: "",
      tagline: "",
      establishedYear: "", // Changed from undefined to empty string
      agencyType: "INDEPENDENT",
      officeAddress: "",
      phoneNumber: "",
      email: "",
      website: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        linkedin: "",
      },
      registrationNumber: "",
      license: "",
      areasCovered: [],
      totalAgents: 0, // Changed from undefined to 0
      totalListings: 0, // Changed from undefined to 0
      listingLink: "",
      propertyTypes: [],
      propertyDetails: [],
      testimonials: [],
      responseTime: "",
      exclusive: false,
      overallRating: 5,
      servicesOffered: [],
      businessCertificate: "",
      verificationStatus: VerificationStatus.PENDING,
    },
  })

  const { isAuthenticated } = useKindeAuth()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Format testimonials from textarea to array
      let testimonialsArray: string[] = []

      // Check if testimonials is already an array or if we need to process the textarea
      if (Array.isArray(values.testimonials) && values.testimonials.length > 0) {
        testimonialsArray = values.testimonials
      } else {
        const testimonialsText = form.getValues("testimonials.0")
        if (testimonialsText) {
          testimonialsArray = testimonialsText.split("\n").filter((t) => t.trim() !== "")
        }
      }

      // Prepare data to match the Prisma schema
      const formattedData = {
        id: userId,
        ...values,
        testimonials: testimonialsArray,
      }

      console.log("Submitting data to API:", formattedData)

      // Show loading toast
      const loadingToast = toast.loading("Registering your agency...")

      const response = await fetch("/api/agency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })

      // Update toast based on response
      toast.dismiss(loadingToast)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Error Status ${response.status}` }))
        console.error("API Error:", errorData)
        toast.error(errorData.message || `Failed to register agency (Status: ${response.status})`)
        return
      }

      const responseData = await response.json()
      console.log("API Response:", responseData)
      toast.success("Agency Registered Successfully")

    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to register agency. Please check console for details.")
    }
  }

  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    } else {
      router.push("/listings/agencies-signup")
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-[300px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Register Your Agency</h1>
              <p className="text-xl text-gray-200">Become a verified real estate partner with ZyckProperty.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-600 text-center">
              Complete the form below with accurate details about your real estate agency
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Agency Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Basic Agency Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Prime Real Estate" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Logo (Upload URL)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              // For file inputs, we should use e.target.files instead of e.target.value
                              const file = e.target.files?.[0]
                              field.onChange(file ? file.name : "")
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline / Slogan (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Your Trusted Property Partner" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="establishedYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Established Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 2010"
                              {...field}
                              value={field.value || ""} // Ensure value is never undefined
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="agencyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select agency type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="INDEPENDENT">Independent</SelectItem>
                              <SelectItem value="FRANCHISE">Franchise</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="officeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Complete office address"
                            className="min-h-[80px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (WhatsApp Preferred)</FormLabel>
                          <FormControl>
                            <Input placeholder="+92 XXX XXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="agency@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.yourwebsite.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="socialMedia.facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <Input placeholder="Facebook URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socialMedia.instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input placeholder="Instagram URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socialMedia.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="LinkedIn URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Business Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Business Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="registrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Business registration number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="license"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License / Certification (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="License or certification details" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="areasCovered"
                    render={() => (
                      <FormItem>
                        <FormLabel>Areas Covered</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {areaOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="areasCovered"
                              render={({ field }) => {
                                return (
                                  <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id as keyof typeof PropertyType)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value ?? []), option.id])
                                            : field.onChange((field.value ?? []).filter((value) => value !== option.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalAgents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Agents Working in Agency</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Number of agents"
                            {...field}
                            value={field.value || ""} // Ensure value is never undefined
                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Services Offered */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Services Offered
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="servicesOffered"
                    render={() => (
                      <FormItem>
                        <FormLabel>Services Offered</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-2">
                          {servicesOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="servicesOffered"
                              render={({ field }) => {
                                return (
                                  <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id as any)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value ?? []), option.id])
                                            : field.onChange((field.value ?? []).filter((value) => value !== option.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Listings Managed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Listings Managed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="totalListings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Active Listings</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Number of active listings"
                            {...field}
                            value={field.value || ""} // Ensure value is never undefined
                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyTypes"
                    render={() => (
                      <FormItem>
                        <FormLabel>Property Types Managed</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-2">
                          {propertyTypeOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="propertyTypes"
                              render={({ field }) => {
                                return (
                                  <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id as keyof typeof PropertyType)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value ?? []), option.id])
                                            : field.onChange((field.value ?? []).filter((value) => value !== option.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertyDetails"
                    render={() => (
                      <FormItem>
                        <FormLabel>Property Type Details</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {propertyDetailsOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="propertyDetails"
                              render={({ field }) => {
                                return (
                                  <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={!!field.value?.includes(option.id as typeof PropertyTypeDetails[keyof typeof PropertyTypeDetails])}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value ?? []), option.id])
                                            : field.onChange(field.value?.filter((value) => value !== option.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="exclusive"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exclusive Properties</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Switch id="exclusive" checked={field.value} onCheckedChange={field.onChange} />
                              <Label htmlFor="exclusive">{field.value ? "Yes" : "No"}</Label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="listingLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link to All Agency Listings (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="URL to your listings" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Customer Reviews & Ratings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Customer Reviews & Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="testimonials.0"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Testimonials</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add client testimonials (separate multiple testimonials with line breaks)"
                            className="min-h-[120px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="overallRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overall Rating</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number.parseFloat(value))}
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select overall rating" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5">5 Stars</SelectItem>
                              <SelectItem value="4">4 Stars</SelectItem>
                              <SelectItem value="3">3 Stars</SelectItem>
                              <SelectItem value="2">2 Stars</SelectItem>
                              <SelectItem value="1">1 Star</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="responseTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Response Time</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Within 24 hours" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Verification & Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Verification & Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="businessCertificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Registration Certificate (URL)</FormLabel>
                        <FormControl>
                          <Input placeholder="URL to certificate document" {...field} />
                        </FormControl>
                        <FormMessage />
                        <p className="text-sm text-gray-500 mt-2">
                          Upload your business registration certificate if available. This will help in verification.
                        </p>
                      </FormItem>
                    )}
                  />
                  <div className="p-4 bg-gray-100 rounded-md">
                    <p className="text-sm font-medium text-gray-700">
                      Agency Verification: <span className="text-orange-500">Pending</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Your agency will be verified by ZyckProperty.com team after submission.
                    </p>
                    <input type="hidden" {...form.register("verificationStatus")} value={VerificationStatus.PENDING} />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Register Agency
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
