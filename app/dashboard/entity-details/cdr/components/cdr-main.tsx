"use client";

import { useDataExploreStore } from "@/stores/admin/data-explore-store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JsonView from "@/components/json-view";
import { useParams, useRouter } from "next/navigation";
import EntitySkeleton from "../../components/entity-skeleton";
import RevisionsTable from "./revisions-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CDRMain() {
  const router = useRouter();
  const { id: incomingId } = useParams();
  const [id, setId] = useState<string>((incomingId as string) || "");

  const { doCDRGet, currentCDR, revisionList, loading } = useDataExploreStore();

  useEffect(() => {
    fetchCDR();
  }, []);

  const fetchCDR = async () => {
    if (!id) {
      return;
    }
    const params = { _id: id };
    await doCDRGet(params);
  };

  const goNextCDREntity = () => {
    router.push(`/dashboard/entity-details/cdr/${id}`);
  };

  console.log("revisions: ", revisionList)
  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">
          CDR Record: ({currentCDR?._id})
        </h1>

        <div className="flex items-center gap-4">
          <Input
            value={id}
            onChange={(e) => setId(e.target.value.trim())}
            placeholder="Enter id"
            className="max-w-max min-w-[150px]"
          />

          <Button loading={loading} onClick={goNextCDREntity} size="sm">
            Fetch Records
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <Card>
        <CardHeader>
          {currentCDR && (
           <CardTitle>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-md">
                  {currentCDR.type.toUpperCase()}
                </h1>
                <p>:{currentCDR._id}</p>
              </div>
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <EntitySkeleton />
          ) : currentCDR ? (
              <div className="space-y-4">
                <JsonView jsonObj={currentCDR} />
                {revisionList && revisionList.length > 0 ? (
                  <>
                    <h1 className="font-bold text-md">
                        Revisions ({revisionList?.length})
                    </h1>
                    <RevisionsTable revisionList={revisionList} />
                  </>
                ):  <p>No revisions found for this id.</p>}
              </div>
          ) : (
           
            <p>No results found for this id.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
