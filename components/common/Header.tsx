import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


export default function Header() {
    const isLoggedIn = false
    return (
        <div className="container flex items-center py-4 lg:px-8 px-2 mx-auto">
            <div className="flex">
                <NavLink className="flex items-center gap-1 lg:gap-2 shrink-0" href="/">
                <FileText className="w-3 h-3 lg:w-6 lg:h-6 text-gray-900 hover:rotate-12 transform tansition duration-200 ease-in-out" />
                <span className="font-extrabold lg:text-lg text-gray-900">Brain Mate</span></NavLink>
            </div>
            <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
                <NavLink href="/#pricing">Pricing</NavLink>
                <SignedIn>
                    <NavLink href="/dashboard">Your Summaries</NavLink>
                </SignedIn>
            </div>
            <div className="flex lg:justify-end  lg:flex-1">
                <SignedIn>
                    <div className="flex gap-2 items-center">
                        <NavLink href="/upload">Upload a PDF</NavLink>
                        <div>Pro</div>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div> 
                </SignedIn>
                <SignedOut>
                    <NavLink href="/sign-in">Sign In</NavLink>
                </SignedOut>
            </div>
        </div>
    )
}