import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";


const CustomQueryDialog = () => {
    const [queryDialogOpen, setQueryDialogOpen] = useState(false);


    const handleQueryChange = (queryObj: object) => {
        console.log("queryObj", queryObj);
        // setESRQuery((prev) => ({ ...prev, query: queryObj }));
        setQueryDialogOpen(false);
      };


  return (
    <Dialog open={queryDialogOpen} onOpenChange={setQueryDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Query</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Elasticsearch Query</DialogTitle>
        </DialogHeader>
        <JSONInput
          id="queryEditor"
        //   placeholder={esrQuery.query}
         placeholder={{
            note1: "This is a JSON editor for more complex queries",
            note2: "Would be implemented in the future",
         }}
          locale={locale}
          height="300px"
          width="100%"
          onChange={(content: any) => {
            console.log("content", content);
            if (content.jsObject) {
              handleQueryChange(content.jsObject);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomQueryDialog;
