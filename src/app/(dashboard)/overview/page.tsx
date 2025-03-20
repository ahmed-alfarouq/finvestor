import TotalBalanceBox from "@/components/features/overview/TotalBalanceBox";

export default function OverviewPage() {
  return (
    <section className="flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <section className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <TotalBalanceBox
          accounts={[]}
          totalBanks={4}
          totalCurrentBalance={1200}
        />
      </section>
    </section>
  );
}
