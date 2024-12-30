"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ReactDiffViewer from "react-diff-viewer-continued";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RevisionListResponse } from "@/types/admin";

interface Props {
  revisionList: RevisionListResponse["items"];
}
export default function RevisionTable({ revisionList }: Props) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<
    "up" | "down" | null
  >(null);

  const handleExpandRow = (id: string, index: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));

    if (index === revisionList.length - 1) {
      setSelectedDirection("up");
    } else {
      setSelectedDirection("down");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {revisionList.map((revision, index) => (
          <React.Fragment key={revision._id}>
            <TableRow>
              <TableCell>{revision.revisions[0].revision_id_to}</TableCell>
              <TableCell>{revision.name}</TableCell>
              <TableCell>{revision.created_at}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => handleExpandRow(revision._id, index)}
                >
                  {expandedRow === revision._id ? "Collapse" : "Expand"}
                </Button>
              </TableCell>
            </TableRow>

            {expandedRow === revision._id && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="p-4 bg-gray-50 rounded-md">
                    {/* Radio Group for direction */}
                    <RadioGroup
                      className="flex gap-4 mb-4"
                      value={selectedDirection || ""}
                      onValueChange={(value: "up" | "down") =>
                        setSelectedDirection(value)
                      }
                    >
                      {index < revisionList.length - 1 && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            id={`down-${revision._id}`}
                            value="down"
                            />
                          <label
                            htmlFor={`down-${revision._id}`}
                            className="text-sm font-medium text-gray-700"
                            >
                            Compare with Next
                          </label>
                        </div>
                      )}
                      {index > 0 && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            id={`up-${revision._id}`}
                            value="up"
                          />
                          <label
                            htmlFor={`up-${revision._id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Compare with Previous
                          </label>
                        </div>
                      )}
                    </RadioGroup>

                    <div>
                      {selectedDirection === "up" && index > 0 ? (
                        <ReactDiffViewer
                          oldValue={JSON.stringify(
                            revisionList[index - 1].revisions[0].payload,
                            null,
                            2
                          )}
                          newValue={JSON.stringify(
                            revision.revisions[0].payload,
                            null,
                            2
                          )}
                          splitView={true}
                          leftTitle={`Previous: ${
                            revisionList[index - 1].revisions[0].revision_id_to
                          }`}
                          rightTitle={`Current: ${revision.revisions[0].revision_id_to}`}
                        />
                      ) : selectedDirection === "down" &&
                        index < revisionList.length - 1 ? (
                        <ReactDiffViewer
                          oldValue={JSON.stringify(
                            revision.revisions[0].payload,
                            null,
                            2
                          )}
                          newValue={JSON.stringify(
                            revisionList[index + 1].revisions[0].payload,
                            null,
                            2
                          )}
                          splitView={true}
                          leftTitle={`Current: ${revision.revisions[0].revision_id_to}`}
                          rightTitle={`Next: ${
                            revisionList[index + 1].revisions[0]
                              .revision_id_to
                          }`}
                        />
                      ) : (
                        <p className="text-gray-500">
                          Select a comparison direction
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
