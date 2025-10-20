"use client";
import { useState } from "react";

import TargetForm from "./target-form";
import ModalWrapper from "./modal-wrapper";

import { EditIcon } from "lucide-react";

const TargetModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);
  return (
    <>
      <button
        className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        onClick={toggleModal}
      >
        <EditIcon />
      </button>
      <ModalWrapper isOpen={isOpen} close={toggleModal}>
        <TargetForm />
      </ModalWrapper>
    </>
  );
};

export default TargetModal;
