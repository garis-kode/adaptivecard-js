# AdaptiveCard

**Works in:** Teams · Copilot · Outlook

An Adaptive Card, containing a free-form body of card elements, and an optional set of actions.

## Example

```json
{
  "type": "AdaptiveCard",
  "speak": "Intro to graphic design, concepts video",
  "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.5",
  "body": [
    {
      "type": "Image",
      "url": "https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/course-video/assets/video_image.png",
      "selectAction": {
        "type": "Action.OpenUrl",
        "url": "https://adaptivecards.io/",
        "altText": "Intro to Graphic Design: Concepts Video"
      },
      "style": "RoundedCorners"
    },
    {
      "type": "TextBlock",
      "text": "Intro to Graphic Design: Concepts",
      "wrap": true,
      "size": "Large",
      "weight": "Bolder"
    },
    {
      "type": "Rating",
      "value": 4,
      "count": 1160,
      "color": "Marigold",
      "size": "Medium",
      "fallback": {
        "type": "TextBlock",
        "text": "4 Stars · 1,160",
        "spacing": "None"
      },
      "spacing": "None"
    },
    {
      "type": "TextBlock",
      "text": "Course · 52m · Beginner",
      "wrap": true,
      "isSubtle": true,
      "spacing": "Small"
    },
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "width": "auto",
          "items": [
            {
              "type": "Image",
              "url": "https://raw.githubusercontent.com/OfficeDev/Microsoft-Teams-Card-Samples/main/samples/course-video/assets/logo_image.png",
              "width": "16px",
              "height": "16px",
              "altText": "Logo"
            }
          ],
          "horizontalAlignment": "Center",
          "verticalContentAlignment": "Center"
        },
        {
          "type": "Column",
          "width": "auto",
          "items": [
            {
              "type": "TextBlock",
              "text": "Sketchpad Scholars",
              "wrap": true,
              "weight": "Bolder"
            }
          ],
          "spacing": "Small",
          "verticalContentAlignment": "Center"
        },
        {
          "type": "Column",
          "targetWidth": "AtLeast:Standard",
          "width": "auto",
          "items": [
            {
              "type": "TextBlock",
              "text": "·"
            }
          ],
          "spacing": "Small",
          "verticalContentAlignment": "Center"
        },
        {
          "type": "Column",
          "targetWidth": "AtLeast:Standard",
          "width": "auto",
          "items": [
            {
              "type": "TextBlock",
              "text": "Tony Harper",
              "wrap": true
            }
          ],
          "spacing": "Small",
          "verticalContentAlignment": "Center"
        }
      ],
      "spacing": "None"
    },
    {
      "type": "TextBlock",
      "targetWidth": "AtLeast:Narrow",
      "text": "This course is designed to equip you with an understanding of the key principles and tools necessary for creating compelling designs. You'll gain practical experience with creative software and learn...",
      "wrap": true,
      "id": "truncatedText"
    },
    {
      "type": "TextBlock",
      "targetWidth": "AtLeast:Narrow",
      "text": "This course is designed to equip you with an understanding of the key principles and tools necessary for creating compelling designs. You'll gain practical experience with creative software and learn about design principles through hands-on projects that will help build your portfolio. Enroll now and start your journey to mastering the art of graphic design.",
      "wrap": true,
      "isVisible": false,
      "id": "fullText"
    },
    {
      "type": "RichTextBlock",
      "id": "showMore",
      "targetWidth": "AtLeast:Narrow",
      "spacing": "None",
      "inlines": [
        {
          "type": "TextRun",
          "text": "Show more",
          "selectAction": {
            "type": "Action.ToggleVisibility",
            "targetElements": [
              "truncatedText",
              "fullText",
              "showMore",
              "showLess"
            ]
          }
        }
      ]
    },
    {
      "type": "RichTextBlock",
      "id": "showLess",
      "targetWidth": "AtLeast:Narrow",
      "spacing": "None",
      "inlines": [
        {
          "type": "TextRun",
          "text": "Show less",
          "selectAction": {
            "type": "Action.ToggleVisibility",
            "targetElements": [
              "truncatedText",
              "fullText",
              "showMore",
              "showLess"
            ]
          }
        }
      ],
      "isVisible": false
    },
    {
      "type": "ActionSet",
      "spacing": "Large",
      "targetWidth": "AtLeast:Narrow",
      "actions": [
        {
          "type": "Action.OpenUrl",
          "title": "Open",
          "url": "https://adaptivecards.io/"
        },
        {
          "type": "Action.Execute",
          "title": "Bookmark",
          "iconUrl": "icon:Bookmark"
        }
      ]
    },
    {
      "type": "ActionSet",
      "spacing": "Large",
      "targetWidth": "VeryNarrow",
      "actions": [
        {
          "type": "Action.OpenUrl",
          "title": "Open",
          "url": "https://adaptivecards.io/"
        },
        {
          "type": "Action.Execute",
          "iconUrl": "icon:Bookmark"
        }
      ]
    }
  ]
}
```

