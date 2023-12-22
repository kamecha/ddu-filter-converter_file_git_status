import {
  ActionData,
  BaseFilter,
  DduFilterItems,
  DduItem,
  FilterArguments,
  ItemHighlight,
} from "../deps.ts";
import { Entity, parse } from "./git_status.ts";

const HIGHLIGHT_NAME = "ddu_git_status";

type Params = Record<never, never>;

export class Filter extends BaseFilter<Params> {
  async filter(
    args: FilterArguments<Params>,
  ): Promise<DduFilterItems> {
    for (const item of args.items) {
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
        item.display = display + "    ";
        continue;
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
      const highlights: ItemHighlight[] = item.highlights ?? [];
      for (const highlight of this.defineHilight(item, parsed)) {
        highlights.push(highlight);
      }
      item.display = display + `[${parsed.X}${parsed.Y}]`;
      item.highlights = highlights;
    }
    return Promise.resolve(args.items);
  }
  params(): Params {
    return {};
  }
  defineHilight(item: DduItem, entity: Entity): ItemHighlight[] {
    const highlights: ItemHighlight[] = [];
    const display = item.display ?? item.word;
    // [
    highlights.push({
      name: HIGHLIGHT_NAME,
      hl_group: "ddu_git_status_bracket",
      col: display.length + 1,
      width: 1,
    });
    // XY
    switch (entity.X + entity.Y) {
      case "??":
        highlights.push({
          name: HIGHLIGHT_NAME,
          hl_group: "ddu_git_status_untracked",
          col: display.length + 2,
          width: 2,
        });
        break;
      case "!!":
        highlights.push({
          name: HIGHLIGHT_NAME,
          hl_group: "ddu_git_status_ignored",
          col: display.length + 2,
          width: 2,
        });
        break;
      default:
        // X
        highlights.push({
          name: HIGHLIGHT_NAME,
          hl_group: "ddu_git_status_index",
          col: display.length + 2,
          width: 1,
        });
        // Y
        highlights.push({
          name: HIGHLIGHT_NAME,
          hl_group: "ddu_git_status_worktree",
          col: display.length + 3,
          width: 1,
        });
        break;
    }
    // ]
    highlights.push({
      name: HIGHLIGHT_NAME,
      hl_group: "ddu_git_status_bracket",
      col: display.length + 4,
      width: 1,
    });
    return highlights;
  }
}
