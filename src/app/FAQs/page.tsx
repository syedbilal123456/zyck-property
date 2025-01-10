import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // ShadCN Accordion
import { Card } from "@/components/ui/card"; // ShadCN Card for styling

export default function FAQPage() {
  return (
    <div className="w-full px-4 sm:px-10 lg:px-16 mt-10">
      <h1 className="md:text-5xl text-3xl text-primary font-bold text-center mb-5">Still Have Questions?</h1>
      <h1 className="text-xl  text-center mb-3">Check out our FAQs.</h1>

      <Card className="w-full p-6 bg-background text-foreground">
        <Accordion type="single" collapsible>
      
          <AccordionItem value="item-1">
            <AccordionTrigger className=" text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
            What is Zyck Property?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 md:text-lg">
            Zyck Property is a platform where users can buy, sell, rent, or post ads for real estate properties. We provide a secure environment for users to connect and transact directly with each other.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              What is the property search feature?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Our property search feature allows you to filter properties based on location, price, and other criteria.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              How do I list a property for sale?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              To list a property, simply create an account, and use our easy-to-use property listing form to provide details and photos.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
          Is my personal information safe on your website?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
            Yes, your personal information is safe with us. We do not use cookies to track your information. Any personal information we collect is kept secure and confidential. We do not share your information with third parties without your consent, except as required by law.            </AccordionContent>
          </AccordionItem>

          {/* FAQ 4 */}
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg md:text-xl   flex items-center gap-2 hover:no-underline ">
              Is there any fee to use the platform?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Basic property browsing is free for users, but premium features like listing properties and accessing detailed analytics may require a subscription.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 5 */}
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              Can I filter properties by specific features?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes! You can filter properties based on features like the number of bedrooms, parking availability, and square footage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
            How can I contact with seller?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
            Each ad has a contact form or contact details provided by the seller or landlord. You can use these to get in touch directly and discuss the property.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
            How can I edit and delete my ad?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
            To edit or delete your ad, log in to your account and navigate to the "Show my Listing" section. Here, you can make changes to your existing ads or remove them if they are no longer available.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
