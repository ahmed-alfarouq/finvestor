"use client";

const NotAvailable = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <section>
      <h2 className="card-title">{title}</h2>
      <div className="bg-destructive-dark/20 text-special-red text-xl font-medium text-center rounded-md mt-5 px-2 py-4">
        {message}
      </div>
    </section>
  );
};

export default NotAvailable;
