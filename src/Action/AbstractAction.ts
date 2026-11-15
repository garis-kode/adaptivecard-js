import { ActionBehavior } from "../Enum/ActionBehavior.js";
import { ActionInitialState } from "../Enum/ActionInitialState.js";
import { ActionMode } from "../Enum/ActionMode.js";
import { ActionStyle } from "../Enum/ActionStyle.js";
import { Node } from "../Node.js";
import type { HostCapabilities } from "../Other/HostCapabilities.js";
import { ThemedUrl } from "../Other/ThemedUrl.js";
import { HasKey } from "../Support/HasKey.js";

export abstract class AbstractAction extends Node {
  private readonly hasKey = new HasKey(this);

  /**
   * Defines an optional key for the object. Keys are seldom needed, but in
   * some scenarios, specifying keys can help maintain visual state in the
   * host application.
   */
  public key(key: string): this {
    return this.hasKey.key(key);
  }

  /**
   * The title of the action, as it appears on buttons.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * A URL (or Base64-encoded Data URI) to a PNG, GIF, JPEG or SVG image to be displayed
   * on the left of the action's title. `iconUrl` also accepts the `icon:<icon-name>[,regular|filled]`
   * format to display an icon from the vast Adaptive Card icon catalog instead of an image.
   * For example, use `icon:Calendar` for the regular style or `icon:Calendar,filled` for the
   * filled style.
   */
  public iconUrl(url: string): this {
    return this.set("iconUrl", url);
  }

  /**
   * The icon URL to use when the action is in the toggled state. Accepts the same formats
   * as `iconUrl`. Only applies when `behavior` is set to `Toggle`.
   */
  public toggledIconUrl(url: string): this {
    return this.set("iconUrl.toggled", url);
  }

  /**
   * A unique identifier for the element or action. Input elements must have an `id`,
   * otherwise they will not be validated and their values will not be sent to the Bot.
   */
  public id(id: string): this {
    return this.set("id", id);
  }

  /**
   * Control the style of the action, affecting its visual and spoken representations.
   * Valid values: "default", "positive", "destructive".
   */
  public style(style: ActionStyle): this {
    return this.set("style", style);
  }

  /**
   * The tooltip text to display when the action is hovered over.
   */
  public tooltip(tooltip: string): this {
    return this.set("tooltip", tooltip);
  }

  /**
   * Controls if the action is primary or secondary. Secondary actions appear in an overflow menu.
   * Valid values: "primary", "secondary".
   */
  public mode(mode: ActionMode): this {
    return this.set("mode", mode);
  }

  /**
   * Controls the enabled state of the action. A disabled action cannot be clicked.
   * If the action is represented as a button, the button's style will reflect this state.
   */
  public isEnabled(enabled: boolean = true): this {
    return this.set("isEnabled", enabled);
  }

  /**
   * Defines an expression whose evaluated value will be used to update
   * the `isEnabled` property of the action at runtime.
   */
  public isEnabledDynamic(expression: string): this {
    return this.set("isEnabled.dynamic", expression);
  }

  /**
   * Controls the visibility of the action.
   */
  public isVisible(visible: boolean = true): this {
    return this.set("isVisible", visible);
  }

  /**
   * Defines an expression whose evaluated value will be used to update
   * the `isVisible` property of the action at runtime.
   */
  public isVisibleDynamic(expression: string): this {
    return this.set("isVisible.dynamic", expression);
  }

  /**
   * Defines an expression whose evaluated value will be used to update
   * the `title` property of the action at runtime.
   */
  public titleDynamic(expression: string): this {
    return this.set("title.dynamic", expression);
  }

  /**
   * The title to display when the action is in the toggled state. Only applies
   * when `behavior` is set to `Toggle`.
   */
  public toggledTitle(title: string): this {
    return this.set("title.toggled", title);
  }

  /**
   * Defines an expression whose evaluated value will be used to update
   * the `tooltip` property of the action at runtime.
   */
  public tooltipDynamic(expression: string): this {
    return this.set("tooltip.dynamic", expression);
  }

  /**
   * The tooltip to display when the action is in the toggled state. Only applies
   * when `behavior` is set to `Toggle`.
   */
  public toggledTooltip(tooltip: string): this {
    return this.set("tooltip.toggled", tooltip);
  }

  /**
   * Add a set of theme-specific icon URLs.
   */
  public addThemedIconUrls(themedUrl: ThemedUrl | Iterable<ThemedUrl>): this {
    if (
      !(themedUrl instanceof ThemedUrl) &&
      Symbol.iterator in Object(themedUrl)
    ) {
      for (const item of themedUrl) {
        this.push("themedIconUrls", item);
      }

      return this;
    }

    return this.push("themedIconUrls", themedUrl);
  }

  /**
   * A set of theme-specific icon URLs.
   * Valid values: "ThemedUrl".
   */
  public themedIconUrls(themedUrls: Iterable<ThemedUrl>): this {
    return this.addThemedIconUrls(themedUrls);
  }

  /**
   * Add a set of theme-specific icon URLs to use when the action is in the toggled state. Only applies
   * when `behavior` is set to `Toggle`.
   */
  public addToggledThemedIconUrls(
    themedUrl: ThemedUrl | Iterable<ThemedUrl>,
  ): this {
    if (
      !(themedUrl instanceof ThemedUrl) &&
      Symbol.iterator in Object(themedUrl)
    ) {
      for (const item of themedUrl) {
        this.push("themedIconUrls.toggled", item);
      }

      return this;
    }

    return this.push("themedIconUrls.toggled", themedUrl);
  }

  /**
   * A set of theme-specific icon URLs to use when the action is in the toggled state.
   * Only applies when `behavior` is set to `Toggle`.
   * Valid values: "ThemedUrl".
   */
  public toggledThemedIconUrls(themedUrls: Iterable<ThemedUrl>): this {
    return this.addToggledThemedIconUrls(themedUrls);
  }

  /**
   * Controls the behavior of the action. When set to Toggle, the action acts as a toggle
   * that alternates between the normal and toggled states each time it's executed.
   * Valid values: "Default", "Toggle".
   */
  public behavior(behavior: ActionBehavior): this {
    return this.set("behavior", behavior);
  }

  /**
   * Controls the initial toggle state of the action. Only applies when `behavior` is set to `Toggle`.
   * Valid values: "Normal", "Toggled".
   */
  public initialState(state: ActionInitialState): this {
    return this.set("initialState", state);
  }

  /**
   * A list of capabilities the element requires the host application to support.
   * If the host application doesn't support at least one of the listed capabilities,
   * the element is not rendered (or its fallback is rendered if provided).
   * Valid values: "HostCapabilities".
   */
  public requires(requires: HostCapabilities): this {
    return this.set("requires", requires);
  }

  /**
   * An alternate action to render if the type of this one is unsupported or
   * if the host application doesn't support all the capabilities specified in
   * the `requires` property.
   * Valid values: "Action.Submit", "Action.OpenUrl", "Action.Execute", "Action.ToggleVisibility",
   * "Action.ShowCard", "Action.ResetInputs", "Action.Popover", "Action.OpenUrlDialog",
   * "Action.InsertImage", "Action.RunCommands", "drop".
   */
  public fallback(fallback: string | AbstractAction): this {
    return this.set("fallback", fallback);
  }
}
