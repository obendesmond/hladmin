import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import EntityDialog from "./entity-dialog";
import { esrEntities } from "@/stores/admin/data-explore-store";
import { useQueryState } from "nuqs";
import { ESRIndex } from "@/types/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ESRDialog() {
  const router = useRouter()
  const [id, setId] = useQueryState("id", { defaultValue: "" });
  const [index, setIndex] = useQueryState("index", {
    defaultValue: "",
  });

  const handleESRRoute = () => {
    if(!index || !id) {
      toast.error("Please select an index and enter an ID");
      return;
    }

    router.push(`/dashboard/entity-details/esr/${id}?index=${index}`);
  }

  const handleKeyDown = (e:any) => {
    if(e.key === "Enter"){
      handleESRRoute()
    }
  }

  return (
    <EntityDialog
      cardName="ESR"
      title="ESR Information"
      subTitle="Choose ESR type and id to explore more information about the entity"
      onSubmit={handleESRRoute}
    >
      <Select value={index} onValueChange={(value: ESRIndex) => setIndex(value)}>
        <SelectTrigger className="w-full">
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

      <Input
        value={id}
        onChange={(e) => setId(e.target.value.trim())}
        onKeyDown={e => handleKeyDown(e)}
        placeholder="Enter esr ID"
      />
    </EntityDialog>
  );
}
