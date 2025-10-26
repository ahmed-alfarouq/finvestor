import CardWrapper from "@/components/auth/card-wrapper";
import ForgotPasswordForm from "@/components/features/auth/forgot-password-form";

const ForgotPassword = () => {
  return (
    <CardWrapper
      logo="/img/logo.webp"
      headerLabel="Forgot Password?"
      headerText="Enter your email address to get the password reset link."
      backLinkText="Back to login"
      backLinkHref="/login"
    >
      <ForgotPasswordForm />
    </CardWrapper>
  );
};

export default ForgotPassword;
