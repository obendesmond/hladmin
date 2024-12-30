import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EntityCard from "./entity-card"
import { ReactNode } from "react";

interface Props {
    cardName:string
    children:ReactNode;
    title:string;
    subTitle:string;
    onSubmit:() => void;
}
export default function EntityDialog({cardName, children, title, subTitle, onSubmit}:Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <EntityCard name={cardName} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {subTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {children}
        </div>
        <div className="w-32 h-32 bg-primary-light rounded-full absolute -bottom-14 -left-14" />
        <DialogFooter>
          <Button onClick={onSubmit} variant="default" type="submit">
            Fetch Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
