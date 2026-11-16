import { AbstractAction } from "./Action/AbstractAction.js";
import { DonutChart } from "./Chart/Donut/DonutChart.js";
import { DonutChartData } from "./Chart/Donut/DonutChartData.js";
import { GaugeChart } from "./Chart/Gauge/GaugeChart.js";
import { GaugeChartLegend } from "./Chart/Gauge/GaugeChartLegend.js";
import { HorizontalBarChart } from "./Chart/HorizontalBar/HorizontalBarChart.js";
import { HorizontalBarChartDataValue } from "./Chart/HorizontalBar/HorizontalBarChartDataValue.js";
import { StackedHorizontalBarChart } from "./Chart/HorizontalBar/StackedHorizontalBarChart.js";
import { StackedHorizontalBarChartData } from "./Chart/HorizontalBar/StackedHorizontalBarChartData.js";
import { LineChart } from "./Chart/Line/LineChart.js";
import { LineChartData } from "./Chart/Line/LineChartData.js";
import { PieChart } from "./Chart/Pie/PieChart.js";
import { GroupedVerticalBarChart } from "./Chart/VerticalBar/GroupedVerticalBarChart.js";
import { GroupedVerticalBarChartData } from "./Chart/VerticalBar/GroupedVerticalBarChartData.js";
import { VerticalBarChart } from "./Chart/VerticalBar/VerticalBarChart.js";
import { VerticalBarChartDataValue } from "./Chart/VerticalBar/VerticalBarChartDataValue.js";
import { AbstractBlockElement } from "./Element/AbstractBlockElement.js";
import { Accordion } from "./Element/Accordion.js";
import { ActionSet } from "./Element/ActionSet.js";
import { Badge } from "./Element/Badge.js";
import { Carousel } from "./Element/Carousel/Carousel.js";
import { CodeBlock } from "./Element/CodeBlock.js";
import { ColumnSet } from "./Element/Column/ColumnSet.js";
import { CompoundButton } from "./Element/CompoundButton.js";
import { Container } from "./Element/Container.js";
import { Fact } from "./Element/Fact/Fact.js";
import { FactSet } from "./Element/Fact/FactSet.js";
import { Icon } from "./Element/Icon.js";
import { Image } from "./Element/Image/Image.js";
import { ImageSet } from "./Element/Image/ImageSet.js";
import { Media } from "./Element/Media/Media.js";
import { ProgressBar } from "./Element/Progress/ProgressBar.js";
import { ProgressRing } from "./Element/Progress/ProgressRing.js";
import { Rating } from "./Element/Rating.js";
import { RichTextBlock } from "./Element/RichTextBlock/RichTextBlock.js";
import { Table } from "./Element/Table/Table.js";
import { TabSet } from "./Element/TabSet.js";
import { TextBlock } from "./Element/TextBlock.js";
import { ChartColorSet } from "./Enum/ChartColorSet.js";
import { CodeBlockLanguage } from "./Enum/CodeBlockLanguage.js";
import { ContainerStyle } from "./Enum/ContainerStyle.js";
import { VerticalAlignment } from "./Enum/VerticalAlignment.js";
import { ChoiceSetInput } from "./Input/ChoiceSet/ChoiceSetInput.js";
import { DateInput } from "./Input/DateInput.js";
import { NumberInput } from "./Input/NumberInput.js";
import { RatingInput } from "./Input/RatingInput.js";
import { TextInput } from "./Input/TextInput.js";
import { TimeInput } from "./Input/TimeInput.js";
import { ToggleInput } from "./Input/ToggleInput.js";
import { AbstractLayout } from "./Layout/AbstractLayout.js";
import { AreaGridLayout } from "./Layout/AreaGridLayout.js";
import { FlowLayout } from "./Layout/FlowLayout.js";
import { StackLayout } from "./Layout/StackLayout.js";
import { Node } from "./Node.js";
import { HostCapabilities } from "./Other/HostCapabilities.js";
import { AdaptiveCardReference } from "./Shared/AdaptiveCardReference.js";
import { Authentication } from "./Shared/Authentication.js";
import { BackgroundImage } from "./Shared/BackgroundImage.js";
import { DocumentReference } from "./Shared/DocumentReference.js";
import { Metadata } from "./Shared/Metadata.js";
import { Refresh } from "./Shared/Refresh.js";
import { Resources } from "./Shared/Resources.js";
import { TeamsCardProperties } from "./Shared/TeamsCardProperties.js";
import type { HasItems } from "./Support/HasItems.js";
import type { HasKey } from "./Support/HasKey.js";
import type { HasLayouts } from "./Support/HasLayouts.js";

