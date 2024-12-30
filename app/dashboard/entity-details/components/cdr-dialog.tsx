import { Input } from "@/components/ui/input";
import EntityDialog from "./entity-dialog";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CDRDialog() {
  const router = useRouter();
  const [id, setId] = useQueryState("id", { defaultValue: "" });

  const handleCDRRoute = () => {
    if (!id) {
      toast.error("Please enter an ID");
      return;
    }

    router.push(`/dashboard/entity-details/cdr/${id}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleCDRRoute();
    }
  };

  return (
    <EntityDialog
      cardName="CDR"
      title="CDR Information"
      subTitle="Enter CDR id to explore more information about it"
      onSubmit={handleCDRRoute}
    >
      <Input
        value={id}
        onChange={(e) => setId(e.target.value.trim())}
        onKeyDown={e => handleKeyDown(e)}
        placeholder="Enter cdr ID"
      />
    </EntityDialog>
  );
}
