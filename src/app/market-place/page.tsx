import { HoverInfo } from "@/components/global/hoverInfo";
import { productsList } from "../../localDB";
import ProductCard from "@/components/global/product-card";

export default function marketPlace() {
  return (
    <div className=" flex flex-col items-center justify-center">
      <HoverInfo
        text="Market Place"
        description="purchase all the recycled goods at a discount rate"
      />
      <br />
      <br />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {productsList.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            href="/product"
            image={product.image}
            price={product.price}
            category={product.category}
            InMarket={true}
          />
        ))}
      </div>
    </div>
  );
}
