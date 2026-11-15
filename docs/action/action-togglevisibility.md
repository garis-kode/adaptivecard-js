# Action.ToggleVisibility

**Works in:** Teams · Copilot · Outlook

Toggles the visibility of a set of elements. `Action.ToggleVisibility` is useful for creating "Show more" type UI patterns.

Use `Action.ToggleVisibility` when you need to show or hide a set of elements all at once in a card. `Action.ToggleVisibility` is particularly useful for creating "Show more" type experience as shown in the below example:

## Example

```json
{
  "type": "AdaptiveCard",
  "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "wrap": true,
      "maxLines": 3,
      "id": "shortText"
    },
    {
      "type": "TextBlock",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "wrap": true,
      "isVisible": false,
      "id": "longText"
    },
    {
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.ToggleVisibility",
          "title": "Show more",
          "targetElements": ["shortText", "longText", "showMore", "showLess"]
        }
      ],
      "id": "showMore"
    },
    {
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.ToggleVisibility",
          "title": "Show less",
          "targetElements": ["shortText", "longText", "showMore", "showLess"]
        }
      ],
      "id": "showLess",
      "isVisible": false
    }
  ]
}
```

## Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `Action.ToggleVisibility`. | 1.0 |
| `suppressAriaControls` | `boolean` | `false` | — | 1.5 |
| `targetElements` | Array of `string` or `object` | — | The Ids of the elements to toggle the visibility of. Valid values: `TargetElement`. | 1.2 |
| `behavior` | `string` | `"Default"` | **Preview.** Controls the behavior of the action. When set to `Toggle`, the action acts as a toggle that alternates between the normal and toggled states each time it's executed. Valid values: `"Default"`, `"Toggle"`. | 1.5 |
| `fallback` | One of `object` or `string` | — | An alternate action to render if the type of this one is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property. Valid values: `Action.Submit`, `Action.OpenUrl`, `Action.Execute`, `Action.ToggleVisibility`, `Action.ShowCard`, `Action.ResetInputs`, `Action.Popover`, `Action.OpenUrlDialog`, `Action.InsertImage`, `Action.RunCommands`, `"drop"`. | 1.2 |
| `iconUrl` | `string` | — | A URL (or Base64-encoded Data URI) to a PNG, GIF, JPEG or SVG image to be displayed on the left of the action's title. `iconUrl` also accepts the `icon:<icon-name>[,regular\|filled]` format to display an icon from the vast Adaptive Card icon catalog instead of an image. For example, use `icon:Calendar` for the regular style or `icon:Calendar,filled` for the filled style. | 1.1 |
| `iconUrl.toggled` | `string` | — | **Preview.** The icon URL to use when the action is in the toggled state. Accepts the same formats as `iconUrl`. Only applies when `behavior` is set to `Toggle`. | 1.5 |
| `id` | `string` | — | A unique identifier for the element or action. Input elements must have an `id`, otherwise they will not be validated and their values will not be sent to the Bot. | 1.0 |
| `initialState` | `string` | `"Normal"` | **Preview.** Controls the initial toggle state of the action. Only applies when `behavior` is set to `Toggle`. Valid values: `"Normal"`, `"Toggled"`. | 1.5 |
| `isEnabled` | `boolean` | `true` | Controls the enabled state of the action. A disabled action cannot be clicked. If the action is represented as a button, the button's style will reflect this state. | 1.5 |
| `isEnabled.dynamic` | `string` | — | **Preview.** Defines an expression whose evaluated value will be used to update the `isEnabled` property of the action at runtime. | 1.5 |
| `isVisible` | `boolean` | `true` | **Preview.** Controls the visibility of the action. | 1.5 |
| `isVisible.dynamic` | `string` | — | **Preview.** Defines an expression whose evaluated value will be used to update the `isVisible` property of the action at runtime. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `menuActions` | Array of `object` | — | **Teams.** The actions to display in the overflow menu of a Split action button. Valid values: `Action.Execute`, `Action.InsertImage`, `Action.OpenUrl`, `Action.OpenUrlDialog`, `Action.ResetInputs`, `Action.RunCommands`, `Action.Submit`, `Action.ToggleVisibility`. | 1.5 |
| `mode` | `string` | `"primary"` | Controls if the action is primary or secondary. Secondary actions appear in an overflow menu. Valid values: `"primary"`, `"secondary"`. | 1.5 |
| `requires` | `object` | `{}` | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element is not rendered (or its fallback is rendered if provided). Valid values: `HostCapabilities`. | 1.2 |
| `style` | `string` | `"default"` | Control the style of the action, affecting its visual and spoken representations. Valid values: `"default"`, `"positive"`, `"destructive"`. | 1.2 |
| `themedIconUrls` | Array of `object` | — | **Teams.** A set of theme-specific icon URLs. Valid values: `ThemedUrl`. | 1.5 |
| `themedIconUrls.toggled` | Array of `object` | — | **Preview.** A set of theme-specific icon URLs to use when the action is in the toggled state. Only applies when `behavior` is set to `Toggle`. Valid values: `ThemedUrl`. | 1.5 |
| `title` | `string` | — | The title of the action, as it appears on buttons. | 1.0 |
| `title.dynamic` | `string` | — | **Preview.** Defines an expression whose evaluated value will be used to update the `title` property of the action at runtime. | 1.5 |
| `title.toggled` | `string` | — | **Preview.** The title to display when the action is in the toggled state. Only applies when `behavior` is set to `Toggle`. | 1.5 |
| `tooltip` | `string` | — | The tooltip text to display when the action is hovered over. | 1.5 |
| `tooltip.dynamic` | `string` | — | **Preview.** Defines an expression whose evaluated value will be used to update the `tooltip` property of the action at runtime. | 1.5 |
| `tooltip.toggled` | `string` | — | **Preview.** The tooltip to display when the action is in the toggled state. Only applies when `behavior` is set to `Toggle`. | 1.5 |

---

## TargetElement

**Works in:** Teams · Copilot · Outlook

Defines a target element in an `Action.ToggleVisibility`.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `elementId` | `string` | — | The Id of the element to change the visibility of. | 1.5 |
| `isVisible` | `boolean` | — | The new visibility state of the element. | 1.5 |
