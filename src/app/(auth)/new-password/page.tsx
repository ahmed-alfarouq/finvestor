import CardWrapper from "@/components/auth/card-wrapper";
import UpdatePasswordForm from "@/components/features/auth/update-password-form";

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
