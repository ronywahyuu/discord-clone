import { ChannelType, MemberRole } from "@prisma/client";
import ActionTooltip from "../action-tooltip";
import { Plus, Settings } from "lucide-react";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
}
const ServerSection = ({ label, sectionType, role }: ServerSectionProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button>
            <Plus className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
      {role !== MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Create Channel" side="top">
          <button>
            <Settings className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
