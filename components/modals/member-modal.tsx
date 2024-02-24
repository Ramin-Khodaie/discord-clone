"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";

import { ServerWithMembersWithProfiles } from "@/types";
import { UserAvatar } from "@/components/user-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const MemberModal = () => {
  const { isOpen, onOpen, data, onClose, type } = useModal();
  const origin = useOrigin();

  const { server } = data as { server: ServerWithMembersWithProfiles };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Member
          </DialogTitle>          
        </DialogHeader>
        <DialogDescription>{server?.members?.length} Members</DialogDescription>
        <ScrollArea className="mt-8 max-h">{
          server.members?.map((member: any)=>(
            <div key={member?.id} className="flex items-center gap-x-2 mb-6">

              <UserAvatar src={member?.profile?.imageUrl}/>
            </div>
          ))
        }</ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MemberModal;
