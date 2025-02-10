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
      <div className="flex flex-col items-center text-sm pb-12 px-5 pt-[55px] text-gray-700">
        <h3 className="font-bold text-xl mb-4">Analysis</h3>
        <div className="flex flex-col gap-3">
          <p>
            <span className="font-bold">Reasoning:</span> {props.analyzeData.reasoning}
          </p>
          <p>
            <span className="font-bold">Opportunities:</span> {props.analyzeData.opportunities}
          </p>
          <p>
            <span className="font-bold">Risks:</span> {props.analyzeData.risks}
          </p>
        </div>
      </div>
    </Dialog>
  );
};
