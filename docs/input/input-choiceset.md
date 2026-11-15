# Input.ChoiceSet

**Works in:** Teams · Copilot · Outlook

An input to allow the user to select one or more values.

## Example

```json
{
  "type": "AdaptiveCard",
  "version": "1.3",
  "body": [
    {
      "type": "Input.ChoiceSet",
      "id": "myColor",
      "style": "compact",
      "label": "Compact single select",
      "isMultiSelect": false,
      "value": "1",
      "choices": [
        {"title": "Red", "value": "1"},
        {"title": "Green", "value": "2"},
        {"title": "Blue", "value": "3"}
      ]
    },
    {
      "type": "Input.ChoiceSet",
      "id": "myColor2",
      "style": "expanded",
      "label": "Expanded single select",
      "isMultiSelect": false,
      "value": "1",
      "choices": [
        {"title": "Red", "value": "1"},
        {"title": "Green", "value": "2"},
        {"title": "Blue", "value": "3"}
      ]
    },
    {
      "type": "Input.ChoiceSet",
      "id": "myColor3",
      "isMultiSelect": true,
      "value": "1,3",
      "style": "compact",
      "label": "Compact multiselect",
      "choices": [
        {"title": "Red", "value": "1"},
        {"title": "Green", "value": "2"},
        {"title": "Blue", "value": "3"}
      ]
    },
    {
      "type": "Input.ChoiceSet",
      "id": "myColor4",
      "isMultiSelect": true,
      "value": "1",
      "style": "expanded",
      "label": "Expanded multiselect",
      "choices": [
        {"title": "Red", "value": "1"},
        {"title": "Green", "value": "2"},
        {"title": "Blue", "value": "3"}
      ]
    }
  ],
  "actions": [{"type": "Action.Submit", "title": "OK"}]
}
```

> **Tips**
> - Configure `Input.ChoiceSet` to support Dynamic Typeahead Search.
> - Link a Dynamic Typeahead Search-enabled `Input.ChoiceSet` to another input in the card.
> - Configure `Input.ChoiceSet` as a People Picker.

## Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `Input.ChoiceSet`. | 1.0 |
| `choices` | Array of `object` | — | The choices associated with the input. Valid values: `Choice`. | 1.0 |
| `choices.data` | `object` | — | A `Data.Query` object that defines the dataset from which to dynamically fetch the choices for the input. Valid values: `Data.Query`. | 1.5 |
| `errorMessage` | `string` | — | The error message to display when the input fails validation. See **Input validation** for more details. | 1.3 |
| `fallback` | One of `object` or `string` | — | An alternate element to render if the type of this one is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property. Valid values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Carousel`, `TabSet`, `Accordion`, `Badge`, `ProgressRing`, `ProgressBar`, `LoopComponent`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `Persona`, `PersonaSet`, `Graph resource`, `File`, `Calendar event`, `"drop"`. | 1.2 |
| `grid.area` | `string` | — | **Teams.** The area of a `Layout.AreaGrid` layout in which an element should be displayed. | 1.5 |
| `height` | `string` | `"auto"` | The height of the element. When set to `stretch`, the element will use the remaining vertical space in its container. Valid values: `"auto"`, `"stretch"`. | 1.1 |
| `id` | `string` | — | A unique identifier for the element or action. Input elements must have an `id`, otherwise they will not be validated and their values will not be sent to the Bot. | 1.0 |
| `isMultiSelect` | `boolean` | `false` | Controls whether multiple choices can be selected. | 1.0 |
| `isRequired` | `boolean` | `false` | Controls whether the input is required. See **Input validation** for more details. | 1.3 |
| `isSortKey` | `boolean` | `false` | Controls whether the element should be used as a sort key by elements that allow sorting across a collection of elements. | 1.5 |
| `isVisible` | `boolean` | `true` | Controls the visibility of the element. | 1.2 |
| `isVisible.dynamic` | `string` | — | **Preview.** Defines an expression whose evaluated value will be used to update the `isVisible` property of the element at runtime. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `label` | `string` | — | The label of the input. A label should always be provided to ensure the best user experience especially for users of assistive technology. | 1.3 |
| `lang` | `string` | — | The locale associated with the element. | 1.1 |
| `minColumnWidth` | `string` | — | The minimum width, in pixels, for each column when using a multi-column layout. This ensures that choice items remain readable even when horizontal space is limited. Default is 100 pixels. Valid values: `"<number>px"`. | 1.5 |
| `placeholder` | `string` | — | The text to display as a placeholder when the user has not entered any value. | 1.0 |
| `requires` | `object` | `{}` | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element is not rendered (or its fallback is rendered if provided). Valid values: `HostCapabilities`. | 1.2 |
| `separator` | `boolean` | `false` | Controls whether a separator line should be displayed above the element to visually separate it from the previous element. No separator will be displayed for the first element in a container, even if this property is set to true. | 1.0 |
| `showLabel` | `boolean` | `true` | **Preview.** Controls whether the input's label is visually rendered. When set to false, the label is still applied as the input's accessible name to ensure the best user experience especially for users of assistive technology. | 1.5 |
| `spacing` | `string` | `"Default"` | Controls the amount of space between this element and the previous one. No space will be added for the first element in a container. Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"`. | 1.0 |
| `style` | `string` | `"compact"` | Controls whether the input should be displayed as a dropdown (compact) or a list of radio buttons or checkboxes (expanded). Valid values: `"compact"`, `"expanded"`, `"filtered"`. | 1.0 |
| `targetWidth` | `string` | — | **Teams · Copilot.** Controls for which card width the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space. For more details, see **Responsive layout**. Valid values: `"VeryNarrow"`, `"Narrow"`, `"Standard"`, `"Wide"`, `"atLeast:VeryNarrow"`, `"atMost:VeryNarrow"`, `"atLeast:Narrow"`, `"atMost:Narrow"`, `"atLeast:Standard"`, `"atMost:Standard"`, `"atLeast:Wide"`, `"atMost:Wide"`. | 1.0 |
| `useMultipleColumns` | `boolean` | `false` | Controls whether choice items are arranged in multiple columns in expanded mode, or in a single column. Default is false. | 1.5 |
| `value` | `string` | — | The default value of the input. | 1.0 |
| `valueChangedAction` | `object` | — | **Teams.** An `Action.ResetInputs` action that will be executed when the value of the input changes. Valid values: `Action.OpenUrlDialog`, `Action.Popover`, `Action.ResetInputs`, `Action.RunCommands`. | 1.5 |
| `wrap` | `boolean` | `true` | Controls if choice titles should wrap. | 1.2 |

