const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full flex-1 flex-col gap-3 px-5 sm:px-8 py-7 lg:py-12">
      {children}
    </main>
  );
};

export default PageContainer;
