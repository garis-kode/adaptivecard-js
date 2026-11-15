# Container layouts

**Works in:** Teams · Copilot · Outlook

By default, elements in containers (such as `Container`, `Column`, `TableCell` or the `AdaptiveCard` itself) are laid out in a top-to-bottom stack. This type of layout is appropriate for many scenarios, but sometimes it is a bit constraining. To split the horizontal space of a card into different areas, one would typically use the `ColumnSet` element which, while powerful, comes with its set of challenges and gotchas.

Adaptive Cards support three layout types that can be applied to any container:

- `Layout.Stack`: Stacks elements on top of each other (the default layout).
- `Layout.Flow`: Spreads elements horizontally and wraps them across multiple rows, as needed.
- `Layout.AreaGrid`: Divides the container into named areas into which elements can be placed via the `grid.area` property which can be set on any element.

---

## Using Container layouts to implement responsive layout

Container layouts can be used to easily implement responsive layouts, as it is possible to associate multiple layouts with a single container, each dedicated to a specific card width. At runtime, the appropriate layout is automatically used to optimally arrange elements given the available width. Let's take an example.

Let's say we want to define a card with a typical layout:

- An image on the left,
- And some text on the right of the image

But, we want the text to show below the image when there is not enough horizontal space.

This can be done very easily using `Layout.AreaGrid`:

