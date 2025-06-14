import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../components/ui/tooltip";

function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Hover me</button>
        </TooltipTrigger>
        <TooltipContent>
          This is a tooltip message.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
