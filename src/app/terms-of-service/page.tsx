import React from "react";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-third-color p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Terms of Service
        </h1>
        <p className="text-default-black mb-4">
          Welcome to Finvestor. By using our website, you agree to the following
          terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="text-default-black mb-4">
          By accessing and using this site, you accept and agree to be bound by
          the terms and conditions outlined here.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Changes to Terms</h2>
        <p className="text-default-black mb-4">
          We reserve the right to update these terms at any time. Continued use
          of our service constitutes acceptance of the revised terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. User Responsibilities
        </h2>
        <p className="text-default-black mb-4">
          You agree to use the website responsibly and not to engage in any
          fraudulent or harmful activities.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact Us</h2>
        <p className="text-default-black mb-4">
          If you have any questions about these terms, please contact us at{" "}
          <span className="text-blue-600">support@finvestor.com</span>.
        </p>

        <p className="text-gray-600 text-sm text-center mt-8">
          Last updated: February 2025
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
