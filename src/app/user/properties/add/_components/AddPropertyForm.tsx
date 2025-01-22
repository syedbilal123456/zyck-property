"use client";
import React, { useEffect, useState } from "react";
import Stepper from "./Stepper";
import Basic from "./basic";
import { City, Prisma, PropertyImage, PropertyStatus, PropertyType, PropertyTypeDetail, State } from "@prisma/client";
import Location from "./Location";
import Features from "./Features";
import Picture from "./Picture";
import Contact from "./Contact";
import { AddPropertyFormSchema } from "@/lib/zodSchema";
import z from "zod";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImages } from "@/lib/upload";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { editProperty, saveProperty } from "@/lib/actions/property";
import clsx from "clsx";
import Loader from "@/components/ui/loader";



interface Props {
  details : PropertyTypeDetail[]
  city: City[];
  state: State[]
  types: PropertyType[];
  statuses: PropertyStatus[];
  property?: Prisma.PropertyGetPayload<{
    include: {
      location: true;
      feature: true;
      contact: true;
      images: true;
    };
  }>;
  isEdit?: boolean;
}

const steps = [
  { label: "Basic" },
  { label: "Location" },
  { label: "Features" },
  { label: "Pictures" },
  { label: "Contact" },
];

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;

const AddPropertyForm = ({ isEdit = false, ...props }: Props) => {
  const router = useRouter();
  const methods = useForm<AddPropertyInputType>({
    resolver: zodResolver(AddPropertyFormSchema),
    defaultValues: {
      contact: props.property?.contact ?? undefined,
      location: props.property?.location ?? undefined,
      name: props?.property?.name ?? undefined,
      price: props?.property?.price ?? undefined,
      description: props?.property?.description ?? undefined,
      propertyFeature: props.property?.feature ?? undefined,
      statusId: props.property?.statusId ?? undefined,
      typeId: props.property?.typeId ?? undefined,
      DetailId: props.property?.DetailId ?? undefined,
    },
  });


  const [step, setStep] = useState(0);
  const { user } = useKindeBrowserClient();
  const [images, setImages] = useState<File[]>([]);
  const [savedImagesUrl, setSavedImagesUrl] = useState<PropertyImage[]>(props.property?.images ?? []);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // If details are fetched, make sure to update the state
  console.log('Default Values:', methods.getValues());


  const onsubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
    setIsLoading(true); // Show loader
    const imageUrls = await uploadImages(images);

    try {
      if (isEdit && props.property) {
        const deleteImagesIDs = props.property?.images
          .filter((item) => !savedImagesUrl.includes(item))
          .map((item) => item.id);

        await editProperty(props.property.id, data, imageUrls, deleteImagesIDs);
        toast.success("Property updated successfully");
      } else {
        await saveProperty(data, imageUrls, user?.id!);
        toast.success("Property added successfully");
      }
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error("Failed to add property. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader
      router.push("/user/properties");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
      <FormProvider {...methods}>
        <form
          className="mt-3 p-6 bg-transparent shadow-md rounded-lg space-y-8"
          onSubmit={methods.handleSubmit(onsubmit, (error) => console.log({ error }))}
        >
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center absolute inset-0 bg-opacity-50 bg-black z-50">
              <Loader />
            </div>
          )}

          <Basic
            cities={props.city}
            states={props.state}
            className={clsx({ hidden: step !== 0 })}
            statuses={props.statuses}
            types={props.types}
            next={() => setStep((prev) => prev + 1)} 
            details={props.details}         />
         
          <Location
           cities={props.city}
           states={props.state}
           statuses={props.statuses}
           types={props.types}
           details={props.details}   
            next={() => setStep((prev) => prev + 1)}
            prev={() => setStep((prev) => prev - 1)}
            className={clsx({ hidden: step !== 1 })}
          />
       
          <Features
            next={() => setStep((prev) => prev + 1)}
            prev={() => setStep((prev) => prev - 1)}
            className={clsx({ hidden: step !== 2 })}
          />
          <Picture
            {...(props.property && {
              savedImagesUrl: savedImagesUrl,
              setSavedImagesUrl: setSavedImagesUrl,
            })}
            images={images}
            setImages={setImages}
            next={() => setStep((prev) => prev + 1)}
            prev={() => setStep((prev) => prev - 1)}
            className={clsx({ hidden: step !== 3 })}
          />
          <Contact
            prev={() => setStep((prev) => prev - 1)}
            className={clsx({ hidden: step !== 4 })}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default AddPropertyForm;
