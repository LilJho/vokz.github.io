"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/base-tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

interface IToolTipProps {
  trigger: JSX.Element;
  text: string
  side?: "top" | "bottom" | "left" | "right"
}

const ReactToolTip = ({ trigger, text, side = "bottom" }: IToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {trigger}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className="flex flex-col gap-1 bg-gray-800 text-white"
        >
          {text}
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ReactToolTip