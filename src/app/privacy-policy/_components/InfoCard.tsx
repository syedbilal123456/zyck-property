import React, { ReactNode } from "react";
import {
  Shield,
  CheckCircle,
  Clock,
  X,
  RefreshCw,
  ShoppingCart,
  Target,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type PolicySectionProps = {
  icon: LucideIcon; // Type for the Lucide icons
  title: string;
  children: ReactNode;
  image?: string; // Make the image prop optional
};

const PolicySection: React.FC<PolicySectionProps> = ({
  icon: Icon,
  title,
  children,
  image,
}) => (
  <Card className="mb-6 flex justify-between items-center">
    <div>
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="w-8 h-8 text-emerald-500">
          <Icon size={24} />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">{children}</div>
        <button className="mt-4 text-emerald-500 hover:text-emerald-600 font-medium">
          See More
        </button>
      </CardContent>
    </div>
    {image && ( // Conditionally render the Image component
      <div>
        <Image src={image} width={900} height={800} alt={title} />
      </div>
    )}
  </Card>
);

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <PolicySection image="/pp-1.png" icon={Shield} title="Security Measures">
        We have implemented security policies, rules and technical measures to
        protect the personal data that we have under our control from
        unauthorised access, improper use and disclosure, unauthorised
        destruction or accidental loss.
      </PolicySection>

      <PolicySection image="/pp-2.png" icon={CheckCircle} title="Payment Data">
        We employ a third-party provider for processing credit card payments.
        They have access to personal information needed to perform their
        functions but may not use it for other purposes. We do not have access
        to or retain any of your payment information.
      </PolicySection>

      <PolicySection image="/pp-3.png" icon={RefreshCw} title="Updates To Policy">
        We reserve the right to vary this policy from time to time. Our updated
        policy will be displayed on the Website, and by continuing to use and
        access the Platform, following such changes, you agree to be bound by
        any variation made by us.
      </PolicySection>

      <PolicySection image="/pp-4.png" icon={Clock} title="Cookies">
        We may send a small file to your computer or device when you visit our
        Website (a cookie). This will enable us to identify your computer, track
        your behaviour on our Website and to identify your particular areas of
        interest so as to personalise and enhance your experience on this
        Website.
      </PolicySection>

      <PolicySection icon={X} title="Data Deletion Request">
        You may request that we delete your personal data by emailing us at
        contactus@zameen.com. We will endeavour to comply with such deletion
        requests but in certain circumstances we will be unable to delete your
        personal data as we may be required to retain it for legal, regulatory
        and/or compliance reasons
      </PolicySection>

      <PolicySection icon={ShoppingCart} title="Disclosure Of Information">
        In the unlikely event that a liquidator, administrator or receiver is
        appointed over us or all or any part of our assets that insolvency
        practitioner may transfer your information to a third party purchaser of
        the business provided that purchaser undertakes to use your information
        for the same purposes as set out in this policy.
      </PolicySection>

      <PolicySection icon={Target} title="Who We Share Your Personal Information With">
        Your personal information (which includes your name, address and any
        other details you provide to us which concern you as an individual) may
        be processed both by us. We may also share your information with: (i)
        third parties we use to help deliver our products and services to you
        (for example, payment service providers).
      </PolicySection>

      <PolicySection icon={Target} title="Purpose Of Processing">
        Your information will allow us to provide you with access to the
        particular parts of the Platform relevant to you and allow us to supply
        the Services you require. We will use your information for the purpose
        of informing you of special offers and providing other marketing
        information to you which we think you may find of interest, undertaking
        services or customer research/development.
      </PolicySection>
    </div>
  );
};

export default PrivacyPolicy;