> **Important**
> Always set the `speak` property as it allows the application that displays your card to provide a spoken description to screen readers, enhancing the experience for users that rely on assistive technologies. In Microsoft Teams, the spoken description is shown as the preview text in Activity notifications, Mentions and Followed threads slices.

## Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `AdaptiveCard`. | 1.0 |
| `$schema` | `string` | — | A URL to the Adaptive Card schema the card is authored against. | 1.0 |
| `actions` | Array of `object` | — | The card level actions, which always appear at the bottom of the card. Valid values: `Action.Execute`, `Action.InsertImage`, `Action.OpenUrl`, `Action.OpenUrlDialog`, `Action.Popover`, `Action.ResetInputs`, `Action.RunCommands`, `Action.ShowCard`, `Action.Submit`, `Action.ToggleVisibility`. | 1.0 |
| `authentication` | `object` | — | Defines authentication information to enable on-behalf-of single-sign-on or just-in-time OAuth. This information is used in conjunction with the `refresh` property and `Action.Execute` in general. Valid values: `Authentication`. | 1.4 |
| `body` | Array of `object` | — | The body of the card, comprised of a list of elements displayed according to the `layouts` property. If the `layouts` property is not specified, a `Layout.Stack` is used. Valid values: `Accordion`, `ActionSet`, `Badge`, `Carousel`, `Chart.Donut`, `Chart.Gauge`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Pie`, `Chart.VerticalBar`, `Chart.VerticalBar.Grouped`, `CodeBlock`, `ColumnSet`, `Calendar event`, `File`, `Graph resource`, `Persona`, `PersonaSet`, `CompoundButton`, `Container`, `FactSet`, `Icon`, `Image`, `ImageSet`, `Input.ChoiceSet`, `Input.Date`, `Input.Number`, `Input.Rating`, `Input.Text`, `Input.Time`, `Input.Toggle`, `LoopComponent`, `Media`, `ProgressBar`, `ProgressRing`, `Rating`, `RichTextBlock`, `Table`, `TabSet`, `TextBlock`. | 1.0 |
| `fallbackText` | `string` | — | The text that should be displayed if the client is not able to render the card. | 1.0 |
| `metadata` | `object` | — | Metadata associated with the card. Valid values: `CardMetadata`. | 1.4 |
| `msteams` | `object` | — | **Teams.** Teams-specific metadata associated with the card. Valid values: `TeamsCardProperties`. | 1.0 |
| `msTeams` | `object` | — | Teams-specific metadata associated with the card. Equivalent to `msteams`. Valid values: `TeamsCardProperties`. | 1.0 |
| `references` | Array of `object` | — | **Preview.** References that can be cited in `TextBlock` and `RichTextBlock` elements. Valid values: `AdaptiveCardReference`, `DocumentReference`. | 1.5 |
| `refresh` | `object` | — | Defines how the card can be refreshed by making a request to the target Bot. Valid values: `RefreshDefinition`. | 1.4 |
| `resources` | `object` | — | **Teams.** Resources card elements can reference. Valid values: `Resources`. | 1.5 |
| `speak` | `string` | — | The text that should be spoken for the entire card. | 1.0 |
| `version` | `string` | `"1.5"` | The Adaptive Card schema version the card is authored against. Valid values: `"1.0"`, `"1.1"`, `"1.2"`, `"1.3"`, `"1.4"`, `"1.5"`, `"1.6"`. | 1.0 |
| `backgroundImage` | One of `string` or `object` | — | Defines the container's background image. Valid values: `BackgroundImage`. | 1.0 |
| `fallback` | One of `object` or `string` | — | An alternate element to render if the type of this one is unsupported or if the host application doesn't support all the capabilities specified in the `requires` property. Valid values: `Container`, `ActionSet`, `ColumnSet`, `Media`, `RichTextBlock`, `Table`, `TextBlock`, `FactSet`, `ImageSet`, `Image`, `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.Toggle`, `Input.ChoiceSet`, `Input.Rating`, `Rating`, `CompoundButton`, `Icon`, `Carousel`, `TabSet`, `Accordion`, `Badge`, `ProgressRing`, `ProgressBar`, `LoopComponent`, `Chart.Donut`, `Chart.Pie`, `Chart.VerticalBar.Grouped`, `Chart.VerticalBar`, `Chart.HorizontalBar`, `Chart.HorizontalBar.Stacked`, `Chart.Line`, `Chart.Gauge`, `CodeBlock`, `Persona`, `PersonaSet`, `Graph resource`, `File`, `Calendar event`, `"drop"`. | 1.2 |
| `grid.area` | `string` | — | **Teams.** The area of a `Layout.AreaGrid` layout in which an element should be displayed. | 1.5 |
| `id` | `string` | — | A unique identifier for the element or action. Input elements must have an `id`, otherwise they will not be validated and their values will not be sent to the Bot. | 1.0 |
| `isSortKey` | `boolean` | `false` | Controls whether the element should be used as a sort key by elements that allow sorting across a collection of elements. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `lang` | `string` | — | The locale associated with the element. | 1.1 |
| `layouts` | Array of `object` | — | **Teams.** The layouts associated with the container. The container can dynamically switch from one layout to another as the card's width changes. See **Container layouts** for more details. Valid values: `Layout.Stack`, `Layout.Flow`, `Layout.AreaGrid`. | 1.5 |
| `minHeight` | `string` | — | The minimum height, in pixels, of the container, in the `<number>px` format. Valid values: `"<number>px"`. | 1.2 |
| `requires` | `object` | `{}` | A list of capabilities the element requires the host application to support. If the host application doesn't support at least one of the listed capabilities, the element is not rendered (or its fallback is rendered if provided). Valid values: `HostCapabilities`. | 1.2 |
| `rtl` | `boolean` | — | Controls if the content of the card is to be rendered left-to-right or right-to-left. | 1.0 |
| `selectAction` | `object` | — | An Action that will be invoked when the element is tapped or clicked. `Action.ShowCard` is not supported. Valid values: `Action.Execute`, `Action.InsertImage`, `Action.OpenUrl`, `Action.OpenUrlDialog`, `Action.Popover`, `Action.ResetInputs`, `Action.RunCommands`, `Action.Submit`, `Action.ToggleVisibility`. | 1.1 |
| `style` | `string` | — | The style of the container. Container styles control the colors of the background, border and text inside the container, in such a way that contrast requirements are always met. Valid values: `"default"`, `"emphasis"`, `"accent"`, `"good"`, `"attention"`, `"warning"`. | 1.0 |
| `verticalContentAlignment` | `string` | — | Controls how the container's content should be vertically aligned. Valid values: `"Top"`, `"Center"`, `"Bottom"`. | 1.1 |

---

## RefreshDefinition

**Works in:** Teams · Copilot · Outlook

Defines how a card can be refreshed by making a request to the target Bot.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `action` | `object` | — | The `Action.Execute` action to invoke to refresh the card. Valid values: `Action.Execute`. | 1.4 |
| `userIds` | Array of `string` | — | The list of user Ids for which the card will be automatically refreshed. In Teams, in chats or channels with more than 60 users, the card will automatically refresh only for users specified in the `userIds` list. Other users will have to manually click on a "refresh" button. In contexts with fewer than 60 users, the card will automatically refresh for all users. | 1.4 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## Authentication

**Works in:** Teams · Copilot · Outlook

Defines authentication information associated with a card. For more information, refer to the Bot Framework OAuthCard type.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `buttons` | Array of `object` | — | The buttons that should be displayed to the user when prompting for authentication. The array MUST contain one button of type "signin". Other button types are not currently supported. Valid values: `AuthCardButton`. | 1.4 |
| `connectionName` | `string` | — | The identifier for registered OAuth connection setting information. | 1.4 |
| `text` | `string` | — | The text that can be displayed to the end user when prompting them to authenticate. | 1.4 |
| `tokenExchangeResource` | `object` | — | Provides information required to enable on-behalf-of single sign-on user authentication. Valid values: `TokenExchangeResource`. | 1.4 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## AuthCardButton

**Works in:** Teams · Copilot · Outlook

Defines a button as displayed when prompting a user to authenticate. For more information, refer to the Bot Framework CardAction type.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `signin`. | 1.4 |
| `image` | `string` | — | A URL to an image to display alongside the button's caption. | 1.4 |
| `title` | `string` | — | The caption of the button. | 1.4 |
| `value` | `string` | — | The value associated with the button. The meaning of `value` depends on the button's type. | 1.4 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## CardMetadata

**Works in:** Teams · Copilot · Outlook

Card-level metadata.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `webUrl` | `string` | — | The URL the card originates from. When `webUrl` is set, the card is dubbed an Adaptive Card-based Loop Component and, when pasted in Teams or other Loop Component-capable host applications, the URL will unfurl to the same exact card. | 1.4 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## TokenExchangeResource

**Works in:** Teams · Copilot · Outlook

Defines information required to enable on-behalf-of single sign-on user authentication. For more information, refer to the Bot Framework TokenExchangeResource type.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `id` | `string` | — | The unique identified of this token exchange instance. | 1.4 |
| `providerId` | `string` | — | An identifier for the identity provider with which to attempt a token exchange. | 1.4 |
| `uri` | `string` | — | An application ID or resource identifier with which to exchange a token on behalf of. This property is identity provider- and application-specific. | 1.4 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## TeamsCardProperties

**Works in:** Teams · Copilot · Outlook

Represents a set of Teams-specific properties on a card.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `entities` | Array of `object` | — | The Teams-specific entities associated with the card. Valid values: `mention`. | 1.0 |
| `width` | `string` | — | Controls the width of the card in a Teams chat. Note that setting width to `"full"` will not actually stretch the card to the "full width" of the chat pane. It will only make the card wider than when the width property isn't set. Valid values: `"full"`. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## mention

**Works in:** Teams · Copilot · Outlook

Represents a mention to a person.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `mention`. | 1.0 |
| `mentioned` | `object` | — | Defines the entity being mentioned. Valid values: `MentionedEntity`. | 1.0 |
| `text` | `string` | — | The text that will be substituted with the mention. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## Resources

**Works in:** Teams · Copilot · Outlook

The resources that can be used in the body of the card.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `strings` | Dictionary of `object` | — | String resources that can provide translations in multiple languages. String resources make it possible to craft cards that are automatically localized according to the language settings of the application that displays the card. Valid values: `StringResource`. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## StringResource

**Works in:** Teams · Copilot · Outlook

Defines the replacement string values.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `defaultValue` | `string` | — | The default value of the string, which is used when no matching localized value is found. | 1.5 |
| `localizedValues` | Dictionary of `string` | — | Localized values of the string, where keys represent the locale (e.g. en-US) in the `<ISO 639-1>(-<ISO 3166-1 alpha-2>)` format. `<ISO 639-1>` is the 2-letter language code and `<ISO 3166-1 alpha-2>` is the optional 2-letter country code. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## MentionedEntity

**Works in:** Teams · Copilot · Outlook

Represents a mentioned person or tag.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `id` | `string` | — | The Id of a person (typically a Microsoft Entra user Id) or tag. | 1.0 |
| `mentionType` | `string` | `"Person"` | The type of the mentioned entity. Valid values: `"Person"`, `"Tag"`. | 1.0 |
| `name` | `string` | — | The name of the mentioned entity. | 1.0 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |

---

## AdaptiveCardReference

**Works in:** Teams · Copilot · Outlook

A type of reference whose content is an Adaptive Card.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `AdaptiveCardReference`. | 1.0 |
| `abstract` | `string` | — | The abstract of the reference, providing a short summary of the reference's content. | 1.5 |
| `content` | `any` | — | Must be an Adaptive Card payload. | 1.5 |
| `icon` | `string` | — | Icon to be displayed in the reference. Valid values: `"msWord"`, `"msExcel"`, `"msPowerPoint"`, `"msOneNote"`, `"msSharePoint"`, `"msVisio"`, `"msLoop"`, `"msWhiteboard"`, `"code"`, `"sketch"`, `"adobeIllustrator"`, `"adobePhotoshop"`, `"adobeInDesign"`, `"adobeFlash"`, `"image"`, `"gif"`, `"video"`, `"sound"`, `"zip"`, `"text"`, `"pdf"`. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `keywords` | Array of `string` | — | Keywords for the reference. Maximum allowed is 3. | 1.5 |
| `title` | `string` | — | Title of the reference. | 1.5 |
| `url` | `string` | — | Optional URL for the reference title. | 1.5 |

---

## DocumentReference

**Works in:** Teams · Copilot · Outlook

A Document type reference.

### Schema

| Name | Type | Default | Description | In version |
| --- | --- | --- | --- | --- |
| `type` | `string` | — | Must be `DocumentReference`. | 1.0 |
| `abstract` | `string` | — | The abstract of the reference, providing a short summary of the reference's content. | 1.5 |
| `icon` | `string` | — | Icon to be displayed in the reference. Valid values: `"msWord"`, `"msExcel"`, `"msPowerPoint"`, `"msOneNote"`, `"msSharePoint"`, `"msVisio"`, `"msLoop"`, `"msWhiteboard"`, `"code"`, `"sketch"`, `"adobeIllustrator"`, `"adobePhotoshop"`, `"adobeInDesign"`, `"adobeFlash"`, `"image"`, `"gif"`, `"video"`, `"sound"`, `"zip"`, `"text"`, `"pdf"`. | 1.5 |
| `key` | `string` | — | Defines an optional key for the object. Keys are seldom needed, but in some scenarios, specifying keys can help maintain visual state in the host application. | 1.0 |
| `keywords` | Array of `string` | — | Keywords for the reference. Maximum allowed is 3. | 1.5 |
| `title` | `string` | — | Title of the reference. | 1.5 |
| `url` | `string` | — | Optional URL for the reference title. | 1.5 |
