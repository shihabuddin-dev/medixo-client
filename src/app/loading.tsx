import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-6 rounded-xl border border-border bg-background/70 backdrop-blur shadow-sm">

        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-muted border-t-primary rounded-full animate-spin" />

        {/* Text */}
        <p className="text-sm text-muted-foreground font-medium">
          Loading, please wait...
        </p>

      </div>
    </div>
  );
};

export default Loading;