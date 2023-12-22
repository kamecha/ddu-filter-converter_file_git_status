import {
  GetLengthArguments,
  GetTextArguments,
  GetTextResult,
} from "https://deno.land/x/ddu_vim@v3.8.1/base/column.ts";
import { ActionData, BaseColumn } from "../deps.ts";
import { parse } from "../@ddu-filters/git_status.ts";

export type Params = Record<never, never>;

export class Column extends BaseColumn<Params> {
  getLength(
    {}: GetLengthArguments<Params>,
  ): number | Promise<number> {
    return 4;
  }
  getText(
    args: GetTextArguments<Params>,
  ): GetTextResult | Promise<GetTextResult> {
    const action = args.item.action! as ActionData;
    const path = action.path!;
    const command = new Deno.Command("git", {
      args: ["status", "--short", path],
    });
    const line = new TextDecoder()
      .decode(command.outputSync().stdout)
      .trimEnd();
    const parsed = parse(line);
    if (!parsed) {
      return {
        text: "    ",
      };
    }
    return {
      text: `[${parsed.X}${parsed.Y}]`,
    };
  }
  params(): Params {
    return {};
  }
}
