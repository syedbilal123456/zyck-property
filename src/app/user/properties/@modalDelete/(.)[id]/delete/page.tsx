// "use client";
// import { deleteProperty } from "@/lib/actions/property";
// import {
//   Button,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
// } from "@nextui-org/react";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// interface Props {
//   params: { id: string };
// }
// const ModalDeletePropertyPage = ({ params }: Props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();
//   useEffect(() => {
//     setIsOpen(true);
//   }, []);

//   const handldeDelete = async () => {
//     try {
//       await deleteProperty(Number(params.id));

//       router.push("/user/properties");

//       setIsOpen(false);
//     } catch (e) {
//       throw e;
//     }
//   };

//   const handleCancel = () => {
//     router.push("/user/properties");
//     setIsOpen(false);
//   };
//   return (
//     <Modal isOpen={isOpen} onOpenChange={handleCancel}>
//       <ModalContent>
//         <ModalHeader className="flex flex-col gap-1">Delete Property</ModalHeader>
//         <ModalBody>
//           <p>Are you sure to delete the property?</p>
//         </ModalBody>
//         <ModalFooter>
//           <Button onClick={handleCancel}>Cancel</Button>
//           <Button onClick={handldeDelete} color="danger" variant="light">
//             Delete
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default ModalDeletePropertyPage;


"use client";

import { deleteProperty } from "@/lib/actions/property";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  params: { id: string };
}

const ModalDeletePropertyPage = ({ params }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteProperty(Number(params.id));
      router.push("/user/properties");
      setIsOpen(false);
    } catch (e) {
      console.error("Error deleting property:", e);
    }
  };

  const handleCancel = () => {
    router.push("/user/properties");
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Property</h3>
            <p className="py-4">Are you sure you want to delete this property?</p>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDeletePropertyPage;
