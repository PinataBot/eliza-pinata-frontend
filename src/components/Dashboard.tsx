import { Separator } from "@/components/ui/separator";

export const Dashboard = () => {
  return (
    <div className="h-full text-white p-4 mt-5 bg-gray-950 rounded-2xl w-1/3">
      <h1 className="font-bold">Balance:</h1>
      <p className="text-3xl font-medium">$1000</p>
      <div className="flex flex-wrap justify-between">
        <div>
          <p className="text-gray-100 text-sm">trades</p>
          <p className="text-xl font-medium">140</p>
        </div>
        <div>
          <p className="text-gray-100 text-sm">tokens</p>
          <p className="text-xl font-medium">10</p>
        </div>
      </div>
      <Separator />
      <p>Data data</p>
      <p>Data data</p>
      <p>Data data</p>
      <p>Data data</p>
      <p>Data data</p>
      <p>Data data</p>
      <p>Data data</p>
    </div>
  );
};