### Example

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "layouts": [
    {
      "type": "Layout.AreaGrid",
      "targetWidth": "atLeast:standard",
      "columns": [
        60
      ],
      "areas": [
        {
          "name": "imageArea"
        },
        {
          "name": "textArea",
          "column": 2
        }
      ]
    }
  ],
  "body": [
    {
      "type": "Image",
      "url": "images/adaptivecards1.jpeg",
      "grid.area": "imageArea",
      "style": "RoundedCorners",
      "targetWidth": "atLeast:narrow",
      "altText": "A graphic that represents the Adaptive Card framework"
    },
    {
      "type": "Container",
      "grid.area": "textArea",
      "items": [
        {
          "type": "TextBlock",
          "text": "Adaptive Cards",
          "wrap": true,
          "size": "ExtraLarge",
          "weight": "Bolder"
        },
        {
          "type": "TextBlock",
          "text": "The simple, lightweight card format to power your ideas.",
          "wrap": true
        }
      ]
    }
  ]
}
```

### How does it work?

Notice the `layouts` property defined on the whole card:

```json
{
  "type": "Layout.AreaGrid",
  "targetWidth": "atLeast:standard",
  "columns": [
    60
  ],
  "areas": [
    {
      "name": "image"
    },
    {
      "name": "text",
      "column": 2
    }
  ]
}
```

Which means:

- Organize elements in the card in a grid layout only when the width of the card is at least `"standard"` (which corresponds to the typical width of a card in a Teams chat, for example).
- If the width of the card is less than `"standard"`, use the default layout, namely `Layout.Stack`.
- The grid layout has at least one column that should use 60% of the available space. The grid may have other columns (depending on how areas are defined) but because they are not explicitly defined they will each share an equal portion of the remaining space.
- Two areas are defined:
  - One for the image, which implicitly maps to the first column and first row of the grid.
  - One for the text, which will cover the second column and first row.

Now notice how elements in the card's body are assigned a grid area via the `grid.area` property:

```json
{
  "type": "Container",
  "grid.area": "textArea", // The text container is assigned to the textArea
  "items": [
    ...
  ]
}
```

```json
{
  "type": "Image",
  "url": "...",
  "grid.area": "imageArea", // The Image is assigned to the imageArea
  "style": "RoundedCorners",
  "targetWidth": "atLeast:narrow" // Also notice the image is set to not display at all at the "very narrow" width
}
```

---

## Layout.Stack

**Works in:** Teams · Copilot · Outlook

A layout that stacks elements on top of each other. `Layout.Stack` is the default layout used by `AdaptiveCard` and all containers.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `Layout.Stack`. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `targetWidth` | `string` | — | Controls for which card width the layout should be used. Valid values: `"VeryNarrow"`, `"Narrow"`, `"Standard"`, `"Wide"`, `"atLeast:VeryNarrow"`, `"atMost:VeryNarrow"`, `"atLeast:Narrow"`, `"atMost:Narrow"`, `"atLeast:Standard"`, `"atMost:Standard"`, `"atLeast:Wide"`, `"atMost:Wide"`. | 1.5 |

---

## Layout.Flow

**Works in:** Teams · Copilot · Outlook

A layout that spreads elements horizontally and wraps them across multiple rows, as needed.

Use `Layout.Flow` to layout lists of elements such as images without having to worry about the amount of horizontal space available. The width and alignment of elements can be tuned as desired. Each row automatically gets the appropriate height, and spacing between columns and rows is configurable and automatically enforced.

### Examples

#### Top-left alignment

```json
{
  "type": "AdaptiveCard",
  "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.5",
  "layouts": [
    {
      "type": "Layout.Flow",
      "maxItemWidth": "130px",
      "horizontalItemsAlignment": "Left"
    }
  ],
  "body": [
    {
      "type": "Image",
      "url": "images/guitar1.jpeg",
      "style": "RoundedCorners",
      "altText": "An electric guitar"
    },
    {
      "type": "Image",
      "url": "images/adaptivecards1.jpeg",
      "style": "RoundedCorners",
      "altText": "A graphic that represents the Adaptive Card framework"
    },
    {
      "type": "Image",
      "url": "images/cup1.jpeg",
      "style": "RoundedCorners",
      "altText": "A cup"
    },
    {
      "type": "Image",
      "url": "images/developer1.jpeg",
      "style": "RoundedCorners",
      "altText": "A developer working on a computer"
    },
    {
      "type": "Image",
      "url": "images/painting1.jpeg",
      "style": "RoundedCorners",
      "altText": "A painting"
    }
  ]
}
```

#### Horizontally and vertically centered

```json
{
  "type": "AdaptiveCard",
  "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.5",
  "layouts": [
    {
      "type": "Layout.Flow",
      "maxItemWidth": "80px",
      "horizontalItemsAlignment": "center",
      "verticalItemsAlignment": "center"
    }
  ],
  "body": [
    {
      "type": "Image",
      "url": "images/guitar1.jpeg",
      "style": "RoundedCorners",
      "altText": "An electric guitar"
    },
    {
      "type": "Image",
      "url": "images/adaptivecards1.jpeg",
      "style": "RoundedCorners",
      "altText": "A graphic that represents the Adaptive Card framework"
    },
    {
      "type": "Image",
      "url": "images/painting1.jpeg",
      "style": "RoundedCorners",
      "altText": "A painting"
    },
    {
      "type": "Image",
      "url": "images/cup1.jpeg",
      "style": "RoundedCorners",
      "altText": "A cup"
    }
  ]
}
```

#### Always fill the available space on each row

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "layouts": [
    {
      "type": "Layout.Flow",
      "itemWidth": "150px",
      "itemFit": "Fill",
      "horizontalItemsAlignment": "Left"
    }
  ],
  "body": [
    {
      "type": "Image",
      "url": "images/guitar1.jpeg",
      "style": "RoundedCorners",
      "altText": "An electric guitar"
    },
    {
      "type": "Image",
      "url": "images/adaptivecards1.jpeg",
      "style": "RoundedCorners",
      "altText": "A graphic that represents the Adaptive Card framework"
    },
    {
      "type": "Image",
      "url": "images/painting1.jpeg",
      "style": "RoundedCorners",
      "altText": "A painting"
    },
    {
      "type": "Image",
      "url": "images/guitar2.jpeg",
      "style": "RoundedCorners",
      "altText": "An electric guitar"
    }
  ]
}
```

