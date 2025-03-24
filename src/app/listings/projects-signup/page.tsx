'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Building2, MapPin, Home, Camera, FileCheck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  // Basic Information
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
  developerName: z.string().min(3, 'Developer name must be at least 3 characters'),
  projectType: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'MIXED_USE']),
  projectStatus: z.enum(['ONGOING', 'COMPLETED', 'UPCOMING']),
  launchDate: z.string(),
  completionDate: z.string(),
  
  // Location
  city: z.string().min(2, 'City name is required'),
  area: z.string().min(2, 'Area name is required'),
  googleMapsUrl: z.string().url().optional(),
  landmarks: z.string(),
  
  // Property Details
  propertyTypes: z.array(z.string()).min(1, 'Select at least one property type'),
  sizes: z.string(),
  priceRangeStart: z.string(),
  priceRangeEnd: z.string(),
  paymentPlan: z.enum(['INSTALLMENTS', 'FULL_PAYMENT', 'BOTH']),
  
  // Amenities
  basicAmenities: z.array(z.string()),
  luxuryFeatures: z.array(z.string()),
  nearbyFacilities: z.string(),
  
  // Legal
  approvalStatus: z.string(),
  registrationDetails: z.string(),
  
  // Contact
  contactPhone: z.string(),
  contactEmail: z.string().email(),
  bookingProcedure: z.string(),
});

const propertyTypeOptions = [
  { id: 'apartments', label: 'Apartments' },
  { id: 'villas', label: 'Villas' },
  { id: 'shops', label: 'Shops' },
  { id: 'offices', label: 'Offices' },
  { id: 'plots', label: 'Plots' },
];

const amenityOptions = [
  { id: 'electricity', label: 'Electricity' },
  { id: 'gas', label: 'Gas' },
  { id: 'water', label: 'Water' },
  { id: 'security', label: 'Security' },
];

const luxuryFeatureOptions = [
  { id: 'swimming_pool', label: 'Swimming Pool' },
  { id: 'gym', label: 'Gym' },
  { id: 'community_center', label: 'Community Center' },
  { id: 'playground', label: 'Playground' },
  { id: 'mosque', label: 'Mosque' },
  { id: 'parking', label: 'Parking' },
];

export default function AddProject() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      developerName: '',
      projectType: 'RESIDENTIAL',
      projectStatus: 'ONGOING',
      launchDate: '',
      completionDate: '',
      city: '',
      area: '',
      googleMapsUrl: '',
      landmarks: '',
      propertyTypes: [],
      sizes: '',
      priceRangeStart: '',
      priceRangeEnd: '',
      paymentPlan: 'BOTH',
      basicAmenities: [],
      luxuryFeatures: [],
      nearbyFacilities: '',
      approvalStatus: '',
      registrationDetails: '',
      contactPhone: '',
      contactEmail: '',
      bookingProcedure: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    console.log("Submitting Data:", values); // Debugging
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Failed to submit project');
    }

    const result = await response.json();
    console.log('Project submitted successfully:', result);
    
    // Optionally, redirect to homepage or reset form
    form.reset();
    window.location.href = '/'; // Redirect to homepage

  } catch (error) {
    console.error('Error submitting project:', error);
  }
}


  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[300px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">List Your Project</h1>
              <p className="text-xl text-gray-200">Share your property project with potential buyers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-600 text-center">Complete the form below with accurate details about your property project</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Basic Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Bahria Town Karachi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="developerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Developer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., XYZ Builders & Developers" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                              <SelectItem value="MIXED_USE">Mixed Use</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ONGOING">Ongoing</SelectItem>
                              <SelectItem value="COMPLETED">Completed</SelectItem>
                              <SelectItem value="UPCOMING">Upcoming</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="launchDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Launch Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="completionDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Completion</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Karachi, Lahore, Islamabad" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area</FormLabel>
                          <FormControl>
                            <Input placeholder="DHA, Gulshan, Johar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="googleMapsUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Maps Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Google Map Locations" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="landmarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearby Landmarks</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter nearby landmarks"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Property Types & Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="propertyTypes"
                    render={() => (
                      <FormItem>
                        <FormLabel>Available Units</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {propertyTypeOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="propertyTypes"
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
                    name="sizes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Sizes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter available sizes (e.g., 120 sq yd, 240 sq yd, 5 marla, 10 marla)"
                            className='bg-white text-gray-800'
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
                      name="priceRangeStart"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Starting Price (PKR)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter starting price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="priceRangeEnd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Price (PKR)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter maximum price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="paymentPlan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Plan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment plan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="INSTALLMENTS">Installments Only</SelectItem>
                            <SelectItem value="FULL_PAYMENT">Full Payment Only</SelectItem>
                            <SelectItem value="BOTH">Both Options Available</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Features & Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Features & Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="basicAmenities"
                    render={() => (
                      <FormItem>
                        <FormLabel>Basic Amenities</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                          {amenityOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="basicAmenities"
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
                  <Separator />
                  <FormField
                    control={form.control}
                    name="luxuryFeatures"
                    render={() => (
                      <FormItem>
                        <FormLabel>Luxury Features</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {luxuryFeatureOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="luxuryFeatures"
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
                  <FormField
                    control={form.control}
                    name="nearbyFacilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearby Facilities</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter nearby facilities (e.g., schools, hospitals, shopping malls)"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Legal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Legal & Approval Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="approvalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Government/NOC Approvals</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g, CDA, LDA, SBCA, etc."
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter registration details"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
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
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Developer Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Optional" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Authorized Agents Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter Agent email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phonenumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Authorized Agents Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Agent PhoneNumber" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="bookingProcedure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Procedure</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter booking procedure details"
                            className="min-h-[100px] bg-white text-gray-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Submit Project
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}