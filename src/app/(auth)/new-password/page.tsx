import CardWrapper from "@/components/auth/CardWrapper";
import UpdatePasswordForm from "@/components/features/auth/UpdatePasswordForm";

const NewPassword = () => {
  return (
    <CardWrapper
      logo="/img/logo.webp"
      headerLabel="Create New Password"
      backLinkText="Back to login"
      backLinkHref="/login"
    >
      <UpdatePasswordForm />
    </CardWrapper>
  );
};

export default NewPassword;