> **Tip**
> Don't use the `maxItemWidth` property with `"itemFit": "fill"`. By definition, `maxItemWidth` prevents items from exceeding a certain width, which is incompatible with filling the remaining available space on a row by slightly enlarging each element in that row. Use the `itemWidth` property instead.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `Layout.Flow`. | 1.5 |
| `columnSpacing` | `string` | `"Default"` | The space between items. Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"`. | 1.5 |
| `horizontalItemsAlignment` | `string` | `"Center"` | Controls how the content of the container should be horizontally aligned. Valid values: `"Left"`, `"Center"`, `"Right"`. | 1.5 |
| `itemFit` | `string` | `"Fit"` | Controls how item should fit inside the container. Valid values: `"Fit"`, `"Fill"`. | 1.5 |
| `itemWidth` | `string` | — | The width, in pixels, of each item, in the `<number>px` format. Should not be used if `maxItemWidth` and/or `minItemWidth` are set. Valid values: `"<number>px"`. | 1.5 |
| `maxItemWidth` | `string` | — | The maximum width, in pixels, of each item, in the `<number>px` format. Should not be used if `itemWidth` is set. Valid values: `"<number>px"`. | 1.5 |
| `minItemWidth` | `string` | — | The minimum width, in pixels, of each item, in the `<number>px` format. Should not be used if `itemWidth` is set. Valid values: `"<number>px"`. | 1.5 |
| `rowSpacing` | `string` | `"Default"` | The space between rows of items. Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"`. | 1.5 |
| `verticalItemsAlignment` | `string` | `"Top"` | Controls how the content of the container should be vertically aligned. Valid values: `"Top"`, `"Center"`, `"Bottom"`. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `targetWidth` | `string` | — | Controls for which card width the layout should be used. Valid values: `"VeryNarrow"`, `"Narrow"`, `"Standard"`, `"Wide"`, `"atLeast:VeryNarrow"`, `"atMost:VeryNarrow"`, `"atLeast:Narrow"`, `"atMost:Narrow"`, `"atLeast:Standard"`, `"atMost:Standard"`, `"atLeast:Wide"`, `"atMost:Wide"`. | 1.5 |

---

## Layout.AreaGrid

**Works in:** Teams · Copilot · Outlook

A layout that divides a container into named areas into which elements can be placed.

Use `Layout.AreaGrid` to easily organize elements in a container (be it the `AdaptiveCard` itself, a `Container`, a `Column` or a `TableCell`) into a grid. `Layout.AreaGrid` is particularly useful for easily designing responsive cards: define multiple `Layout.AreaGrid` layouts on a single container and target them at different card widths to automatically switch from one layout to another at runtime according to the available width. See **Container layouts** for more details.

To use `Layout.AreaGrid`:

1. Include a `Layout.AreaGrid` object in the `layouts` collection of the target container.
2. Optionally define explicit columns for the grid. Columns can be defined in terms of percentage of the available width or in pixels using the `<number>px` format.
3. Define areas in the grid using the `column`, `row`, `columnSpan` and `rowSpan` properties.
4. Assign elements in the container to specific areas by setting their `grid.area` property to match the name of one of the defined areas.

### Example configuration

The below example:

- Explicitly defines one column that will use 20% of the available horizontal space.
- Defines three areas:
  - The first covers the first column on the first row of the grid.
  - The second covers the second column (whose width is implicitly the remaining horizontal space) on the first row.
  - The third covers the first two columns on the second row.

```json
"layouts": [
  {
    "type": "Layout.AreaGrid",
    "columns": [ 20 ],
    "areas": [
      {
        "name": "area1"
      },
      {
        "name": "area2",
        "column": 2
      },
      {
        "name": "area2",
        "row": 2,
        "columnSpan": 2
      }
    ]
  }
]
```

> **Tip**
> It is not required to explicitly define columns in the `Layout.AreaGrid`. Any implicit column as per the defined areas will use an equal portion of the remaining horizontal space in the grid.

> **Important**
> Defining columns using pixels can lead to your card rendering poorly on narrower surfaces. Make sure to define alternate layouts to ensure your card always looks great. See **Responsive Layout** and **Container Layouts** for more details.
>
> If you assign multiple elements to the same grid area via their `grid.area` property, they will effectively be rendered on top of each other. This can be useful if used in conjunction with the `isVisible` or `targetWidth` properties, as well as `Action.ToggleVisibility`. In all other cases, it should be avoided.

