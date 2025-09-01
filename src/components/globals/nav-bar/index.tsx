
import { Button, buttonVariants } from "@/components/ui/button";
import {
  SignOutButton
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "../max-width-wrapper";
import "./nav-bar.css";

async function Navbar() {
  const user = await currentUser();
  const isAdmin = user?.emailAddresses[0].emailAddress === process.env.A_EMAIL;
  return (
    <nav className="header">
      <MaxWidthWrapper className="nav-cont">
        <Link href="/" className="flex z-40 font-semibold">
          case<span className="text-green-600">cobra</span>
        </Link>
        <div className="h-ful flex items-center space-x-4">
          {user && (
            <>
              <SignOutButton>
                <Button size={"sm"} variant={"ghost"}>
                  Sing out
                </Button>
              </SignOutButton>
              {/* admin check */}
              {isAdmin && (
                <Link
                  href={"/dashboard"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Dashboard ✨
                </Link>
              )}
              <Link
                href={"/configure/upload"}
                className={buttonVariants({
                  size: "sm",
                  variant: "default",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                Create Case
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link
                href={"/sign-up"}
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                Sing Up
              </Link>
              <Link
                href={"/sign-in"}
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                Login
              </Link>
              <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>
              <Link
                href={"/configure/upload"}
                className={buttonVariants({
                  size: "sm",
                  variant: "default",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                Create Case
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
