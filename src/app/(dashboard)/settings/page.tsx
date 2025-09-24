import PageContainer from "@/components/page-container";
import UserForm from "@/components/features/settings/UserForm";
import PasswordForm from "@/components/features/settings/PasswordForm";
import TwoFactorForm from "@/components/features/settings/TwoFactorForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => {
  return (
    <PageContainer>
      <section className="w-full dark:bg-default-dark card-shadow px-8 pt-6 pb-12 rounded-lg">
        <Tabs defaultValue="account">
          <TabsList className="space-x-8">
            <TabsTrigger
              value="account"
              className="text-base font-semibold text-gray-3 dark:text-gray-6"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="text-base font-semibold text-gray-3 dark:text-gray-6"
            >
              Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-5">
            <UserForm />
          </TabsContent>
          <TabsContent value="security" className="mt-5">
            <PasswordForm />
            <TwoFactorForm />
          </TabsContent>
        </Tabs>
      </section>
    </PageContainer>
  );
};

export default SettingsPage;
