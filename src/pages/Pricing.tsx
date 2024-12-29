import { AppLayout } from "@/components/layout/AppLayout";
import { PricingTable } from "@/components/dashboard/PricingTable";

const Pricing = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-modelboard-red">Plan</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your needs and start collaborating with creators worldwide
          </p>
        </div>
        <PricingTable />
      </div>
    </AppLayout>
  );
};

export default Pricing;