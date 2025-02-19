"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import CustomInput from "@/components/CustomInput";
import PasswordInput from "@/components/PasswordInput";
import CheckBox from "@/components/CheckBox";
import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";

import { handleGoogleLogin, handleLogin } from "@/app/actions/auth";

const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
  keepMe: z.boolean(),
});
type LoginFields = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      keepMe: false,
    },
  });

  const onSubmit = useCallback(async (data: LoginFields) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("keepMe", String(data.keepMe));

    await handleLogin(formData);
  }, []);

  return (
    <>
      <Image
        src="/logo.webp"
        alt="logo"
        aria-hidden="true"
        width={300}
        height={300}
        className="mx-auto"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] p-4 pb-0 mx-auto mt-5"
      >
        <CustomInput
          type="email"
          name="email"
          label="Email Address"
          register={register}
          error={errors.email}
          className="capitalize mb-5"
        />
        <PasswordInput
          name="password"
          label="Password"
          register={register}
          error={errors.password}
          className="capitalize mb-5"
        />
        <Link href="/forgot-password" className="text-sm text-primary">
          forgot password
        </Link>
        <CheckBox
          label="Keep me loggin."
          register={register}
          name="keepMe"
          className="font-light"
        />
        <Button
          type="submit"
          className="w-full capitalize rounded-sm"
          size="lg"
        >
          Log in
        </Button>
        <div className="w-fit mx-auto my-8 text-gray-7 text-sm text-center relative before:absolute before:bottom-[9px] before:-left-28 before:h-[1px] before:w-24 before:bg-third-color before:opacity-25 after:absolute after:bottom-[9px] after:-right-28 after:h-[1px] after:w-24 after:bg-third-color after:opacity-25">
          Or signin with
        </div>
      </form>

      <form action={handleGoogleLogin} className="w-[400px] p-4 pt-0 mx-auto">
        <Button
          type="submit"
          className="flex w-full bg-secondary text-third-color capitalize rounded-sm hover:bg-secondary"
          size="lg"
        >
          <FcGoogle size={24} />
          continue with google
        </Button>
      </form>
    </>
  );
};

export default LoginPage;
