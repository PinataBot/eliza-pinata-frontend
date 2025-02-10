"use client";

import { Dialog } from "@/components/Dialogs/Dialog";
import { ANALYZE_MESSAGE } from "@/hooks/query/useQueryMessages";

interface IDialogBaseProps {
  open: boolean;
  onClose: () => void;
}

interface IAnalyzeDialogProps extends IDialogBaseProps {
  analyzeData: ANALYZE_MESSAGE;
}

export const AnalyzeDialog = (props: IAnalyzeDialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.onClose} closeButton={true}>
      <div className="flex flex-col items-center text-sm pb-5 px-5 pt-[55px] text-gray-700">
        Reasoning:<p>{props.analyzeData.reasoning}</p>
        Opportunities:<p>{props.analyzeData.opportunities}</p>
        Risks:<p>{props.analyzeData.risks}</p>
      </div>
    </Dialog>
  );
};
