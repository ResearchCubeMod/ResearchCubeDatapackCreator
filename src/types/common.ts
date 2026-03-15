/** Minecraft ResourceLocation format: "namespace:path" */
export type ResourceLocation = string;

export interface ItemCost {
  item: ResourceLocation;
  count: number;
}

export interface FluidCost {
  fluid: ResourceLocation;
  amount: number;
}

export interface Ingredient {
  item: ResourceLocation;
}

export interface ItemStack {
  id: ResourceLocation;
  count: number;
}

export interface FluidStack {
  fluid: ResourceLocation;
  amount: number;
}
