import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function Searchbar() {
  return (
    <Tabs defaultValue="BUY" className="w-full">
      {/* Tabs List */}
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="BUY" className="text-sm">BUY</TabsTrigger>
        <TabsTrigger value="SELL" className="text-sm">SELL</TabsTrigger>
        <TabsTrigger value="RENT" className="text-sm">RENT</TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      {["BUY", "SELL", "RENT"].map((tab) => (
        <TabsContent key={tab} value={tab}>
          <Card className="mx-auto w-full max-w-md">
            <CardContent className="w-full flex flex-col p-2  bg-background gap-3">
             
              <Input
                id={`${tab.toLowerCase()}-username`}
                placeholder="Search"
                className="w-full"
              />
              <Input
                id={`${tab.toLowerCase()}-username`}
                placeholder="Search"
                className="w-full"
              />
              <Button className="w-full">Search</Button>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
