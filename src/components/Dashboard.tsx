import { Separator } from "@/components/ui/separator";

// todo: add fetch from insidex and fetch from blockchain
export const Dashboard = () => {
  const coins = [
    { name: "SUI", price: 5, amount: 1000 },
    { name: "AAA", price: 10, amount: 10 },
    { name: "DEEP", price: 15, amount: 300 },
    { name: "NS", price: 1, amount: 1000 },
    { name: "WAL", price: 0.08, amount: 5000 },
    { name: "KAL", price: 0.000005, amount: 1000000 },
    { name: "SRAL", price: 6, amount: 10 },
  ];

  const totalBalance = coins.reduce((sum, coin) => sum + coin.price * coin.amount, 0);
  // Sort coins by value (price * amount)
  const sortedCoins = coins.sort((a, b) => b.price * b.amount - a.price * a.amount);
  // Take top 4 coins
  const topCoins = sortedCoins.slice(0, 4);

  // Calculate sum of remaining coins
  const otherCoins = sortedCoins.slice(4);
  const Chart = () => {
    const otherTotal = otherCoins.reduce((sum, coin) => sum + coin.price * coin.amount, 0);

    // Create chart data
    const chartData = [
      ...topCoins.map((coin) => ({
        name: coin.name,
        value: ((coin.price * coin.amount) / totalBalance) * 100,
      })),
      {
        name: "Other",
        value: (otherTotal / totalBalance) * 100,
      },
    ];

    return (
      <div className="flex items-baseline gap-4 h-64 mt-8">
        {chartData.map((item, index) => (
          <div key={index} className="flex h-full flex-col items-center">
            <div
              className="w-10 bg-white rounded-t"
              style={{
                height: `${item.value}%`,
              }}
            />
            <span className="text-sm mt-2">{item.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full text-white p-4 mt-5 bg-gray-950 rounded-2xl w-1/3">
      <h1 className="font-bold">Balance:</h1>
      <p className="text-3xl font-medium">${totalBalance}</p>
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
      <h2>Top tokens holding:</h2>
      {topCoins.map((coin) => (
        <p className="font-black">{coin.name}</p>
      ))}
      <Chart />
    </div>
  );
};