## Choice

**Works in:** Teams · Copilot · Outlook

A choice as used by the `Input.ChoiceSet` input.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `title` | `string` | — | The text to display for the choice. | 1.0 |
| `value` | `string` | — | The value associated with the choice, as sent to the Bot when an `Action.Submit` or `Action.Execute` is invoked. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

## Data.Query

**Works in:** Teams · Copilot · Outlook

Defines a query to dynamically fetch data from a Bot.

An `application/search` Invoke request received by your Bot for a `Data.Query` includes values of all inputs in the card. This lets you link a Dynamic Typeahead Search-enabled `Input.ChoiceSet` to other inputs and filter results returned by the Bot.

### Example Invoke request

The source example uses `...` and a comment as placeholders, so this is an illustrative **JSON-like** snippet, not strict JSON.

```javascript
{
  "name": "application/search",
  "type": "invoke",
  "value": {
    "queryText": "some text",
    "queryOptions": {
      "skip": 0,
      "top": 15
    },
    "dataset": "cities",
    "data": {
      "input1": "<value of input1>",
      "input2": "<value of input2>",
      ...
    }
  }
  // ... other fields
}
```

> **Tip:** Set `Data.Query.dataset` to `graph.microsoft.com/users` to implement a People Picker. See *Adding a People Picker to your Adaptive Card* for more details.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `Data.Query`. | 1.0 |
| `associatedInputs` | `string` | — | **Teams.** Controls which inputs are associated with the `Data.Query`. When a `Data.Query` is executed, the values of the associated inputs are sent to the Bot, allowing it to perform filtering operations based on the user's input. Valid values: `"auto"`, `"none"`. | 1.0 |
| `count` | `number` | — | The maximum number of data items that should be returned by the query. Card authors should not specify this property in their card payload. It is determined by the client and sent to the Bot to enable pagination. | 1.0 |
| `dataset` | `string` | — | The dataset from which to fetch the data. | 1.0 |
| `skip` | `number` | — | The number of data items to be skipped by the query. Card authors should not specify this property in their card payload. It is determined by the client and sent to the Bot to enable pagination. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
