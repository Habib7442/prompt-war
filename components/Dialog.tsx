import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const DialogComponent = ({ prompt }: { prompt: string }) => {
  const words = prompt.split(" ");
  return (
    <div>
      <p className="text-gray-200 font-semibold w-full">
        {words.length > 5 ? words.slice(0, 5).join(" ") + "..." : prompt}
        {words.length > 5 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-slate-900 border-none mt-2"
              >
                Read More
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-slate-900 text-teal-400">
              <DialogHeader>
                <DialogTitle>Full Prompt</DialogTitle>
              </DialogHeader>
              <DialogDescription>{prompt}</DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </p>
    </div>
  );
};

export default DialogComponent;
