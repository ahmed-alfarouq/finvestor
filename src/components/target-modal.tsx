import TargetForm from "./target-form";
import ModalTrigger from "./modal-trigger";
import ModalWrapper from "./modal-wrapper";

import { EditIcon } from "lucide-react";

const TargetModal = ({
  category,
  userId,
}: {
  category?: string;
  userId: string;
}) => {
  return (
    <>
      <ModalTrigger
        icon={EditIcon}
        name="target-modal"
        ariaLable="Toggle Target Modal"
        className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
      />
      <ModalWrapper name="target-modal">
        <TargetForm category={category} userId={userId} />
      </ModalWrapper>
    </>
  );
};

export default TargetModal;
