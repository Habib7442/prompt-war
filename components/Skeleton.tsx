import { Skeleton } from "./ui/skeleton";

const renderSkeletons = () => {
  return Array(12)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-900" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-slate-900" />
          <Skeleton className="h-4 w-[200px] bg-slate-900" />
        </div>
      </div>
    ));
};

export default renderSkeletons;
