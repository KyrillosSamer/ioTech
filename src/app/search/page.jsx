import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import Loading from "@/components/Loading";

export default function SearchPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <Loading />
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
