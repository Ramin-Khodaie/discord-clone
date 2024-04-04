"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import MemberModal from "../modals/member-modal";
import CreateChannelModal from "../modals/create-channel-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal/>
      <MemberModal/>
      <CreateChannelModal/>
    </>
  );
};
