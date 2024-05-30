import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import Item from "./items";
import Product from "./products";

const Tab = () => {
  return (
    <Tabs defaultValue="account" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Products</TabsTrigger>
        <TabsTrigger value="password">Items</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <Product></Product>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <Item></Item>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
export default Tab;
