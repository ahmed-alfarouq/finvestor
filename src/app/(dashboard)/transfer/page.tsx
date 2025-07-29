import PageContainer from "@/components/page-container";
import TransferForm from "@/components/transfer-form";

const TransferPage = () => {
  return (
    <PageContainer>
      <header>
        <h2 className="text-3xl font-semibold mb-2">Payment Transfer</h2>
        <p>
          Please provide any specific details or notes related to the payment
          transfer
        </p>
      </header>
      <section className="mt-4">
        <section className="border-b pb-3">
          <h3 className="text-lg font-semibold">Transfer details</h3>
          <p className="text-sm">Enter the details of the recipient</p>
        </section>
        <TransferForm />
      </section>
    </PageContainer>
  );
};

export default TransferPage;
