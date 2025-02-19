"use client"
import Loader from '@/components/ui/loader';
import { editProperty, saveProperty } from '@/lib/actions/property';
import { propertiesDataLocalStorage } from '@/lib/constant';
import { removeLocalStorageItem } from '@/lib/localStorage';
import { uploadImages } from '@/lib/upload';
import { AddPropertyFormSchemaReplica } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { AreaType, City, Prisma, PropertyImage, PropertyStatus, PropertyType, PropertyTypeDetail, State } from '@prisma/client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import Basic from './Basic';
import Features from './Features';

interface Props {
    details: PropertyTypeDetail[]
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

export type AddPropertyFormSchemaReplica = z.infer<typeof AddPropertyFormSchemaReplica>

const Addform = ({ isEdit = false, ...props }: Props) => {
    const router = useRouter()
    const methods = useForm<AddPropertyFormSchemaReplica>({
        resolver: zodResolver(AddPropertyFormSchemaReplica),
        defaultValues: {
            contact: props.property?.contact ?? undefined,
            location: props.property?.location ?? undefined,
            name: props?.property?.name ?? undefined,
            price: props?.property?.price ?? undefined,
            description: props?.property?.description ?? undefined,
            propertyFeature: props.property?.feature ?? undefined,
            statusId: props.property?.statusId ?? undefined,
            typeId: props.property?.typeId ?? undefined,
            DetailId: props.property?.DetailId ?? undefined
        }
    })

    const { user } = useKindeBrowserClient()
    const [images, setImages] = useState<File[]>([])
    const [savedImagesUrl, setSavedImagesUrl] = useState<PropertyImage[]>(props.property?.images ?? [])
    const [Loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<AddPropertyFormSchemaReplica> = async (data) => {
        setLoading(true)

        const uploadedImageUrls = await uploadImages(images)

        try {
            if (isEdit && props.property) {
                const deleteImages = props.property?.images.
                    filter((item) => !savedImagesUrl.includes(item)).
                    map(item => item.id)
                await editProperty(props.property.id, data, uploadedImageUrls, deleteImages);
                removeLocalStorageItem(propertiesDataLocalStorage)
                toast.success("Property updated successfully");
            } else {
                await saveProperty(data, uploadedImageUrls, user)
                toast.success("Property Added successfully");
            }
            router.push("/user/properties");
            removeLocalStorageItem(propertiesDataLocalStorage)
        } catch (error) {
            console.error("Error saving property:", error);
            toast.error("Failed to add property. Please try again.");
        } finally {
            setLoading(false); // Hide loader
            removeLocalStorageItem(propertiesDataLocalStorage)
        }
    }
    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit, error => console.log(error))}>
                    {Loading && (
                        <div className="w-full h-full flex justify-center items-center absolute inset-0 bg-opacity-50 bg-black z-50">
                            <Loader />
                        </div>
                    )}
                <Basic
                 statuses={props.statuses}
                 types={props.types}
                 details={props.details} 
                 cities={props.city} 
                 states={props.state}/>                
                <Features />
                </form>
            </FormProvider>
        </div>
    )
}

export default Addform
