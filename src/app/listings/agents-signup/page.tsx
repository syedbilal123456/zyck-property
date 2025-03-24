'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Building2, MapPin, User, Camera, FileCheck, Phone, Briefcase, Star, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  // Basic Agent Information
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  profilePicture: z.string(),
  agentType: z.enum(['INDIVIDUAL', 'AGENCY_REPRESENTATIVE']),
  experience: z.string().min(1, 'Experience is required'),
  specialization: z.array(z.string()).min(1, 'Select at least one specialization'),
  
  // Contact Details
  phoneNumber: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  officeAddress: z.string(),
  facebookLink: z.string().url().optional().or(z.literal('')),
  instagramLink: z.string().url().optional().or(z.literal('')),
  linkedinLink: z.string().url().optional().or(z.literal('')),
  
  // Business Details
  agencyName: z.string().optional(),
  agencyLogo: z.string().optional(),
  registrationNumber: z.string().optional(),
  areasCovered: z.array(z.string()).min(1, 'Select at least one area'),
  
  // Services Offered
  services: z.array(z.string()).min(1, 'Select at least one service'),
  
  // Listings Managed
  activeListings: z.string(),
  listingsLink: z.string().url().optional(),
  
  // Customer Reviews
  clientTestimonials: z.string(),
  starRating: z.enum(['1', '2', '3', '4', '5']),
  responseTime: z.string(),
  
  // Verification & Approvals
  cnicVerification: z.string().optional(),
  licenseRegistration: z.string().optional(),
});

const specializationOptions = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'plots', label: 'Plots' },
  { id: 'projects', label: 'Projects' },
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
  { id: 'buying_selling', label: 'Buying & Selling Assistance' },
  { id: 'rental', label: 'Rental Services' },
  { id: 'investment', label: 'Investment Consultation' },
  { id: 'project_marketing', label: 'Project Marketing' },
];

export default function AgentSignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentType: 'INDIVIDUAL',
      specialization: [],
      services: [],
      areasCovered: [],
      starRating: '5',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
                  <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} value={undefined} onChange={(e) => {
                            field.onChange(e.target.value);
                          }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="agentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select agent type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="INDIVIDUAL">Individual Agent</SelectItem>
                              <SelectItem value="AGENCY_REPRESENTATIVE">Agency Representative</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  </div>
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
                        name="facebookLink"
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
                        name="instagramLink"
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
                        name="linkedinLink"
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
                      name="registrationNumber"
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
                  <FormField
                    control={form.control}
                    name="agencyLogo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Logo</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} value={undefined} onChange={(e) => {
                            field.onChange(e.target.value);
                          }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                      control={form.control}
                      name="registrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Areas Covered</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., DHA Karachi, Bahria Town Lahore" {...field} />
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
                    <Briefcase className="h-5 w-5" />
                    Services Offered
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="services"
                    render={() => (
                      <FormItem>
                        <FormLabel>Services</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {serviceOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="services"
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
                    name="activeListings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Active Listings</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 25" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="listingsLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link to Listings on ZyckProperty.com</FormLabel>
                        <FormControl>
                          <Input placeholder="https://zyckproperty.com/agents/your-listings" {...field} />
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
                    name="clientTestimonials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Testimonials</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter testimonials from your clients"
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
                      name="starRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Star Rating</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your rating" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Star</SelectItem>
                              <SelectItem value="2">2 Stars</SelectItem>
                              <SelectItem value="3">3 Stars</SelectItem>
                              <SelectItem value="4">4 Stars</SelectItem>
                              <SelectItem value="5">5 Stars</SelectItem>
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
                      <FormItem>
                        <FormLabel>CNIC Verification (Optional)</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} value={undefined} onChange={(e) => {
                            field.onChange(e.target.value);
                          }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licenseRegistration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License/Registration Certificate (if applicable)</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} value={undefined} onChange={(e) => {
                            field.onChange(e.target.value);
                          }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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