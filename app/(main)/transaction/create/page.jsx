import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { getTransaction } from "@/actions/transaction";
import { AddTransactionForm } from "./_components/transaction-form";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

async function TransactionContent({ editId }) {
  const accounts = await getUserAccounts();
  let initialData = null;
  
  if(editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        {
          editId ? <h1 className="text-4xl md:text-5xl font-semibold text-center w-full">Edit Transaction</h1>
          :  <h1 className="text-4xl md:text-5xl font-semibold text-center w-full">Add Transaction</h1>
        }
      </div>
      <AddTransactionForm
      accounts={accounts}
      categories={defaultCategories}
      editMode={!!editId}
      initialData={initialData}
     />
      
    </div>
  );
}

export default async function AddTransactionPage({ searchParams: paramsPromise }) {
  const searchParams = await paramsPromise;
  const editId = searchParams?.edit;

  return (
    <Suspense fallback={
      <div className="h-[calc(100vh-200px)] flex items-center justify-center">
        <ClipLoader 
          color="#000000"
          size={50}
          aria-label="Loading Transaction Data"
          className="opacity-70"
        />
      </div>
    }>
      <TransactionContent editId={editId} />
    </Suspense>
  );
}


