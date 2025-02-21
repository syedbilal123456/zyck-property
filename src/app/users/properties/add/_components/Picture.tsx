import React from "react";
import { PropertyImage } from "@prisma/client";
import FileInput from "@/components/ui/FileInput";
import { toast } from "react-toastify";
import PictureCard from "@/app/user/properties/add/_components/PictureCard";

interface Props {
  images: File[];
  setImages: (images: File[]) => void;
  savedImagesUrl?: PropertyImage[];
  setSavedImageUrl?: (propertyImages: PropertyImage[]) => void;
}

const Picture = (props: Props) => {
  // Calculate total number of images (both saved and new uploads)
  const totalImages = (props.savedImagesUrl?.length || 0) + props.images.length;
  const images = props.savedImagesUrl?.length || 0;

  // Handle file selection with 5 image limit
  const handleFileSelect = (e: any) => {
    const newFile = e.target.files[0];
    // Check if adding a new image would exceed the 5 image limit
    if (totalImages >= 5) {
      toast.error("Maximum 5 images allowed");

      return;
    }
    props.setImages([newFile, ...props.images]);
  };

  // Handle deletion of saved images
  const handleSavedImageDelete = (imageToDelete: PropertyImage) => {
    if (props.setSavedImageUrl && props.savedImagesUrl) {
      props.setSavedImageUrl(
        props.savedImagesUrl.filter((img) => img.id !== imageToDelete.id)
      );
    }
  };

  // Handle deletion of newly uploaded images
  const handleNewImageDelete = (index: number) => {
    props.setImages([
      ...props.images.slice(0, index),
      ...props.images.slice(index + 1),
    ]);
  };

  return (
    <div className={`p-3`}>
      {/* Show file input only if total images is less than 5 */}
      {totalImages < 5 && (
        <FileInput onSelect={handleFileSelect} />
      )}

      {/* Display message when image limit is reached */}
      {totalImages >= 5 && (
        <p className="text-yellow-500 mb-2">
          Maximum number of images (5) reached. Delete some images to upload more.
        </p>
      )}

      <div className="flex gap-3 flex-wrap">
        {/* Render saved images */}
        {props.savedImagesUrl &&
          props.setSavedImageUrl &&
          props.savedImagesUrl.map((image, index) => {
            return (
              <PictureCard
                key={image.id}
                src={image.url}
                index={index}
                onDelete={() => handleSavedImageDelete(image)}
              />
            );
          })}

        {/* Render newly uploaded images */}
        {props.images.map((image, index) => {
          const srcUrl = URL.createObjectURL(image);
          return (
            <PictureCard
              key={srcUrl}
              src={srcUrl}
              index={index}
              onDelete={() => handleNewImageDelete(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Picture;