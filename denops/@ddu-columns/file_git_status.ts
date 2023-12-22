import {
  GetLengthArguments,
  GetTextArguments,
  GetTextResult,
} from "https://deno.land/x/ddu_vim@v3.8.1/base/column.ts";
import { BaseColumn } from "../deps.ts";

export type Params = Record<never, never>;

export class Column extends BaseColumn<Params> {
  getLength(
    {}: GetLengthArguments<Params>,
  ): number | Promise<number> {
    throw new Error("Method not implemented.");
  }
  getText(
    {}: GetTextArguments<Params>,
  ): GetTextResult | Promise<GetTextResult> {
    throw new Error("Method not implemented.");
  }
  params(): Params {
    throw new Error("Method not implemented.");
  }
}
