"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal-store";

const DeleteServerModal = () => {
  const router = useRouter();

  const [isLoading, setIsloading] = useState(false);
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal();

  const isModalOpen = isOpen && type === "deleteServer";

  const onConfirm = async () => {
    try {
      setIsloading(true);
      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?
            <br />
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              {" "}
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onConfirm} variant="primary">
              {" "}
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
