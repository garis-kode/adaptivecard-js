import { AbstractAction } from "../../Action/AbstractAction.js";
import { DonutChart } from "../../Chart/Donut/DonutChart.js";
import { DonutChartData } from "../../Chart/Donut/DonutChartData.js";
import { GaugeChart } from "../../Chart/Gauge/GaugeChart.js";
import { GaugeChartLegend } from "../../Chart/Gauge/GaugeChartLegend.js";
import { HorizontalBarChart } from "../../Chart/HorizontalBar/HorizontalBarChart.js";
import { HorizontalBarChartDataValue } from "../../Chart/HorizontalBar/HorizontalBarChartDataValue.js";
import { StackedHorizontalBarChart } from "../../Chart/HorizontalBar/StackedHorizontalBarChart.js";
import { StackedHorizontalBarChartData } from "../../Chart/HorizontalBar/StackedHorizontalBarChartData.js";
import { LineChart } from "../../Chart/Line/LineChart.js";
import { LineChartData } from "../../Chart/Line/LineChartData.js";
import { PieChart } from "../../Chart/Pie/PieChart.js";
import { GroupedVerticalBarChart } from "../../Chart/VerticalBar/GroupedVerticalBarChart.js";
import { GroupedVerticalBarChartData } from "../../Chart/VerticalBar/GroupedVerticalBarChartData.js";
import { VerticalBarChart } from "../../Chart/VerticalBar/VerticalBarChart.js";
import { VerticalBarChartDataValue } from "../../Chart/VerticalBar/VerticalBarChartDataValue.js";
import { ChartColorSet } from "../../Enum/ChartColorSet.js";
import { CodeBlockLanguage } from "../../Enum/CodeBlockLanguage.js";
import { ContainerStyle } from "../../Enum/ContainerStyle.js";
import { Height } from "../../Enum/Height.js";
import { Spacing } from "../../Enum/Spacing.js";
import { VerticalAlignment } from "../../Enum/VerticalAlignment.js";
import { ChoiceSetInput } from "../../Input/ChoiceSet/ChoiceSetInput.js";
import { DateInput } from "../../Input/DateInput.js";
import { NumberInput } from "../../Input/NumberInput.js";
import { RatingInput } from "../../Input/RatingInput.js";
import { TextInput } from "../../Input/TextInput.js";
import { TimeInput } from "../../Input/TimeInput.js";
import { ToggleInput } from "../../Input/ToggleInput.js";
import { AbstractLayout } from "../../Layout/AbstractLayout.js";
import { AreaGridLayout } from "../../Layout/AreaGridLayout.js";
import { FlowLayout } from "../../Layout/FlowLayout.js";
import { StackLayout } from "../../Layout/StackLayout.js";
import { BackgroundImage } from "../../Shared/BackgroundImage.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasItems } from "../../Support/HasItems.js";
import type { HasLayouts } from "../../Support/HasLayouts.js";
import type { HasSeparator } from "../../Support/HasSeparator.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { AbstractElement } from "../AbstractElement.js";
import { Accordion } from "../Accordion.js";
import { ActionSet } from "../ActionSet.js";
import { Badge } from "../Badge.js";
import { Carousel } from "../Carousel/Carousel.js";
import { CodeBlock } from "../CodeBlock.js";
import { ColumnSet } from "../Column/ColumnSet.js";
import { CompoundButton } from "../CompoundButton.js";
import { Container } from "../Container.js";
import { Fact } from "../Fact/Fact.js";
import { FactSet } from "../Fact/FactSet.js";
import { Icon } from "../Icon.js";
import { Image } from "../Image/Image.js";
import { ImageSet } from "../Image/ImageSet.js";
import { Media } from "../Media/Media.js";
import { ProgressBar } from "../Progress/ProgressBar.js";
import { ProgressRing } from "../Progress/ProgressRing.js";
import { Rating } from "../Rating.js";
import { RichTextBlock } from "../RichTextBlock/RichTextBlock.js";
import { TabSet } from "../TabSet.js";
import { TextBlock } from "../TextBlock.js";
import { Table } from "./Table.js";

/**
 * Represents a cell in a table row.
 */
export class TableCell
  extends AbstractElement
  implements HasHeight, HasItems, HasLayouts, HasSeparator, HasSpacing
{
  public static make(): TableCell {
    return new TableCell();
  }

  /**
   * The height of the element. When set to `stretch`, the element will use
   * the remaining vertical space in its container.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.set("height", height);
  }

  /**
   * Controls whether a separator line should be displayed above the element
   * to visually separate it from the previous element. No separator will be
   * displayed for the first element in a container, even if this property is
   * set to true.
   */
  public separator(separator: boolean = true): this {
    return this.set("separator", separator);
  }

  /**
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): this {
    return this.set("spacing", spacing);
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
    return "items";
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
   * The style of the container. Container styles control the colors of the background,
   * border and text inside the container, in such a way that contrast requirements are always met.
   * Valid values: "default", "emphasis", "accent", "good", "attention", "warning".
   */
  public style(style: ContainerStyle): this {
    return this.set("style", style);
  }

  /**
   * Controls how the container's content should be vertically aligned.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalContentAlignment(alignment: VerticalAlignment): this {
    return this.set("verticalContentAlignment", alignment);
  }

  /**
   * Controls if the container should bleed into its parent. A bleeding container extends into its parent's padding.
   */
  public bleed(bleed = true): this {
    return this.set("bleed", bleed);
  }

  /**
   * The minimum height, in pixels, of the container, in the `<number>px` format.
   * Valid values: "<number>px".
   */
  public minHeight(minHeight: string): this {
    return this.set("minHeight", minHeight);
  }

  /**
   * The maximum height, in pixels, of the container, in the `<number>px` format. When the content of a container
   * exceeds the container's maximum height, a vertical scrollbar is displayed.
   * Valid values: "<number>px".
   */
  public maxHeight(maxHeight: string): this {
    return this.set("maxHeight", maxHeight);
  }

  /**
   * Controls if the content of the card is to be rendered left-to-right or right-to-left.
   */
  public rtl(rtl = true): this {
    return this.set("rtl", rtl);
  }

  /**
   * Defines the container's background image.
   * Valid values: "BackgroundImage".
   */
  public backgroundImage(backgroundImage: BackgroundImage): this {
    return this.set("backgroundImage", backgroundImage);
  }

  /**
   * An Action that will be invoked when the element is tapped or clicked.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set("selectAction", action);
  }

  public getType(): string {
    return "TableCell";
  }
}
