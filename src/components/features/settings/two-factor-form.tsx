"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import FormInput from "@/components/auth/form-input";
import ModalWrapper from "@/components/modal-wrapper";

import { updateUser2FA } from "@/actions/user/updateUser";
import { User } from "@/types";

const formSchema = z.object({
  password: z.string().min(1, "Password is required!"),
});

type FormSchema = z.infer<typeof formSchema>;

const TwoFactorForm = ({ user }: { user: User }) => {
  const [statusLabel, setStatusLabel] = useState("Enable");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    setStatusLabel(user?.isTwoFactorEnabled ? "Disable" : "Enable");
  }, [user?.isTwoFactorEnabled]);

  const toggleModal = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsModalOpen((prev) => !prev);
  };

  const onSubmit = (data: FormSchema) => {
    setErrorMessage("");
    setSuccessMessage("");

    startTransition(async () => {
      const res = await updateUser2FA({
        userId: user.id,
        password: data.password,
        isTwoFactorEnabled: !user.isTwoFactorEnabled,
      });

      if (res.error) {
        setErrorMessage(res.error);
        return;
      }

      setSuccessMessage(res.success);
      setStatusLabel((prev) => (prev === "Enable" ? "Disable" : "Enable"));
      form.reset();

      // Close modal after 1.5 seconds
      setTimeout(() => {
        toggleModal();
      }, 1500);
    });
  };

  return (
    <section className="mt-8 pt-4 border-t border-special-1">
      <h2 className="text-secondary-color dark:text-secondary-color-dark text-lg font-semibold">
        {statusLabel} Two-factor authentication (2FA)
      </h2>

      <Button size="lg" onClick={toggleModal} className="mt-4 w-48">
        {statusLabel} 2FA
      </Button>

      <ModalWrapper isOpen={isModalOpen} close={toggleModal}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInput
              type="password"
              name="password"
              label="Password"
              control={form.control}
              placeholder="***********"
              disabled={isPending}
            />

            <FormError message={errorMessage} />
            <FormSuccess message={successMessage} />

            <Button
              size="lg"
              type="submit"
              disabled={isPending}
              className="mx-auto"
            >
              {statusLabel} 2FA
            </Button>
          </form>
        </Form>
      </ModalWrapper>
    </section>
  );
};

export default TwoFactorForm;
