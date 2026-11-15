# Action.Submit

**Works in:** Teams · Copilot

Gathers input values, merges them with the `data` property if specified, and sends them to the Bot via an Invoke activity. The Bot can only acknowledge it has received the request.

## Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `Action.Submit`. | 1.0 |
| `msteams` | `object` | — | **Teams.** Teams-specific metadata associated with the action. Valid values: `TeamsSubmitActionProperties`. | 1.0 |
| `msTeams` | `object` | — | Teams-specific metadata associated with the action. Equivalent to `msteams`. Valid values: `TeamsSubmitActionProperties`. | 1.0 |
| `associatedInputs` | `string` | — | The Ids of the inputs associated with the `Action.Submit`. When the action is executed, the values of the associated inputs are sent to the Bot. See **Input validation** for more details. Valid values: `"auto"`, `"none"`. | 1.3 |
| `behavior` | `string` | `"Default"` | **Preview.** Controls the behavior of the action. When set to `Toggle`, the action acts as a toggle that alternates between the normal and toggled states each time it's executed. Valid values: `"Default"`, `"Toggle"`. | 1.5 |
| `conditionallyEnabled` | `boolean` | `false` | **Teams.** Controls if the action is enabled only if at least one required input has been filled by the user. | 1.5 |
| `data` | One of `string` or `object` | — | The data to send to the Bot when the action is executed. When expressed as an object, `data` is sent back to the Bot when the action is executed, adorned with the values of the inputs expressed as key/value pairs, where the key is the Id of the input. If `data` is expressed as a string, input values are not sent to the Bot. Valid values: `SubmitActionData`. | 1.0 |
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

## TeamsSubmitActionProperties

**Works in:** Teams · Copilot · Outlook

Teams-specific properties associated with the action.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `feedback` | `object` | — | Defines how feedback is provided to the end-user when the action is executed. Valid values: `TeamsSubmitActionFeedback`. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## TeamsSubmitActionFeedback

**Works in:** Teams · Copilot · Outlook

Represents feedback options for an `Action.Submit`.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `hide` | `boolean` | — | Defines if a feedback message should be displayed after the action is executed. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## ImBackSubmitActionData

**Works in:** Teams · Copilot · Outlook

Represents Teams-specific data in an `Action.Submit` to send an Instant Message back to the Bot.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `imBack`. | 1.0 |
| `value` | `string` | — | The value that will be sent to the Bot. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## MessageBackSubmitActionData

**Works in:** Teams · Copilot · Outlook

Represents Teams-specific data in an `Action.Submit` to send a message back to the Bot.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `messageBack`. | 1.0 |
| `displayText` | `string` | — | The optional text that will be displayed as a new message in the conversation, as if the end-user sent it. `displayText` is not sent to the Bot. | 1.0 |
| `text` | `string` | — | The text that will be sent to the Bot. | 1.0 |
| `value` | `any` | — | Optional additional value that will be sent to the Bot. For instance, `value` can encode specific context for the action, such as unique identifiers or a JSON object. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## InvokeSubmitActionData

**Works in:** Teams · Copilot · Outlook

Represents Teams-specific data in an `Action.Submit` to make an Invoke request to the Bot.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `invoke`. | 1.0 |
| `value` | One of `any` or `object` | — | The object to send to the Bot with the Invoke request. Can be strongly typed as one of the below values to trigger a specific action in Teams. Valid values: `CollabStageInvokeDataValue`. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## TaskFetchSubmitActionData

**Works in:** Teams · Copilot · Outlook

Represents Teams-specific data in an `Action.Submit` to open a task module.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `task/fetch`. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## SigninSubmitActionData

**Works in:** Teams · Copilot · Outlook

Represents Teams-specific data in an `Action.Submit` to sign in a user.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `signin`. | 1.0 |
| `value` | `string` | — | The URL to redirect the end-user for signing in. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## CollabStageInvokeDataValue

**Works in:** Teams · Copilot · Outlook

Data for invoking a collaboration stage action.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `tab/tabInfoAction`. | — |
| `tabInfo` | `object` | — | Provides information about the iFrame content, rendered in the collab stage popout window. Valid values: `TabInfo`. | — |

---

## SubmitActionData

**Works in:** Teams · Copilot · Outlook

Represents the data of an `Action.Submit`.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `msteams` | `object` | — | Defines the optional Teams-specific portion of the action's data. Valid values: `ImBackSubmitActionData`, `InvokeSubmitActionData`, `MessageBackSubmitActionData`, `SigninSubmitActionData`, `TaskFetchSubmitActionData`. | 1.0 |
| `msTeams` | `object` | — | Defines the optional Teams-specific portion of the action's data. Equivalent to `msteams`. Valid values: `ImBackSubmitActionData`, `InvokeSubmitActionData`, `MessageBackSubmitActionData`, `SigninSubmitActionData`, `TaskFetchSubmitActionData`. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `[key: string]` | `any` | — | — | — |
