import Count from "@/components/Count";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <section className="flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            NextJs + TypeScript + Hardhat
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
            For Dapp development on Electroneum Smart Chain
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 pb-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Count />
        </div>
      </section>
    </main>
  );
}

