import { TrashIcon } from "@heroicons/react/16/solid";
import React from "react";
<<<<<<< HEAD
=======
import Image from "next/image";
>>>>>>> main

interface Props {
  src: string;
  index: number;
  onDelete: (index: number) => void;
}

const PictureCard = ({ src, onDelete, index }: Props) => {
  return (
    <div className="flex flex-col items-center">
<<<<<<< HEAD
      <img src={src} className="w-36 h-36 object-contain" alt="Uploaded" />
=======
      <Image  height={200 } width={200} src={src} className="w-36 h-36 object-contain" alt="Uploaded" />
>>>>>>> main
      <button
        className="mb-2"
        onClick={() => onDelete(index)}
      >
        <TrashIcon className="text-red-400 w-4" />
      </button>
    </div>
  );
};

export default PictureCard;
