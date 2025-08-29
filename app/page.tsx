import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-black">
      <Button variant={"destructive"} size={"lg"}>Get Started</Button> 
    </div>
  );
}
