"use client";

import { persistor } from "@/provider/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/provider/redux/ReduxProvider";

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
      <Toaster />
    </ReduxProvider>
  );
};

export default ReduxWrapper;
