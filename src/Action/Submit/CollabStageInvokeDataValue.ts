import { Node } from "../../Node.js";
import type { TabInfo } from "../../Other/TabInfo.js";

/**
 * Data for invoking a collaboration stage action.
 */
export class CollabStageInvokeDataValue extends Node {
  public constructor(tabInfo: TabInfo | null = null) {
    super();
    if (tabInfo !== null) {
      this.tabInfo(tabInfo);
    }
  }

  public static make(
    tabInfo: TabInfo | null = null,
  ): CollabStageInvokeDataValue {
    return new CollabStageInvokeDataValue(tabInfo);
  }

  /**
   * Provides information about the iFrame content, rendered in the collab stage popout window.
   * Valid values: "TabInfo".
   */
  public tabInfo(tabInfo: TabInfo): this {
    return this.set("tabInfo", tabInfo);
  }

  public getType(): string {
    return "tab/tabInfoAction";
  }
}
