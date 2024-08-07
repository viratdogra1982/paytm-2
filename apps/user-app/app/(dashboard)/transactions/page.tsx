 import prisma from "@repo/db/client";

 import { BalanceCard } from "../../../components/BalanceCard";
 import { OnRampTransactions } from "../../../components/OnRampTransactions";
 import { getServerSession } from "next-auth";
 import { authOptions } from "../../lib/auth";

  async function getBalance() {
      const session = await getServerSession(authOptions);
      const balance = await prisma.balance.findFirst({
          where: {
              userId: Number(session?.user?.id)
          }
      });
      return {
          amount: balance?.amount || 0,
          locked: balance?.locked || 0
      }
  }

  async function getOnRampTransactions() {
      const session = await getServerSession(authOptions);
      const txns = await prisma.onRampTransaction.findMany({
          where: {
              userId: Number(session?.user?.id)
          }
      });
      return txns.map(t => ({
          time: t.startTime,
          amount: t.amount,
          status: t.status,
          provider: t.provider
      }))
  }
  export default async function() {
      const balance = await getBalance();
      const transactions = await getOnRampTransactions();

      return (
        <div className="w-full">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transactions
            </div>
            <div className="w-full flex justify-center">
                <div className="w-full pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
                <div className="pt-4 pl-4 pr-4 w-full">
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                </div>
            </div>
        </div>
    );
    }

