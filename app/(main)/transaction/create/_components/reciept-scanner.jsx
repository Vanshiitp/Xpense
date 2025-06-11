"use client";

import { useRef, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete, onScanError }) {
  const fileInputRef = useRef(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  // Add a ref to track if scannedData has been processed
  const hasProcessedScan = useRef(false);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Reset the processed flag before scanning
    hasProcessedScan.current = false;
    await scanReceiptFn(file);
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading && !hasProcessedScan.current) {
      if (scannedData.isValid) {
        onScanComplete(scannedData);
        toast.success("Receipt scanned successfully");
        hasProcessedScan.current = true; // Mark as processed
      } else {
        // Call the error callback for invalid scans
        if (onScanError) {
          onScanError(scannedData.error || "Invalid receipt");
        }
        toast.error(scannedData.error || "Invalid receipt");
        hasProcessedScan.current = true; // Mark as processed even if invalid
      }
    }
  }, [scanReceiptLoading, scannedData, onScanComplete, onScanError]);

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
          // Reset the input value so the same file can be selected again
          e.target.value = '';
        }}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </Button>
    </div>
  );
}