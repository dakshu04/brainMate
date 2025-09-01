import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavLink from "./nav-link";
import { FileText } from "lucide-react";

export default function Header() {
    return (
        <div className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
            {/* Left: Logo */}
            <div className="flex">
                <NavLink className="flex items-center gap-1 lg:gap-2 shrink-0" href="/">
                    <FileText className="w-3 h-3 lg:w-6 lg:h-6 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
                    <span className="font-extrabold lg:text-lg text-gray-900">Brain Mate</span>
                </NavLink>
            </div>

            {/* Center: Nav links like Pricing */}
            <div className="flex justify-center gap-4 lg:gap-12 items-center">
                <NavLink href="/#pricing">Pricing</NavLink>
                <SignedIn>
                    <NavLink href="/dashboard">Your Summaries</NavLink>
                </SignedIn>
            </div>

            {/* Right: Auth */}
            <div className="flex justify-end items-center gap-2">
                <SignedIn>
                    <NavLink href="/upload">Upload a PDF</NavLink>
                    <div>Pro</div>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <NavLink href="/sign-in">Sign In</NavLink>
                </SignedOut>
            </div>
        </div>
    )
}