/**
 * An Adaptive Card, containing a free-form body of card elements, and an optional set of actions.
 */
export class AdaptiveCard extends Node implements HasItems, HasKey, HasLayouts {
  public static readonly SCHEMA_URL =
    "https://adaptivecards.io/schemas/adaptive-card.json";
  public static readonly DEFAULT_VERSION = "1.6";

  constructor(version: string = AdaptiveCard.DEFAULT_VERSION) {
    super();
    this.version(version);
  }

  public static make(
    version: string = AdaptiveCard.DEFAULT_VERSION,
  ): AdaptiveCard {
    return new AdaptiveCard(version);
  }

  public getType(): string {
    return "AdaptiveCard";
  }

  /**
   * Defines an optional key for the object. Keys are seldom needed, but in
   * some scenarios, specifying keys can help maintain visual state in the
   * host application.
   */
  public key(key: string): this {
    return this.set("key", key);
  }

  /**
   * Add layouts associated with the container. The container can dynamically switch from one layout to
   * another as the card's width changes.
   */
  public addLayouts(layout: AbstractLayout | Iterable<AbstractLayout>): this {
    if (
      !(layout instanceof AbstractLayout) &&
      Symbol.iterator in Object(layout)
    ) {
      for (const item of layout) {
        this.push("layouts", item);
      }

      return this;
    }

    return this.push("layouts", layout);
  }

  /**
   * The layouts associated with the container. The container can dynamically switch
   * from one layout to another as the card's width changes.
   * Valid values: "Layout.Stack", "Layout.Flow", "Layout.AreaGrid".
   */
  public layouts(layouts: Iterable<AbstractLayout>): this {
    return this.addLayouts(layouts);
  }

  /**
   * Add a layout that stacks elements on top of each other (the default layout) to the container's
   * layouts.
   */
  public addStackLayout(
    callback: ((layout: StackLayout) => void) | null = null,
  ): this {
    const layout = StackLayout.make();
    if (callback !== null) {
      callback(layout);
    }

    return this.addLayouts(layout);
  }

  /**
   * Add a layout that spreads elements horizontally and wraps them across multiple rows, as needed, to the
   * container's layouts.
   */
  public addFlowLayout(
    callback: ((layout: FlowLayout) => void) | null = null,
  ): this {
    const layout = FlowLayout.make();
    if (callback !== null) {
      callback(layout);
    }

    return this.addLayouts(layout);
  }

  /**
   * Add a layout that divides the container into named areas, into which elements can be placed via the
   * `grid.area` property, to the container's layouts.
   */
  public addAreaGridLayout(
    callback: ((layout: AreaGridLayout) => void) | null = null,
  ): this {
    const layout = AreaGridLayout.make();
    if (callback !== null) {
      callback(layout);
    }

    return this.addLayouts(layout);
  }

  /**
   * JSON key the items are stored under. AdaptiveCard overrides this to "body".
   */
  protected itemsKey(): string {
    return "body";
  }

  /**
   * Add one or more block elements.
   */
  public addItems(
    element: AbstractBlockElement | Iterable<AbstractBlockElement>,
  ): this {
    if (
      !(element instanceof AbstractBlockElement) &&
      Symbol.iterator in Object(element)
    ) {
      for (const item of element) {
        this.push(this.itemsKey(), item);
      }

      return this;
    }

    return this.push(this.itemsKey(), element);
  }

