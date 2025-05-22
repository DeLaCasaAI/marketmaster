
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
          MarketMaster POS
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A point-of-sale application designed for small businesses selling at fairs and farmer's markets.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Key Features</h2>
            <ul className="text-left space-y-2 text-gray-700">
              <li>✅ Sales Tracking</li>
              <li>✅ Item Management</li>
              <li>✅ Event Tracking</li>
              <li>✅ Financial Reporting</li>
              <li>✅ Mobile-Friendly</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">How It Works</h2>
            <ol className="text-left space-y-2 text-gray-700 list-decimal list-inside">
              <li>Set up products with base prices and discounts</li>
              <li>Create events for each market day</li>
              <li>Record sales during the event</li>
              <li>View daily reports and profit calculations</li>
            </ol>
          </div>
        </div>

        <Link to="/market-master">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Launch MarketMaster <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
