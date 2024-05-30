import { Card } from "../components/ui/card";

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
    <Tabs defaultValue="product" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="product">Products</TabsTrigger>
        <TabsTrigger value="item">Items</TabsTrigger>
      </TabsList>
      <TabsContent value="product">
        <Card>
          <Product></Product>
        </Card>
      </TabsContent>
      <TabsContent value="item">
        <Card>
          <Item></Item>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
export default Tab;
