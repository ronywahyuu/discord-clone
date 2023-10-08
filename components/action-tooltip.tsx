import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

interface Props {
  children: React.ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

const ActionTooltip = ({ children, label, align, side }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>{label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
