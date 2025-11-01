import CardWrapper from "@/components/auth/card-wrapper";
import LoginForm from "@/components/features/auth/login-form";

const LoginPage = () => {
  return (
    <CardWrapper
      logo="/img/logo.webp"
      backLinkText="Create an account"
      backLinkHref="/register"
      showSocial
    >
      <LoginForm />
    </CardWrapper>
  );
};

export default LoginPage;
