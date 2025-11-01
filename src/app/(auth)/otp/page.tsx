import { redirect } from "next/navigation";

import CardWrapper from "@/components/auth/card-wrapper";
import OTPForm from "@/components/features/auth/otp-form";

const OtpPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | undefined }>;
}) => {
  const { token } = await searchParams;

  if (!token) redirect("/login");

  return (
    <CardWrapper logo="/img/logo.webp" backLinkText="" backLinkHref="">
      <OTPForm token={token} />
    </CardWrapper>
  );
};

export default OtpPage;
