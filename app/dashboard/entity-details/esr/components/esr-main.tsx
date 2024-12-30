"use client";

import {
  useDataExploreStore,
  esrEntities,
} from "@/stores/admin/data-explore-store";
import { ESRIndex, ESRQueryParams } from "@/types/admin";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import JsonView from "@/components/json-view";
import CustomQueryDialog from "./custom-query-dialog";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import EntitySkeleton from "../../components/entity-skeleton";

export default function ESRMain() {
  const router = useRouter();
  const { id: incomingId } = useParams();
  const searchParams = useSearchParams();
  const incomingIndex = searchParams.get("index");
  const [id, setId] = useState<string>(incomingId as string || "");
  const [index, setIndex] = useQueryState("index", {
    defaultValue: "",
  });
  const {
    doESRQuery,
    loading,
    esrQueryData,
    currentActionSteps,
    currentActionStepAssignments,
  } = useDataExploreStore();

  useEffect(() => {
    if (incomingIndex) {
      setIndex(incomingIndex);
    }
  }, [incomingIndex]);

  useEffect(() => {
    fetchESR();
  }, []);

  const fetchESR = async () => {
    if (!id || !index) {
      return;
    }

    const params: ESRQueryParams = {
      index_name: index as ESRIndex,
      query: {},
      size: 10,
    };

    switch (index) {
      case "action":
        params.query = {
          term: {
            action_id: id,
          },
        };
        break;
      case "action_step":
        params.query = {
          term: {
            step_id: id,
          },
        };
        break;
      case "action_step_assignment":
        params.query = {
          term: {
            _id: id,
          },
        };
        break;
      default:
        toast.error("Invalid index selected");
        return;
    }

    await doESRQuery(params);
  };

  const goNextESREntity = () => {
    router.push(`/dashboard/entity-details/esr/${id}?index=${index}`);
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">
          ESR Records ({esrQueryData?.total || 0})
        </h1>

        <div className="flex items-center gap-4">
          <Input
            value={id}
            onChange={(e) => setId(e.target.value.trim())}
            placeholder="Enter id"
            className="max-w-max min-w-[150px]"
          />
          <Select value={index} onValueChange={value => setIndex(value)}>
            <SelectTrigger className="min-w-[150px] max-w-max">
              <SelectValue placeholder="Select an index" />
            </SelectTrigger>
            <SelectContent>
              {esrEntities.map((entity) => (
                <SelectItem key={entity.index} value={entity.index}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Query Dialog Button */}
          <CustomQueryDialog />
          <Button loading={loading} onClick={goNextESREntity} size="sm">
            Fetch Records
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div>
        {loading ? (
          <EntitySkeleton />
        ) : esrQueryData && esrQueryData.hits?.length > 0 ? (
          <Accordion type="single" collapsible>
            {esrQueryData.hits.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <h1 className="font-bold text-md">
                      {item._index.split("_").join(" ").toUpperCase()}
                    </h1>
                    <p>:{item._id}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <JsonView jsonObj={item} />
                    <div className="space-y-4 py-4">
                      {currentActionSteps && (
                        <div className="flex gap-4 items-start">
                          <h1 className="whitespace-nowrap">Action Steps: </h1>
                          <div className="w-full">
                            {currentActionSteps?.hits?.length > 0 ? (
                              <JsonView jsonObj={currentActionSteps} />
                            ) : (
                              <p>No action steps found.</p>
                            )}
                          </div>
                        </div>
                      )}
                      {currentActionStepAssignments && (
                        <div className="flex gap-4 items-start">
                          <h1 className="whitespace-nowrap">
                            Action Step Assignments:
                          </h1>
                          <div className="w-full">
                            {currentActionStepAssignments?.hits?.length > 0 ? (
                              <JsonView jsonObj={currentActionStepAssignments} />
                            ) : (
                              <p>No action step assignments found.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p>No results found for this id.</p>
        )}
      </div>
    </div>
  );
}
