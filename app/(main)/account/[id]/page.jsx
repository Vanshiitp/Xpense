import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { ClipLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

async function AccountContent({ id }) {
    const accountData = await getAccountWithTransactions(id);
    
    if (!accountData) {
        notFound();
    }

    const { transactions, ...account } = accountData;

    return (
        <>
            <div className="flex gap-4 items-end justify-between">
                <div>
                    <h1 className="text-5xl pb-1 sm:text-6xl font-semibold tracking-tight capitalize">
                        {account.name}
                    </h1>
                    <p className="text-muted-foreground">
                        {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
                    </p>
                </div>

                <div className="text-right pb-2">
                    <div className="text-xl sm:text-2xl font-bold">
                        ₹{parseFloat(account.balance).toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {account._count.transactions} Transactions
                    </p>
                </div>
            </div>

            <div className="mt-4 mb-4">
                <AccountChart transactions={transactions} />
            </div>

            <TransactionTable transactions={transactions} />
        </>
    );
}

export default async function AccountPage({ params: paramsPromise }) {
    const params = await paramsPromise;

    return (
        <div className="space-y-1 px-7">
            <Suspense fallback={
                <div className="h-[calc(100vh-200px)] flex items-center justify-center">
                    <ClipLoader 
                        color="#000000"
                        size={50}
                        aria-label="Loading Account Data"
                        className="opacity-70"
                    />
                </div>
            }>
                <AccountContent id={params.id} />
            </Suspense>
        </div>
    );
}