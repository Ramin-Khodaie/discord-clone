"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { newCode } from "@/services/invite";

const InviteModal = () => {
  const { isOpen, onOpen, data, onClose, type } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";

  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleNewInviteCode = async () => {
    try {
      setIsLoading(true);
      const response = await newCode(data.server?.id as string);
      onOpen("invite", { server: response });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary-70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading} size="icon" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={handleNewInviteCode}
            className="text-xs text-zinc-500 mt-4"
            variant="link"
          >
            Generate a new link
            <RefreshCw className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
