# Action.InsertImage

**Works in:** Word · PowerPoint

Inserts an image into the host application's canvas.

## Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `Action.InsertImage`. | 1.0 |
| `altText` | `string` | — | The alternate text for the image. | 1.5 |
| `insertPosition` | `string` | `"Selection"` | The position at which to insert the image. Valid values: `"Selection"`, `"Top"`, `"Bottom"`. | 1.5 |
| `url` | `string` | — | The URL of the image to insert. | 1.5 |
| `behavior` | `string` | `"Default"` | **Preview.** Controls the behavior of the action. When set to `Toggle`, the action alternates between normal and toggled states each time it is executed. Valid values: `"Default"`, `"Toggle"`. | 1.5 |
| `fallback` | `object` or `string` | — | Alternate action to render if this type or its required capabilities are unsupported. Valid values: `Action.Submit`, `Action.OpenUrl`, `Action.Execute`, `Action.ToggleVisibility`, `Action.ShowCard`, `Action.ResetInputs`, `Action.Popover`, `Action.OpenUrlDialog`, `Action.InsertImage`, `Action.RunCommands`, `"drop"`. | 1.2 |
| `iconUrl` | `string` | — | URL or Base64-encoded Data URI for a PNG, GIF, JPEG, or SVG displayed left of the title. Also accepts `icon:<icon-name>[,regular\|filled]` (e.g. `icon:Calendar` or `icon:Calendar,filled`) to use an Adaptive Card catalog icon. | 1.1 |
| `iconUrl.toggled` | `string` | — | **Preview.** Icon URL in the toggled state; same formats as `iconUrl`. Applies only when `behavior` is `Toggle`. | 1.5 |
| `id` | `string` | — | Unique identifier for the element or action. Inputs must have an ID to be validated and sent to the Bot. | 1.0 |
| `initialState` | `string` | `"Normal"` | **Preview.** Initial toggle state, only when `behavior` is `Toggle`. Valid values: `"Normal"`, `"Toggled"`. | 1.5 |
| `isEnabled` | `boolean` | `true` | Whether the action is enabled. Disabled actions cannot be clicked and button styling reflects the state. | 1.5 |
| `isEnabled.dynamic` | `string` | — | **Preview.** Expression evaluated at runtime to update `isEnabled`. | 1.5 |
| `isVisible` | `boolean` | `true` | **Preview.** Whether the action is visible. | 1.5 |
| `isVisible.dynamic` | `string` | — | **Preview.** Expression evaluated at runtime to update `isVisible`. | 1.5 |
| `key` | `string` | — | Optional object key. Rarely needed, but can help maintain visual state in the host application. | 1.0 |
| `menuActions` | `array of objects` | — | **Teams.** Actions displayed in the overflow menu of a split action button. Valid values: `Action.Execute`, `Action.InsertImage`, `Action.OpenUrl`, `Action.OpenUrlDialog`, `Action.ResetInputs`, `Action.RunCommands`, `Action.Submit`, `Action.ToggleVisibility`. | 1.5 |
| `mode` | `string` | `"primary"` | Whether the action is primary or secondary; secondary actions appear in an overflow menu. Valid values: `"primary"`, `"secondary"`. | 1.5 |
| `requires` | `object` | `{}` | Required host capabilities. If any are unsupported, the element is not rendered or uses its fallback. Valid value: `HostCapabilities`. | 1.2 |
| `style` | `string` | `"default"` | Style of the action, affecting its visual and spoken representations. Valid values: `"default"`, `"positive"`, `"destructive"`. | 1.2 |
| `themedIconUrls` | `array of objects` | — | **Teams.** Theme-specific icon URLs. Valid value: `ThemedUrl`. | 1.5 |
| `themedIconUrls.toggled` | `array of objects` | — | **Preview.** Theme-specific icon URLs for the toggled state. Only when `behavior` is `Toggle`. Valid value: `ThemedUrl`. | 1.5 |
| `title` | `string` | — | Action title shown on buttons. | 1.0 |
| `title.dynamic` | `string` | — | **Preview.** Runtime expression updating the `title` property. | 1.5 |
| `title.toggled` | `string` | — | **Preview.** Title for the toggled state. Only when `behavior` is `Toggle`. | 1.5 |
| `tooltip` | `string` | — | Tooltip displayed on hover. | 1.5 |
| `tooltip.dynamic` | `string` | — | **Preview.** Runtime expression updating the `tooltip` property. | 1.5 |
| `tooltip.toggled` | `string` | — | **Preview.** Tooltip for the toggled state. Only when `behavior` is `Toggle`. | 1.5 |
