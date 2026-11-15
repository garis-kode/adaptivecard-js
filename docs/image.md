# Image

**Works in:** Teams · Copilot · Outlook

A standalone image element.

## Example

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "layouts": [
    { "type": "Layout.Flow", "horizontalItemsAlignment": "Left" }
  ],
  "body": [
    { "type": "Image", "url": "images/guitar1.jpeg", "width": "128px", "altText": "An electric guitar" },
    { "type": "Image", "url": "images/guitar2.jpeg", "width": "128px", "style": "RoundedCorners", "altText": "An electric guitar" },
    { "type": "Image", "url": "images/guitar3.jpeg", "width": "128px", "style": "Person", "altText": "An electric guitar" }
  ]
}
```

> **Tip:** If you need to overlay content on top of an image, use a `Container` with a background image.

> **Important:** When using explicit dimensions in pixels, maintain the image's aspect ratio.

- If you set both width and height in pixels, use dimensions that maintain the image's aspect ratio. In most cases, set either width or height, but not both, so the other dimension is automatically calculated.
- Prefer setting width over height, especially for landscape images, to control the horizontal space used.
- In general, use explicit pixel dimensions only for small images such as avatars or thumbnails.
- Make your card responsive so images look good on any screen and device.
- Always set `altText` for accessibility and screen readers.

## Base64-encoded images

You can use Base64-encoded Data URIs as image URLs to fully embed your images in an Adaptive Card:

```json
{
  "type": "Image",
  "url": "data:image/png;base64,<base64-encoded bytes of the image>"
}
```

### Example

The provided example uses an `AdaptiveCard` version `1.0` containing an `Image` with a long, inline, PNG Data URI. The Base64 binary payload is not reproduced below; replace the placeholder with the original source's encoded bytes to reconstruct that exact example.

```json
{
  "version": "1.0",
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "Image",
      "url": "data:image/png;base64,<full PNG Base64 payload>"
    }
  ]
}
```

> **Tip:** For large images, favor public URLs over Base64-encoded images. Base64 significantly increases Adaptive Card payload size, network transfer, and loading time.

## Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `Image`. | 1.0 |
| `allowExpand` | `boolean` | `false` | Controls if the image can be expanded to full screen. | 1.2 |
| `altText` | `string` | — | The alternate text for the image, used for accessibility purposes. | 1.0 |
| `backgroundColor` | `string` | — | The background color of the image in the `#RRGGBB` or `#AARRGGBB` format. | 1.1 |
| `fitMode` | `string` | `"Fill"` | **Teams.** Controls how the image should be fitted inside its bounding box. `imageFit` is only meaningful when both the width and height properties are set. When `fitMode` is set to `contain`, the default style is always used. Valid values: `"Cover"`, `"Contain"`, `"Fill"`. | 1.5 |
| `height` | `string` | `"auto"` | The height of the image. Valid values: `"auto"`, `"stretch"`, `"<number>px"`. | 1.1 |
| `horizontalContentAlignment` | `string` | `"Left"` | **Teams.** Controls the horizontal position of the image within its bounding box. `horizontalContentAlignment` is only meaningful when both the width and height properties are set and `fitMode` is set to either `cover` or `contain`. Valid values: `"Left"`, `"Center"`, `"Right"`. | 1.5 |
| `msteams` | `object` | — | **Teams.** Teams-specific metadata associated with the image. Valid values: `TeamsImageProperties`. | 1.2 |
| `msTeams` | `object` | — | Teams-specific metadata associated with the image. Equivalent to `msteams`. Valid values: `TeamsImageProperties`. | 1.2 |
| `selectAction` | `object` | — | An Action that will be invoked when the image is tapped or clicked. `Action.ShowCard` is not supported. Valid values: `Action.Execute`, `Action.InsertImage`, `Action.OpenUrl`, `Action.OpenUrlDialog`, `Action.Popover`, `Action.ResetInputs`, `Action.RunCommands`, `Action.Submit`, `Action.ToggleVisibility`. | 1.1 |
| `size` | `string` | `"Auto"` | The size of the image. Valid values: `"Auto"`, `"Stretch"`, `"Small"`, `"Medium"`, `"Large"`. | 1.0 |
| `style` | `string` | `"Default"` | The style of the image. Valid values: `"Default"`, `"Person"`, `"RoundedCorners"` (**Teams**). | 1.0 |
| `themedUrls` | Array of `object` | — | **Teams.** A set of theme-specific image URLs. Valid values: `ThemedUrl`. | 1.5 |
| `url` | `string` | — | The URL (or Base64-encoded Data URI) of the image. Acceptable formats are PNG, JPEG, GIF and SVG. | 1.0 |
| `verticalContentAlignment` | `string` | `"Top"` | **Teams.** Controls the vertical position of the image within its bounding box. `verticalContentAlignment` is only meaningful when both the width and height properties are set and `fitMode` is set to either `cover` or `contain`. Valid values: `"Top"`, `"Center"`, `"Bottom"`. | 1.5 |
| `width` | `string` | `"auto"` | The width of the image. Valid values: `"auto"`, `"stretch"`, `"<number>px"`. | 1.1 |
| `fallback` | One of `object` or `string` | — | An alternate element to render if the type of this one is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property. Valid values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Carousel`, `TabSet`, `Accordion`, `Badge`, `ProgressRing`, `ProgressBar`, `LoopComponent`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `Persona`, `PersonaSet`, `Graph resource`, `File`, `Calendar event`, `"drop"`. | 1.2 |
| `grid.area` | `string` | — | **Teams.** The area of a `Layout.AreaGrid` layout in which an element should be displayed. | 1.5 |
| `horizontalAlignment` | `string` | — | Controls how the element should be horizontally aligned. Valid values: `"Left"`, `"Center"`, `"Right"`. | 1.0 |
| `id` | `string` | — | A unique identifier for the element or action. Input elements must have an `id`, otherwise they will not be validated and their values will not be sent to the Bot. | 1.0 |
| `isSortKey` | `boolean` | `false` | Controls whether the element should be used as a sort key by elements that allow sorting across a collection of elements. | 1.5 |
| `isVisible` | `boolean` | `true` | Controls the visibility of the element. | 1.2 |
| `isVisible.dynamic` | `string` | — | **Preview.** Defines an expression whose evaluated value will be used to update the `isVisible` property of the element at runtime. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `lang` | `string` | — | The locale associated with the element. | 1.1 |
| `requires` | `object` | `{}` | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element is not rendered (or its fallback is rendered if provided). Valid values: `HostCapabilities`. | 1.2 |
| `separator` | `boolean` | `false` | Controls whether a separator line should be displayed above the element to visually separate it from the previous element. No separator will be displayed for the first element in a container, even if this property is set to true. | 1.0 |
| `spacing` | `string` | `"Default"` | Controls the amount of space between this element and the previous one. No space will be added for the first element in a container. Valid values: `"None"`, `"ExtraSmall"`, `"Small"`, `"Default"`, `"Medium"`, `"Large"`, `"ExtraLarge"`, `"Padding"`. | 1.0 |
| `targetWidth` | `string` | — | **Teams · Copilot.** Controls for which card width the element should be displayed. If `targetWidth` isn't specified, the element is rendered at all card widths. Using `targetWidth` makes it possible to author responsive cards that adapt their layout to the available horizontal space. For more details, see **Responsive layout**. Valid values: `"VeryNarrow"`, `"Narrow"`, `"Standard"`, `"Wide"`, `"atLeast:VeryNarrow"`, `"atMost:VeryNarrow"`, `"atLeast:Narrow"`, `"atMost:Narrow"`, `"atLeast:Standard"`, `"atMost:Standard"`, `"atLeast:Wide"`, `"atMost:Wide"`. | 1.0 |

---

## TeamsImageProperties

**Works in:** Teams · Copilot · Outlook

Represents a set of Teams-specific properties on an image.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `allowExpand` | `boolean` | — | Controls if the image is expandable in Teams. This property is equivalent to the `Image.allowExpand` property. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
