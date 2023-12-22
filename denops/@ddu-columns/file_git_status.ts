import {
  GetLengthArguments,
  GetTextArguments,
  GetTextResult,
} from "https://deno.land/x/ddu_vim@v3.8.1/base/column.ts";
import { ActionData, BaseColumn, ItemHighlight } from "../deps.ts";
import { Entity, parse } from "../@ddu-filters/git_status.ts";

const HIGHLIGHT_NAME = "ddu_git_status";

export type Params = Record<never, never>;

export class Column extends BaseColumn<Params> {
  getLength(
    {}: GetLengthArguments<Params>,
  ): number | Promise<number> {
    return 4;
  }
  async getText(
    args: GetTextArguments<Params>,
  ): Promise<GetTextResult> {
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
    await args.denops.cmd(
      "highlight default link ddu_git_status_bracket Comment",
    );
    await args.denops.cmd(
      "highlight default link ddu_git_status_index Special",
    );
    await args.denops.cmd(
      "highlight default link ddu_git_status_worktree WarningMsg",
    );
    await args.denops.cmd(
      "highlight default link ddu_git_status_unmerged ErrorMsg",
    );
    await args.denops.cmd(
      "highlight default link ddu_git_status_untracked Comment",
    );
    await args.denops.cmd(
      "highlight default link ddu_git_status_ignored Comment",
    );
    return {
      text: `[${parsed.X}${parsed.Y}]`,
      highlights: this.defineHilight(args.startCol, parsed),
    };
  }
  params(): Params {
    return {};
  }
  defineHilight(startCol: number, entity: Entity): ItemHighlight[] {
    const highlights: ItemHighlight[] = [];
    // [
    highlights.push({
      name: HIGHLIGHT_NAME,
      hl_group: "ddu_git_status_bracket",
      col: startCol,
      width: 1,
    });
    // XY
    switch (entity.X + entity.Y) {
      case "??":
        highlights.push({
          name: HIGHLIGHT_NAME,
          hl_group: "ddu_git_status_untracked",
          col: startCol + 1,
          width: 2,
        });
        break;
      case "!!":
        highlights.push({
          name: HIGHLIGHT_NAME,
          hl_group: "ddu_git_status_ignored",
          col: startCol + 1,
          width: 2,
        });
        break;
      default:
        // X
        highlights.push({
          name: HIGHLIGHT_NAME,
          hl_group: "ddu_git_status_index",
          col: startCol + 1,
          width: 1,
        });
        // Y
        highlights.push({
          name: HIGHLIGHT_NAME,
          hl_group: "ddu_git_status_worktree",
          col: startCol + 2,
          width: 1,
        });
        break;
    }
    // ]
    highlights.push({
      name: HIGHLIGHT_NAME,
      hl_group: "ddu_git_status_bracket",
      col: startCol + 3,
      width: 1,
    });
    return highlights;
  }
}
