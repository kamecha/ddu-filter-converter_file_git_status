import { FilterArguments } from "https://deno.land/x/ddu_vim@v3.8.1/base/filter.ts";
import {
  BaseFilter,
  DduFilterItems,
} from "https://deno.land/x/ddu_vim@v3.8.1/types.ts";

type Params = Record<never, never>;

export class Filter extends BaseFilter<Params> {
  filter(
    {}: FilterArguments<Params>,
  ): DduFilterItems | Promise<DduFilterItems> {
    throw new Error("Method not implemented.");
  }
  params(): Params {
    throw new Error("Method not implemented.");
  }
}
