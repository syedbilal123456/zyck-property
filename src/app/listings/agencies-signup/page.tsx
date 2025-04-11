'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Building2, MapPin, Phone, Mail, Globe, FileCheck, Users, Home, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  // Basic Agency Information
  agencyName: z.string().min(3, 'Agency name must be at least 3 characters'),
  agencyLogo: z.string().optional(),
  tagline: z.string().optional(),
  establishedYear: z.string().min(4, 'Please enter a valid year'),
  agencyType: z.enum(['INDEPENDENT', 'FRANCHISE']),
  
  // Contact Details
  officeAddress: z.string().min(5, 'Office address is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  emailAddress: z.string().email('Please enter a valid email address'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  socialMedia: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  
  // Business Details
  registrationNumber: z.string().optional(),
  licenseInfo: z.string().optional(),
  areasCovered: z.array(z.string()).min(1, 'Please select at least one area'),
  totalAgents: z.string().min(1, 'Number of agents is required'),
  
  // Services Offered
  servicesOffered: z.array(z.string()).min(1, 'Select at least one service'),
  
  // Listings Managed
  totalListings: z.string(),
  propertyTypesManaged: z.array(z.string()).min(1, 'Select at least one property type'),
  exclusiveProperties: z.enum(['YES', 'NO']),
  listingsLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  
  // Customer Reviews
  testimonials: z.string(),
  overallRating: z.enum(['1', '2', '3', '4', '5']),
  responseTime: z.string(),
  
  // Verification
  businessRegistrationCertificate: z.string().optional(),
});

const areaOptions = [
  { id: 'dha_karachi', label: 'DHA Karachi' },
  { id: 'bahria_town_karachi', label: 'Bahria Town Karachi' },
  { id: 'gulshan_iqbal', label: 'Gulshan Iqbal' },
  { id: 'clifton', label: 'Clifton' },
  { id: 'dha_lahore', label: 'DHA Lahore' },
  { id: 'bahria_town_lahore', label: 'Bahria Town Lahore' },
  { id: 'johar_town', label: 'Johar Town' },
  { id: 'dha_islamabad', label: 'DHA Islamabad' },
  { id: 'bahria_town_islamabad', label: 'Bahria Town Islamabad' },
];

const servicesOptions = [
  { id: 'buying_selling', label: 'Buying & Selling Assistance' },
  { id: 'rental_services', label: 'Rental Services' },
  { id: 'investment_consultancy', label: 'Investment Consultancy' },
  { id: 'project_marketing', label: 'Project Marketing & Development' },
];

const propertyTypeOptions = [
  { id: 'houses', label: 'Houses' },
  { id: 'apartments', label: 'Apartments' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'plots', label: 'Plots' },
  { id: 'projects', label: 'Projects' },
];

export default function AgencySignup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agencyName: '',
      agencyLogo: '',
      tagline: '',
      establishedYear: '',
      agencyType: 'INDEPENDENT',
      officeAddress: '',
      phoneNumber: '',
      emailAddress: '',
      website: '',
      socialMedia: {
        facebook: '',
        instagram: '',
        linkedin: '',
      },
      registrationNumber: '',
      licenseInfo: '',
      areasCovered: [],
      totalAgents: '',
      totalListings: '',
      listingsLink: '',
      propertyTypesManaged: [],
      testimonials: '',
      responseTime: '',
      exclusiveProperties: 'NO',
      overallRating: '5',
      servicesOffered: [],
      businessRegistrationCertificate: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Log the entire form values object
    console.log('Form submitted with the following values:');
    console.log(values);
    
    // Log individual field categories for better debugging
    console.log('--- Basic Agency Information ---');
    console.log('Agency Name:', values.agencyName);
    console.log('Agency Logo:', values.agencyLogo);
    console.log('Tagline:', values.tagline);
    console.log('Established Year:', values.establishedYear);
    console.log('Agency Type:', values.agencyType);
    
    console.log('--- Contact Details ---');
    console.log('Office Address:', values.officeAddress);
    console.log('Phone Number:', values.phoneNumber);
    console.log('Email Address:', values.emailAddress);
    console.log('Website:', values.website);
    console.log('Social Media:', values.socialMedia);
    
    console.log('--- Business Details ---');
    console.log('Registration Number:', values.registrationNumber);
    console.log('License Info:', values.licenseInfo);
    console.log('Areas Covered:', values.areasCovered);
    console.log('Total Agents:', values.totalAgents);
    
    console.log('--- Services Offered ---');
    console.log('Services:', values.servicesOffered);
    
    console.log('--- Listings Managed ---');
    console.log('Total Listings:', values.totalListings);
    console.log('Property Types Managed:', values.propertyTypesManaged);
    console.log('Exclusive Properties:', values.exclusiveProperties);
    console.log('Listings Link:', values.listingsLink);
    
    console.log('--- Customer Reviews ---');
    console.log('Testimonials:', values.testimonials);
    console.log('Overall Rating:', values.overallRating);
    console.log('Response Time:', values.responseTime);
    
    console.log('--- Verification ---');
    console.log('Business Registration Certificate:', values.businessRegistrationCertificate);
    
    // Here you would typically send this data to your backend API
    // For example: 
    // fetch('/api/agencies', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values)
    // });
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[300px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
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
            <p className="text-gray-600 text-center">Complete the form below with accurate details about your real estate agency</p>
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
                    name="agencyName"
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
                    name="agencyLogo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Logo (Upload URL)</FormLabel>
                        <FormControl>
                          <Input type='file' {...field} value={undefined} onChange={(e) => {
                            field.onChange(e.target.value);
                          }} />
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
                            <Input placeholder="e.g., 2010" {...field} />
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
                      name="emailAddress"
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
                      name="licenseInfo"
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
                  <FormField
                    control={form.control}
                    name="totalAgents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Agents Working in Agency</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Number of agents" {...field} />
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
                          <Input type="number" placeholder="Number of active listings" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyTypesManaged"
                    render={() => (
                      <FormItem>
                        <FormLabel>Property Types Managed</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {propertyTypeOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="propertyTypesManaged"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="exclusiveProperties"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exclusive Properties</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Do you have exclusive properties?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="YES">Yes</SelectItem>
                              <SelectItem value="NO">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="listingsLink"
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
                    name="testimonials"
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    name="businessRegistrationCertificate"
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
  );
}