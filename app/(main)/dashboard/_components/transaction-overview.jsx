"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,} from "recharts";
import { format, startOfWeek, endOfWeek, startOfYear, endOfYear } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1"];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );
  const [selectedInterval, setSelectedInterval] = useState('MONTHLY');

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for selected interval
  const currentDate = new Date();

  const filterTransactionsByInterval = (transactions, interval, date) => {
    return transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      switch (interval) {
        case 'MONTHLY':
          return transactionDate.getMonth() === date.getMonth() &&
                 transactionDate.getFullYear() === date.getFullYear();
        case 'WEEKLY':
          const start = startOfWeek(date);
          const end = endOfWeek(date);
          return transactionDate >= start && transactionDate <= end;
        case 'YEARLY':
          return transactionDate.getFullYear() === date.getFullYear();
        default:
          return false;
      }
    });
  };

  const filteredExpenses = filterTransactionsByInterval(
    accountTransactions.filter(t => t.type === 'EXPENSE'),
    selectedInterval,
    currentDate
  );

  // Group expenses by category
  const expensesByCategory = filteredExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for list
  const breakdownData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );
  
    function capitalize(str) {
       return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const intervalTitle = () => {
        switch(selectedInterval) {
            case 'MONTHLY':
                return 'Monthly Expense Breakdown';
            case 'WEEKLY':
                return 'Weekly Expense Breakdown';
            case 'YEARLY':
                return 'Yearly Expense Breakdown';
            default:
                return 'Expense Breakdown';
        }
    }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-normal">
            Recent Transactions
          </CardTitle>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.description || "Untitled Transaction"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(transaction.date), "PP")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex items-center",
                        transaction.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      )}
                      ₹{transaction.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-normal">
            {intervalTitle()}
          </CardTitle>
          <Select value={selectedInterval} onValueChange={setSelectedInterval}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0 pb-5">
          {breakdownData.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No expenses for this {selectedInterval.toLowerCase().slice(0, -2)}
            </p>
          ) : (
            <div className="space-y-2 px-4">
              {breakdownData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    {capitalize(entry.name)}
                  </div>
                  <div>₹{entry.value.toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}