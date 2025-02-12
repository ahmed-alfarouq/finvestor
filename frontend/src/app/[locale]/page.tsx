"use client";

// import { useTranslations } from "next-intl";
import DarkModeToggle from "@/components/DarkModeToggle";
import NavLink from "@/components/NavLink";
import { RiBillLine } from "react-icons/ri";
import { IoMdWallet } from "react-icons/io";
import CheckBox from "@/components/CheckBox";
import PasswordInput from "@/components/PasswordInput";
import CustomInput from "@/components/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from "@/components/PhoneInput";


const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must at least contain 8 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  age: z
    .number({ invalid_type_error: "Age must be a number!" })
    .min(18, "You must be at least 18 years old!"),
  dob: z
    .string()
    .refine((val) => new Date(val) < new Date(), "Date must be in the past!"),
});

type FormFields = z.infer<typeof formSchema>;

export default function HomePage() {
  // const t = useTranslations("HomePage");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      age: 0,
      dob: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      <div className="flex gap-2 py-2 bg-black flex-wrap">
        <DarkModeToggle />
        <NavLink
          to="/about"
          text="About"
          style="primary"
          beforeIcon={<IoMdWallet />}
        />
        <NavLink
          to="/home"
          text="Home"
          style="secondary"
          beforeIcon={<RiBillLine />}
        />
        <CheckBox
          id="terms-checkbox"
          label="Accept Terms & Conditions"
          checked={false}
        />
      </div>
      <div className="flex flex-col gap-1">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <PasswordInput
            name="password"
            label="Password"
            register={register}
            placeholder="Enter your password"
            error={errors.password}
          />
          <CustomInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
          />
          <PhoneInput
            label="Phone number"
            name="phone"
            register={register}
            error={errors.phone}
            control={control}
          />
          <CustomInput
            label="Age"
            type="number"
            placeholder="Enter your age"
            name="age"
            register={register}
            error={errors.age}
          />

          <CustomInput
            label="Date of Birth"
            type="date"
            name="dob"
            register={register}
            error={errors.dob}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-md w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
