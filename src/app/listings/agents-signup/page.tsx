'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Building2, MapPin, User, FileCheck, Phone, Briefcase, Star, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

// Enums matching the Prisma schema
const Specialization = {
  RESIDENTIAL: 'RESIDENTIAL',
  COMMERCIAL: 'COMMERCIAL',
  PLOTS: 'PLOTS',
  PROJECTS: 'PROJECTS',
} as const;

const ServiceType = {
  BUY_SELL: 'BUY_SELL',
  RENTAL: 'RENTAL',
  INVESTMENT: 'INVESTMENT',
  MARKETING: 'MARKETING',
} as const;

const VerificationStatus = {
  VERIFIED: 'VERIFIED',
  PENDING: 'PENDING',
} as const;

// Form schema aligned with the Prisma model
const formSchema = z.object({
  // Basic Agent Information
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  profilePicture: z.string().optional(),
  agentType: z.string().min(1, 'Agent type is required'),
  experience: z.string().min(1, 'Experience is required'),
  specialization: z.array(z.nativeEnum(Specialization)).min(1, 'Select at least one specialization'),

  // Contact Details
  phoneNumber: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  officeAddress: z.string().optional(),

  // Social Media Links
  facebook: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),

  // Business Details
  agencyName: z.string().optional(),
  agencyLogo: z.string().optional(),
  agencyRegNumber: z.string().optional(),
  areasCovered: z.array(z.string()).min(1, 'Select at least one area'),

  // Services Offered
  servicesOffered: z.array(z.nativeEnum(ServiceType)).min(1, 'Select at least one service'),

  // Listings & Ratings
  totalListings: z.number().min(0, 'Must be a positive number'),
  listingLink: z.string().url().optional().or(z.literal('')),
  testimonials: z.string(),
  overallRating: z.number().min(0).max(5),
  responseTime: z.string(),

  // Verification & Approvals
  cnicVerification: z.boolean().default(false),
  licenseCertificate: z.string().optional(),
});

const specializationOptions = [
  { id: Specialization.RESIDENTIAL, label: 'Residential' },
  { id: Specialization.COMMERCIAL, label: 'Commercial' },
  { id: Specialization.PLOTS, label: 'Plots' },
  { id: Specialization.PROJECTS, label: 'Projects' },
];

const areaOptions = [
  { id: 'dha_karachi', label: 'DHA Karachi' },
  { id: 'bahria_town', label: 'Bahria Town' },
  { id: 'gulshan', label: 'Gulshan' },
  { id: 'clifton', label: 'Clifton' },
  { id: 'johar', label: 'Johar' },
  { id: 'model_town', label: 'Model Town' },
];

const serviceOptions = [
  { id: ServiceType.BUY_SELL, label: 'Buying & Selling Assistance' },
  { id: ServiceType.RENTAL, label: 'Rental Services' },
  { id: ServiceType.INVESTMENT, label: 'Investment Consultation' },
  { id: ServiceType.MARKETING, label: 'Project Marketing' },
];

export default function AgentSignUp() {
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [agencyLogoPreview, setAgencyLogoPreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      profilePicture: '',
      agentType: '',
      experience: '',
      specialization: [],
      phoneNumber: '',
      email: '',
      officeAddress: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      agencyName: '',
      agencyLogo: '',
      agencyRegNumber: '',
      areasCovered: [],
      servicesOffered: [],
      totalListings: 0,
      listingLink: '',
      testimonials: '',
      overallRating: 0,
      responseTime: '',
      cnicVerification: false,
      licenseCertificate: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Format the data to match the database schema
      const formattedData = {
        ...values,
        // Convert testimonials string to array
        testimonials: values.testimonials.split('\n').filter(t => t.trim() !== ''),
        // Set default approval status
        approvalStatus: VerificationStatus.PENDING,
      };

      console.log('Form Submission Values:', formattedData);

      const loadingToast = toast.loading("Registering your agent...")

      // Here you would typically send the data to your API
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })

      // Update toast based on response
      toast.dismiss(loadingToast)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Error Status ${response.status}` }))
        console.error("API Error:", errorData)
        toast.error(errorData.message || `Failed to register Agent (Status: ${response.status})`)
        return
      }

      const responseData = await response.json()
      console.log("API Response:", responseData)
      toast.success("Agent Registered Successfully")

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (preview: string | null) => void,
    formField: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        form.setValue(formField as any, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { isAuthenticated } = useKindeAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-[300px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Agent Network</h1>
              <p className="text-xl text-gray-200">Sign up as a property agent and grow your business</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-600 text-center">Complete the form below with accurate details about your real estate practice</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Agent Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Agent Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="profilePicture"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setProfileImagePreview, 'profilePicture')}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {profileImagePreview && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-1">Preview:</p>
                          <Image
                            width={500}
                            height={500}
                            src={profileImagePreview || "/placeholder.svg"}
                            alt="Profile preview"
                            className="w-20 h-20 object-cover rounded-full border"
                          />
                        </div>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="agentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent Type</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Residential Agent, Commercial Specialist" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5+ Years in Real Estate" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialization"
                    render={() => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                          {specializationOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="specialization"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              )
                                            )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.label}
                                    </FormLabel>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (WhatsApp Preferred)</FormLabel>
                          <FormControl>
                            <Input placeholder="+92 333 1234567" {...field} />
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
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="officeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your office address"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Social Media Links</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <Input placeholder="https://facebook.com/profile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <Input placeholder="https://instagram.com/profile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/profile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Business Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="agencyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Name (if applicable)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., ABC Real Estate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="agencyRegNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Registration Number (if any)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter registration number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="agencyLogo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Logo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, setAgencyLogoPreview, 'agencyLogo')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {agencyLogoPreview && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Preview:</p>
                        <Image
                          width={500}
                          height={500}
                          src={agencyLogoPreview || "/placeholder.svg"}
                          alt="Agency logo preview"
                          className="w-32 h-auto object-contain border rounded p-1"
                        />
                      </div>
                    )}
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
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              )
                                            )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.label}
                                    </FormLabel>
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
                </CardContent>
              </Card>

              {/* Services Offered */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Services Offered
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="servicesOffered"
                    render={() => (
                      <FormItem>
                        <FormLabel>Services</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {serviceOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="servicesOffered"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              )
                                            )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.label}
                                    </FormLabel>
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
                </CardContent>
              </Card>

              {/* Listings Managed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
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
                            placeholder="e.g., 25"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
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
                        <FormLabel>Link to Listings</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/your-listings" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    name="testimonials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Testimonials (one per line)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter testimonials from your clients (one per line)"
                            className="min-h-[100px] bg-white text-gray-800"
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
                          <FormLabel>Overall Rating (0-5)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              placeholder="e.g., 4.5"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
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
                            <Input placeholder="e.g., Replies within 24 hours" {...field} />
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
                    <FileCheck className="h-5 w-5" />
                    Verification & Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cnicVerification"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            CNIC Verification
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            I confirm that my CNIC information is valid and can be verified
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormField
                      control={form.control}
                      name="licenseCertificate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License/Registration Certificate (if applicable)</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileChange(e, setLicensePreview, 'licenseCertificate')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {licensePreview && licensePreview.startsWith('data:image') && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Preview:</p>
                        <Image
                          width={500}
                          height={500}
                          src={licensePreview || "/placeholder.svg"}
                          alt="License preview"
                          className="w-32 h-auto object-contain border rounded p-1"
                        />
                      </div>
                    )}
                    {licensePreview && !licensePreview.startsWith('data:image') && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">File uploaded successfully</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Submit Application
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
