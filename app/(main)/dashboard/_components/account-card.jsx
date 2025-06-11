"use client";

import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;
  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success && !updateDefaultLoading) {
      setTimeout(() => {
        toast.success("Default account updated successfully");
      }, 2000);
    }
  }, [updatedAccount, updateDefaultLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <div className="relative">
            {updateDefaultLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md z-10">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
          ₹{parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}