### Example

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "layouts": [
    {
      "type": "Layout.AreaGrid",
      "targetWidth": "atLeast:Standard",
      "columns": [
        20,
        40
      ],
      "areas": [
        {
          "name": "area1",
          "columnSpan": 2
        },
        {
          "name": "area2",
          "column": 3
        },
        {
          "name": "area3",
          "row": 2
        },
        {
          "name": "area4",
          "column": 2,
          "row": 2
        },
        {
          "name": "area5",
          "column": 3,
          "row": 2
        }
      ]
    },
    {
      "type": "Layout.AreaGrid",
      "targetWidth": "atLeast:narrow",
      "columns": [
        50
      ],
      "areas": [
        {
          "name": "area1",
          "columnSpan": 2
        },
        {
          "name": "area2",
          "row": 2
        },
        {
          "name": "area3",
          "row": 2,
          "column": 2
        },
        {
          "name": "area4",
          "row": 3
        },
        {
          "name": "area5",
          "row": 3,
          "column": 2
        }
      ]
    }
  ],
  "body": [
    {
      "type": "Container",
      "grid.area": "area1",
      "style": "emphasis",
      "showBorder": true,
      "roundedCorners": true,
      "items": [
        {
          "type": "TextBlock",
          "text": "Area 1",
          "wrap": true
        },
        {
          "type": "TextBlock",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "wrap": true
        }
      ]
    },
    {
      "type": "Container",
      "grid.area": "area2",
      "style": "good",
      "showBorder": true,
      "roundedCorners": true,
      "items": [
        {
          "type": "TextBlock",
          "text": "Area 2",
          "wrap": true
        }
      ],
      "height": "stretch"
    },
    {
      "type": "Container",
      "grid.area": "area3",
      "style": "accent",
      "showBorder": true,
      "roundedCorners": true,
      "items": [
        {
          "type": "TextBlock",
          "text": "Area 3",
          "wrap": true
        }
      ]
    },
    {
      "type": "Container",
      "grid.area": "area4",
      "style": "attention",
      "showBorder": true,
      "roundedCorners": true,
      "items": [
        {
          "type": "TextBlock",
          "text": "Area 4",
          "wrap": true
        }
      ]
    },
    {
      "type": "Container",
      "grid.area": "area5",
      "style": "warning",
      "showBorder": true,
      "roundedCorners": true,
      "items": [
        {
          "type": "TextBlock",
          "text": "Area 5",
          "wrap": true
        }
      ]
    }
  ]
}
```

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `Layout.AreaGrid`. | 1.5 |
| `areas` | Array of `object` | — | The areas in the grid layout. Valid values: [`GridArea`](#gridarea). | 1.5 |
| `columns` | Array of `number` or `string` | — | The columns in the grid layout, defined as a percentage of the available width or in pixels using the `<number>px` format. | 1.5 |
| `columnSpacing` | `string` | `"Default"` | The space between columns. Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"`. | 1.5 |
| `rowSpacing` | `string` | `"Default"` | The space between rows. Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"`. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `targetWidth` | `string` | — | Controls for which card width the layout should be used. Valid values: `"VeryNarrow"`, `"Narrow"`, `"Standard"`, `"Wide"`, `"atLeast:VeryNarrow"`, `"atMost:VeryNarrow"`, `"atLeast:Narrow"`, `"atMost:Narrow"`, `"atLeast:Standard"`, `"atMost:Standard"`, `"atLeast:Wide"`, `"atMost:Wide"`. | 1.5 |

### GridArea

**Works in:** Teams · Copilot · Outlook

Defines an area in a `Layout.AreaGrid` layout.

#### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `column` | `number` | `1` | The start column index of the area. Column indices start at 1. | 1.5 |
| `columnSpan` | `number` | `1` | Defines how many columns the area should span. | 1.5 |
| `name` | `string` | — | The name of the area. To place an element in this area, set its `grid.area` property to match the name of the area. | 1.5 |
| `row` | `number` | `1` | The start row index of the area. Row indices start at 1. | 1.5 |
| `rowSpan` | `number` | `1` | Defines how many rows the area should span. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

