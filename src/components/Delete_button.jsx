"use client";

import { deleteDestination } from "@/app/(main)/lib/data";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AlertDialog } from "@heroui/react";
import { Button } from "@heroui/react";

const Delete_button = ({ destinationId }) => {
  const router = useRouter();

  const handleDeleteDestination = async () => {
    try {
      const response = await deleteDestination(destinationId);
      if (response?.acknowledged && response?.deletedCount > 0) {
        toast.success("Destination deleted successfully");
        router.push("/Destinations");
        router.refresh();
      } else {
        toast.error("Failed to delete destination");
      }
    } catch {
      toast.error("Failed to delete destination");
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger">Delete Destination</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete destination permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                    This will permanently delete <strong>My Awesome Destination</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={() => handleDeleteDestination(destinationId)}>
                Delete Destination
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}


export default Delete_button
