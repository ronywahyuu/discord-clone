import { Hash, Menu } from "lucide-react";
import React from "react";
import MobileToggle from "../mobile-toggle";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      {/* ChatHeader */}
      {/* <Menu /> */}
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
      )}
      <p>{name}</p>
    </div>
  );
};

export default ChatHeader;
