import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <main>
      <header className="p-4">
        <nav>
          <Link
            href="/login"
            className="capitalize text-white font-medium p-2 bg-primary rounded-sm"
          >
            Log In
          </Link>
        </nav>
      </header>
      <article className="container">
        <h1>Finvestor</h1>
        <p>Finvestor is your helper</p>
      </article>
    </main>
  );
};

export default HomePage;