  /**
   * The items in the container.
   */
  public items(elements: Iterable<AbstractBlockElement>): this {
    return this.addItems(elements);
  }

  /**
   * Add a block of text, optionally formatted using Markdown.
   */
  public addTextBlock(
    text: string,
    configure: ((textBlock: TextBlock) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new TextBlock(text), configure));
  }

  /**
   * Add a standalone image element.
   */
  public addImage(
    url: string,
    configure: ((image: Image) => unknown) | null = null,
  ): this {
    const image = new Image().url(url);

    return this.addItems(this.configure(image, configure));
  }

  /**
   * Add a rich text block that displays formatted text.
   */
  public addRichTextBlock(
    configure: ((richTextBlock: RichTextBlock) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new RichTextBlock(), configure));
  }

  /**
   * Add a container for other elements.
   */
  public addContainer(
    configure: ((container: Container) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new Container(), configure));
  }

  /**
   * Add a set of columns, splitting the available horizontal space so elements
   * can be organized in a row.
   */
  public addColumnSet(
    configure: ((columnSet: ColumnSet) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new ColumnSet(), configure));
  }

  /**
   * Add a set of facts, displayed as a table or a vertical list when horizontal
   * space is constrained.
   */
  public addFactSet(
    facts: Iterable<Fact> = [],
    configure: ((factSet: FactSet) => unknown) | null = null,
  ): this {
    const factSet = new FactSet();
    factSet.facts(facts);

    return this.addItems(this.configure(factSet, configure));
  }

  /**
   * Add a set of images, displayed side-by-side and wrapped across multiple rows
   * as needed.
   */
  public addImageSet(
    configure: ((imageSet: ImageSet) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new ImageSet(), configure));
  }

  /**
   * Add a media element, making it possible to embed videos inside a card.
   */
  public addMedia(configure: ((media: Media) => unknown) | null = null): this {
    return this.addItems(this.configure(new Media(), configure));
  }

  /**
   * Add a table to display data in a tabular way, with rows, columns and cells.
   */
  public addTable(configure: ((table: Table) => unknown) | null = null): this {
    return this.addItems(this.configure(new Table(), configure));
  }

  /**
   * Add an action set, which can be placed anywhere in the card.
   */
  public addActionSet(
    configure: ((actionSet: ActionSet) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new ActionSet(), configure));
  }

  /**
   * Add a badge element to show an icon and/or text in a compact form over a
   * colored background.
   */
  public addBadge(
    text: string | null = null,
    configure: ((badge: Badge) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new Badge(text), configure));
  }

  /**
   * Add a carousel with sliding pages.
   */
  public addCarousel(
    configure: ((carousel: Carousel) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new Carousel(), configure));
  }

  /**
   * Add an accordion, allowing the end-user to toggle the display of content by
   * expanding or collapsing pages.
   */
  public addAccordion(
    configure: ((accordion: Accordion) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new Accordion(), configure));
  }

  /**
   * Add a tab set, allowing the end-user to navigate through pages using a tabbed
   * interface.
   */
  public addTabSet(
    configure: ((tabSet: TabSet) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new TabSet(), configure));
  }

  /**
   * Add a formatted and syntax-colored code block.
   */
  public addCodeBlock(
    code: string,
    language: CodeBlockLanguage = CodeBlockLanguage.PlainText,
    configure: ((codeBlock: CodeBlock) => unknown) | null = null,
  ): this {
    const codeBlock = new CodeBlock().codeSnippet(code).language(language);

    return this.addItems(this.configure(codeBlock, configure));
  }

  /**
   * Add a special type of button with an icon, title and description.
   */
  public addCompoundButton(
    title: string | null = null,
    description: string | null = null,
    configure: ((compoundButton: CompoundButton) => unknown) | null = null,
  ): this {
    return this.addItems(
      this.configure(new CompoundButton(title, description), configure),
    );
  }

  /**
   * Add a standalone icon element. Icons can be picked from the vast Adaptive Card
   * icon catalog.
   */
  public addIcon(
    name: string,
    configure: ((icon: Icon) => unknown) | null = null,
  ): this {
    const icon = new Icon().name(name);

    return this.addItems(this.configure(icon, configure));
  }

  /**
   * Add a progress bar element to represent a value within a range.
   */
  public addProgressBar(
    value: number | null = null,
    max = 100,
    configure: ((progressBar: ProgressBar) => unknown) | null = null,
  ): this {
    const bar = new ProgressBar();
    if (value !== null) {
      bar.value(value);
    }
    if (max !== 100) {
      bar.max(max);
    }

    return this.addItems(this.configure(bar, configure));
  }

  /**
   * Add a spinning ring element to indicate progress.
   */
  public addProgressRing(
    label: string | null = null,
    configure: ((progressRing: ProgressRing) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new ProgressRing(label), configure));
  }

  /**
   * Add a read-only star rating element to display the rating of something.
   */
  public addRating(
    value: number | null = null,
    max = 5,
    configure: ((rating: Rating) => unknown) | null = null,
  ): this {
    const rating = new Rating();
    if (value !== null) {
      rating.value(value);
    }
    if (max !== 5) {
      rating.max(max);
    }

    return this.addItems(this.configure(rating, configure));
  }

  /**
   * Add an input to allow the user to enter text.
   */
  public addTextInput(
    id: string,
    label: string | null = null,
    placeholder: string | null = null,
    configure: ((textInput: TextInput) => unknown) | null = null,
  ): this {
    return this.addItems(
      this.configure(new TextInput(id, label, placeholder), configure),
    );
  }

  /**
   * Add an input to allow the user to enter a number.
   */
  public addNumberInput(
    id: string,
    label: string | null = null,
    placeholder: string | null = null,
    configure: ((numberInput: NumberInput) => unknown) | null = null,
  ): this {
    return this.addItems(
      this.configure(new NumberInput(id, label, placeholder), configure),
    );
  }

  /**
   * Add an input to allow the user to select a date.
   */
  public addDateInput(
    id: string,
    label: string | null = null,
    configure: ((dateInput: DateInput) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new DateInput(id, label), configure));
  }

  /**
   * Add an input to allow the user to select a time.
   */
  public addTimeInput(
    id: string,
    label: string | null = null,
    configure: ((timeInput: TimeInput) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new TimeInput(id, label), configure));
  }

  /**
   * Add an input to allow the user to select between on/off states.
   */
  public addToggleInput(
    id: string,
    title: string | null = null,
    configure: ((toggleInput: ToggleInput) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new ToggleInput(id, title), configure));
  }

  /**
   * Add an input to allow the user to select one or more values.
   */
  public addChoiceSetInput(
    id: string,
    configure: ((choiceSetInput: ChoiceSetInput) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new ChoiceSetInput(id), configure));
  }

  /**
   * Add an input to allow the user to rate something using stars.
   */
  public addRatingInput(
    id: string,
    label: string | null = null,
    configure: ((ratingInput: RatingInput) => unknown) | null = null,
  ): this {
    return this.addItems(this.configure(new RatingInput(id, label), configure));
  }

  /**
   * Add a donut chart.
   */
  public addDonutChart(
    title: string,
    showTitle: boolean | null = null,
    data: Iterable<DonutChartData> | null = null,
    configure: ((donutChart: DonutChart) => unknown) | null = null,
  ): this {
    return this.addItems(
      this.configure(new DonutChart(title, showTitle, data), configure),
    );
  }

  /**
   * Add a gauge chart.
   */
  public addGaugeChart(
    title: string,
    showTitle: boolean | null = null,
    value: number | null = null,
    segments: Iterable<GaugeChartLegend> | null = null,
    configure: ((gaugeChart: GaugeChart) => unknown) | null = null,
  ): this {
    return this.addItems(
      this.configure(
        new GaugeChart(title, showTitle, value, segments),
        configure,
      ),
    );
  }

  /**
   * Add a horizontal bar chart.
   */
  public addHorizontalBarChart(
    title: string,
    data: Iterable<HorizontalBarChartDataValue>,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
    configure:
      ((horizontalBarChart: HorizontalBarChart) => unknown) | null = null,
  ): this {
    return this.addItems(
      this.configure(
        new HorizontalBarChart(
          title,
          data,
          showTitle,
          xAxisTitle,
          yAxisTitle,
          colorSet,
        ),
        configure,
      ),
    );
  }

  /**
   * Add a stacked horizontal bar chart.
   */
  public addStackedHorizontalBarChart(
    title: string,
    data: Iterable<StackedHorizontalBarChartData>,
    showTitle: boolean | null = null,
    configure:
      | ((stackedHorizontalBarChart: StackedHorizontalBarChart) => unknown)
      | null = null,
  ): this {
    return this.addItems(
      this.configure(
        new StackedHorizontalBarChart(title, data, showTitle),
        configure,
      ),
    );
  }

  /**
   * Add a line chart.
   */
  public addLineChart(
    title: string,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
    data: Iterable<LineChartData> | null = null,
    configure: ((lineChart: LineChart) => unknown) | null = null,
  ): this {
    return this.addItems(
      this.configure(
        new LineChart(title, showTitle, xAxisTitle, yAxisTitle, colorSet, data),
        configure,
      ),
    );
  }

  /**
   * Add a pie chart.
   */
  public addPieChart(
    title: string,
    showTitle: boolean | null = null,
    data: Iterable<DonutChartData> | null = null,
    configure: ((pieChart: PieChart) => unknown) | null = null,
  ): this {
    return this.addItems(
      this.configure(new PieChart(title, showTitle, data), configure),
    );
  }

  /**
   * Add a vertical bar chart.
   */
  public addVerticalBarChart(
    title: string,
    data: Iterable<VerticalBarChartDataValue>,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
    configure: ((verticalBarChart: VerticalBarChart) => unknown) | null = null,
  ): this {
    return this.addItems(
      this.configure(
        new VerticalBarChart(
          title,
          data,
          showTitle,
          xAxisTitle,
          yAxisTitle,
          colorSet,
        ),
        configure,
      ),
    );
  }

  /**
   * Add a grouped vertical bar chart.
   */
  public addGroupedVerticalBarChart(
    title: string,
    data: Iterable<GroupedVerticalBarChartData> | null = null,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
    configure:
      | ((groupedVerticalBarChart: GroupedVerticalBarChart) => unknown)
      | null = null,
  ): this {
    return this.addItems(
      this.configure(
        new GroupedVerticalBarChart(
          title,
          data,
          showTitle,
          xAxisTitle,
          yAxisTitle,
          colorSet,
        ),
        configure,
      ),
    );
  }

  private configure<E extends object>(
    element: E,
    configure: ((el: E) => unknown) | null,
  ): E {
    if (configure !== null) {
      configure(element);
    }

    return element;
  }

  /**
   * The Adaptive Card schema version the card is authored against.
   * Valid values: "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6".
   */
  public version(version: string): this {
    return this.set("version", version);
  }

  /**
   * The body of the card, comprised of a list of elements displayed according to
   * the `layouts` property. If the `layouts` property is not specified, a
   * `Layout.Stack` is used.
   * Valid values: "Accordion", "ActionSet", "Badge", "Carousel", "Chart.Donut", "Chart.Gauge",
   * "Chart.HorizontalBar", "Chart.HorizontalBar.Stacked", "Chart.Line", "Chart.Pie",
   * "Chart.VerticalBar", "Chart.VerticalBar.Grouped", "CodeBlock", "ColumnSet", "Calendar event",
   * "File", "Graph resource", "Persona", "PersonaSet", "CompoundButton", "Container", "FactSet",
   * "Icon", "Image", "ImageSet", "Input.ChoiceSet", "Input.Date", "Input.Number", "Input.Rating",
   * "Input.Text", "Input.Time", "Input.Toggle", "LoopComponent", "Media", "ProgressBar",
   * "ProgressRing", "Rating", "RichTextBlock", "Table", "TabSet", "TextBlock".
   */
  public body(elements: Iterable<AbstractBlockElement>): this {
    return this.addItems(elements);
  }

  /**
   * A URL to the Adaptive Card schema the card is authored against.
   */
  public schema(schema: string): this {
    return this.set("$schema", schema);
  }

  /**
   * Add card level actions, which always appear at the bottom of the card.
   */
  public addActions(action: AbstractAction | Iterable<AbstractAction>): this {
    if (
      !(action instanceof AbstractAction) &&
      Symbol.iterator in Object(action)
    ) {
      for (const item of action) {
        this.push("actions", item);
      }

      return this;
    }

    return this.push("actions", action);
  }

  /**
   * The card level actions, which always appear at the bottom of the card.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.ShowCard", "Action.Submit",
   * "Action.ToggleVisibility".
   */
  public actions(actions: Iterable<AbstractAction>): this {
    return this.addActions(actions);
  }

  /**
   * An Action that will be invoked when the element is tapped or clicked. `Action.ShowCard` is
   * not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl",
   * "Action.OpenUrlDialog", "Action.Popover", "Action.ResetInputs", "Action.RunCommands",
   * "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set("selectAction", action);
  }

  /**
   * The text that should be displayed if the client is not able to render the card.
   */
  public fallbackText(text: string): this {
    return this.set("fallbackText", text);
  }

  /**
   * Defines the container's background image.
   * Valid values: "BackgroundImage".
   */
  public backgroundImage(backgroundImage: BackgroundImage): this {
    return this.set("backgroundImage", backgroundImage);
  }

  /**
   * The minimum height, in pixels, of the container, in the `<number>px` format.
   * Valid values: "<number>px".
   */
  public minHeight(minHeight: string): this {
    return this.set("minHeight", minHeight);
  }

  /**
   * A unique identifier for the element or action. Input elements must have an `id`,
   * otherwise they will not be validated and their values will not be sent to the Bot.
   */
  public id(id: string): this {
    return this.set("id", id);
  }

  /**
   * An alternate element to render if the type of this one is unsupported or
   * if the host application doesn't support all the capabilities specified in
   * the `requires` property.
   * Valid values: "Container", "ActionSet", "ColumnSet", "Media", "RichTextBlock", "Table",
   * "TextBlock", "FactSet", "ImageSet", "Image", "Input.Text", "Input.Date", "Input.Time",
   * "Input.Number", "Input.Toggle", "Input.ChoiceSet", "Input.Rating", "Rating", "CompoundButton",
   * "Icon", "Carousel", "TabSet", "Accordion", "Badge", "ProgressRing", "ProgressBar",
   * "LoopComponent", "Chart.Donut", "Chart.Pie", "Chart.VerticalBar.Grouped", "Chart.VerticalBar",
   * "Chart.HorizontalBar", "Chart.HorizontalBar.Stacked", "Chart.Line", "Chart.Gauge",
   * "CodeBlock", "Persona", "PersonaSet", "Graph resource", "File", "Calendar event", "drop".
   */
  public fallback(fallback: unknown): this {
    return this.set("fallback", fallback);
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
   * The area of a `Layout.AreaGrid` layout in which an element should be displayed.
   */
  public gridArea(gridArea: string): this {
    return this.set("grid.area", gridArea);
  }

  /**
   * Controls whether the element should be used as a sort key by elements
   * that allow sorting across a collection of elements.
   */
  public isSortKey(isSortKey = true): this {
    return this.set("isSortKey", isSortKey);
  }

  /**
   * Controls how the container's content should be vertically aligned.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalContentAlignment(alignment: VerticalAlignment): this {
    return this.set("verticalContentAlignment", alignment);
  }

  /**
   * The style of the container. Container styles control the colors of the
   * background, border and text inside the container, in such a way that
   * contrast requirements are always met.
   * Valid values: "default", "emphasis", "accent", "good", "attention", "warning".
   */
  public style(style: ContainerStyle): this {
    return this.set("style", style);
  }

  /**
   * Controls if the content of the card is to be rendered left-to-right or right-to-left.
   */
  public rtl(rtl = true): this {
    return this.set("rtl", rtl);
  }

  /**
   * The text that should be spoken for the entire card.
   */
  public speak(speak: string): this {
    return this.set("speak", speak);
  }

  /**
   * The locale associated with the element.
   */
  public lang(lang: string): this {
    return this.set("lang", lang);
  }

  /**
   * Defines how the card can be refreshed by making a request to the target Bot.
   * Valid values: "RefreshDefinition".
   */
  public refresh(refresh: Refresh): this {
    return this.set("refresh", refresh);
  }

  /**
   * Defines authentication information to enable on-behalf-of single-sign-on or just-in-time OAuth.
   * This information is used in conjunction with the `refresh` property and `Action.Execute` in general.
   * Valid values: "Authentication".
   */
  public authentication(authentication: Authentication): this {
    return this.set("authentication", authentication);
  }

  /**
   * Metadata associated with the card.
   * Valid values: "CardMetadata".
   */
  public metadata(metadata: Metadata): this {
    return this.set("metadata", metadata);
  }

  /**
   * Teams-specific metadata associated with the card. Valid values: `TeamsCardProperties`.
   */
  public msteams(msteams: TeamsCardProperties, useCamelCaseKey = false): this {
    if (useCamelCaseKey) {
      return this.set("msTeams", msteams);
    }

    return this.set("msteams", msteams);
  }

  /**
   * Resources card elements can reference.
   * Valid values: "Resources".
   */
  public resources(resources: Resources): this {
    return this.set("resources", resources);
  }

  /**
   * Add references that can be cited in `TextBlock` and `RichTextBlock` elements.
   */
  public addReferences(
    reference:
      | AdaptiveCardReference
      | DocumentReference
      | Iterable<AdaptiveCardReference | DocumentReference>,
  ): this {
    if (
      !(reference instanceof AdaptiveCardReference) &&
      !(reference instanceof DocumentReference) &&
      Symbol.iterator in Object(reference)
    ) {
      for (const item of reference) {
        this.push("references", item);
      }

      return this;
    }

    return this.push("references", reference);
  }

  /**
   * References that can be cited in TextBlock and RichTextBlock elements.
   * Valid values: "AdaptiveCardReference", "DocumentReference".
   */
  public references(
    references: Iterable<AdaptiveCardReference | DocumentReference>,
  ): this {
    return this.addReferences(references);
  }

  /**
   * Emit the card as an object with `$schema`, `type` and `version` ordered
   * first (as the samples in this repo do).
   */
  public override toObject(): Record<string, unknown> {
    const base = super.toObject();

    const ordered: Record<string, unknown> = {
      $schema:
        (Object.hasOwn(base, "$schema") ? base["$schema"] : undefined) ??
        AdaptiveCard.SCHEMA_URL,
      type: Object.hasOwn(base, "type") ? base["type"] : undefined,
    };

    if (Object.hasOwn(base, "version") && base["version"] !== undefined) {
      Node.defineOwnProperty(ordered, "version", base["version"]);
    }

    for (const [key, value] of Object.entries(base)) {
      if (!Object.hasOwn(ordered, key)) {
        Node.defineOwnProperty(ordered, key, value);
      }
    }

    return ordered;
  }

  /**
   * Alias of `toObject()` for PHP API parity.
   */
  public override toArray(): Record<string, unknown> {
    return this.toObject();
  }

  public toJson(pretty = true): string {
    return pretty
      ? JSON.stringify(this.toObject(), null, 4)
      : JSON.stringify(this.toObject());
  }

  public override toString(): string {
    return this.toJson();
  }
}
