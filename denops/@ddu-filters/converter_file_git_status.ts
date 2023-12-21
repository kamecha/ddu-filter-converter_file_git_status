import { FilterArguments } from "https://deno.land/x/ddu_vim@v3.8.1/base/filter.ts";
import {
  BaseFilter,
  DduFilterItems,
  DduItem,
} from "https://deno.land/x/ddu_vim@v3.8.1/types.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.5.3/file.ts";
import { parse } from "./git_status.ts";

type Params = Record<never, never>;

export class Filter extends BaseFilter<Params> {
  filter(
    args: FilterArguments<Params>,
  ): Promise<DduFilterItems> {
    return Promise.resolve(
      args.items.map((item: DduItem) => {
        const action = item.action! as ActionData;
        const path = action.path!;
        const command = new Deno.Command("git", {
          args: ["status", "--short", path],
        });
        const line = new TextDecoder()
          .decode(command.outputSync().stdout)
          .trimEnd();
        const parsed = parse(line);
        const display = item.display ?? item.word;
        if (!parsed) {
          return {
            ...item,
            display: display + "    ",
          }
        }
        return {
          ...item,
          display: display + `[${parsed.X}${parsed.Y}]`,
        };
      }),
    );
  }
  params(): Params {
    return {};
  }
}
