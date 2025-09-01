import MaxWidthWrapper from "@/components/globals/max-width-wrapper";
import Steps from "./steps";

function configLayout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper className="flex flex-1 flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}

export default configLayout;
