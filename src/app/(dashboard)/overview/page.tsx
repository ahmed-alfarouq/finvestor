import PageContainer from "@/components/page-container";
import GoalsBox from "@/components/features/overview/GoalsBox";
import LoansBox from "@/components/features/overview/LoansBox";
import ExpensesBox from "@/components/features/overview/ExpensesBox";
import StatisticsBox from "@/components/features/overview/StatisticsBox";
import TotalBalanceBox from "@/components/features/overview/TotalBalanceBox";
import RecentTransactions from "@/components/features/overview/RecentTransactions";

const OverviewPage = () => {
  return (
    <PageContainer>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-3">
        <TotalBalanceBox />
        <GoalsBox />
        <LoansBox />
      </section>
      <section className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-3">
        <RecentTransactions />
        <div className="h-full grid grid-cols-1 grid-rows-2 gap-8 md:gap-3 lg:col-span-2">
          <StatisticsBox transactions={[]} />
          <ExpensesBox transactions={[]} />
        </div>
      </section>
    </PageContainer>
  );
};

export default OverviewPage;
