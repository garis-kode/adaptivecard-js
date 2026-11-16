import type { DonutChart } from "../Chart/Donut/DonutChart.js";
import type { DonutChartData } from "../Chart/Donut/DonutChartData.js";
import type { GaugeChart } from "../Chart/Gauge/GaugeChart.js";
import type { GaugeChartLegend } from "../Chart/Gauge/GaugeChartLegend.js";
import type { HorizontalBarChart } from "../Chart/HorizontalBar/HorizontalBarChart.js";
import type { HorizontalBarChartDataValue } from "../Chart/HorizontalBar/HorizontalBarChartDataValue.js";
import type { StackedHorizontalBarChart } from "../Chart/HorizontalBar/StackedHorizontalBarChart.js";
import type { StackedHorizontalBarChartData } from "../Chart/HorizontalBar/StackedHorizontalBarChartData.js";
import type { LineChart } from "../Chart/Line/LineChart.js";
import type { LineChartData } from "../Chart/Line/LineChartData.js";
import type { PieChart } from "../Chart/Pie/PieChart.js";
import type { GroupedVerticalBarChart } from "../Chart/VerticalBar/GroupedVerticalBarChart.js";
import type { GroupedVerticalBarChartData } from "../Chart/VerticalBar/GroupedVerticalBarChartData.js";
import type { VerticalBarChart } from "../Chart/VerticalBar/VerticalBarChart.js";
import type { VerticalBarChartDataValue } from "../Chart/VerticalBar/VerticalBarChartDataValue.js";
import type { AbstractBlockElement } from "../Element/AbstractBlockElement.js";
import type { Accordion } from "../Element/Accordion.js";
import type { ActionSet } from "../Element/ActionSet.js";
import type { Badge } from "../Element/Badge.js";
import type { Carousel } from "../Element/Carousel/Carousel.js";
import type { CodeBlock } from "../Element/CodeBlock.js";
import type { ColumnSet } from "../Element/Column/ColumnSet.js";
import type { CompoundButton } from "../Element/CompoundButton.js";
import type { Container } from "../Element/Container.js";
import type { Fact } from "../Element/Fact/Fact.js";
import type { FactSet } from "../Element/Fact/FactSet.js";
import type { Icon } from "../Element/Icon.js";
import type { Image } from "../Element/Image/Image.js";
import type { ImageSet } from "../Element/Image/ImageSet.js";
import type { Media } from "../Element/Media/Media.js";
import type { ProgressBar } from "../Element/Progress/ProgressBar.js";
import type { ProgressRing } from "../Element/Progress/ProgressRing.js";
import type { Rating } from "../Element/Rating.js";
import type { RichTextBlock } from "../Element/RichTextBlock/RichTextBlock.js";
import type { Table } from "../Element/Table/Table.js";
import type { TabSet } from "../Element/TabSet.js";
import type { TextBlock } from "../Element/TextBlock.js";
import type { ChartColorSet } from "../Enum/ChartColorSet.js";
import type { CodeBlockLanguage } from "../Enum/CodeBlockLanguage.js";
import type { ChoiceSetInput } from "../Input/ChoiceSet/ChoiceSetInput.js";
import type { DateInput } from "../Input/DateInput.js";
import type { NumberInput } from "../Input/NumberInput.js";
import type { RatingInput } from "../Input/RatingInput.js";
import type { TextInput } from "../Input/TextInput.js";
import type { TimeInput } from "../Input/TimeInput.js";
import type { ToggleInput } from "../Input/ToggleInput.js";

export interface HasItems {
  /**
   * Add one or more block elements.
   */
  addItems(
    element: AbstractBlockElement | Iterable<AbstractBlockElement>,
  ): this;

  /**
   * The items in the container.
   */
  items(elements: Iterable<AbstractBlockElement>): this;

  /**
   * Add a block of text, optionally formatted using Markdown.
   */
  addTextBlock(
    text: string,
    configure?: ((textBlock: TextBlock) => unknown) | null,
  ): this;

  /**
   * Add a standalone image element.
   */
  addImage(url: string, configure?: ((image: Image) => unknown) | null): this;

  /**
   * Add a rich text block that displays formatted text.
   */
  addRichTextBlock(
    configure?: ((richTextBlock: RichTextBlock) => unknown) | null,
  ): this;

  /**
   * Add a container for other elements.
   */
  addContainer(configure?: ((container: Container) => unknown) | null): this;

  /**
   * Add a set of columns, splitting the available horizontal space so elements
   * can be organized in a row.
   */
  addColumnSet(configure?: ((columnSet: ColumnSet) => unknown) | null): this;

  /**
   * Add a set of facts, displayed as a table or a vertical list when horizontal
   * space is constrained.
   */
  addFactSet(
    facts?: Iterable<Fact>,
    configure?: ((factSet: FactSet) => unknown) | null,
  ): this;

  /**
   * Add a set of images, displayed side-by-side and wrapped across multiple rows
   * as needed.
   */
  addImageSet(configure?: ((imageSet: ImageSet) => unknown) | null): this;

  /**
   * Add a media element, making it possible to embed videos inside a card.
   */
  addMedia(configure?: ((media: Media) => unknown) | null): this;

  /**
   * Add a table to display data in a tabular way, with rows, columns and cells.
   */
  addTable(configure?: ((table: Table) => unknown) | null): this;

  /**
   * Add an action set, which can be placed anywhere in the card.
   */
  addActionSet(configure?: ((actionSet: ActionSet) => unknown) | null): this;

  /**
   * Add a badge element to show an icon and/or text in a compact form over a
   * colored background.
   */
  addBadge(
    text?: string | null,
    configure?: ((badge: Badge) => unknown) | null,
  ): this;

  /**
   * Add a carousel with sliding pages.
   */
  addCarousel(configure?: ((carousel: Carousel) => unknown) | null): this;

  /**
   * Add an accordion, allowing the end-user to toggle the display of content by
   * expanding or collapsing pages.
   */
  addAccordion(configure?: ((accordion: Accordion) => unknown) | null): this;

  /**
   * Add a tab set, allowing the end-user to navigate through pages using a tabbed
   * interface.
   */
  addTabSet(configure?: ((tabSet: TabSet) => unknown) | null): this;

  /**
   * Add a formatted and syntax-colored code block.
   */
  addCodeBlock(
    code: string,
    language?: CodeBlockLanguage,
    configure?: ((codeBlock: CodeBlock) => unknown) | null,
  ): this;

  /**
   * Add a special type of button with an icon, title and description.
   */
  addCompoundButton(
    title?: string | null,
    description?: string | null,
    configure?: ((compoundButton: CompoundButton) => unknown) | null,
  ): this;

  /**
   * Add a standalone icon element. Icons can be picked from the vast Adaptive Card
   * icon catalog.
   */
  addIcon(name: string, configure?: ((icon: Icon) => unknown) | null): this;

  /**
   * Add a progress bar element to represent a value within a range.
   */
  addProgressBar(
    value?: number | null,
    max?: number,
    configure?: ((progressBar: ProgressBar) => unknown) | null,
  ): this;

  /**
   * Add a spinning ring element to indicate progress.
   */
  addProgressRing(
    label?: string | null,
    configure?: ((progressRing: ProgressRing) => unknown) | null,
  ): this;

  /**
   * Add a read-only star rating element to display the rating of something.
   */
  addRating(
    value?: number | null,
    max?: number,
    configure?: ((rating: Rating) => unknown) | null,
  ): this;

  /**
   * Add an input to allow the user to enter text.
   */
  addTextInput(
    id: string,
    label?: string | null,
    placeholder?: string | null,
    configure?: ((textInput: TextInput) => unknown) | null,
  ): this;

  /**
   * Add an input to allow the user to enter a number.
   */
  addNumberInput(
    id: string,
    label?: string | null,
    placeholder?: string | null,
    configure?: ((numberInput: NumberInput) => unknown) | null,
  ): this;

  /**
   * Add an input to allow the user to select a date.
   */
  addDateInput(
    id: string,
    label?: string | null,
    configure?: ((dateInput: DateInput) => unknown) | null,
  ): this;

  /**
   * Add an input to allow the user to select a time.
   */
  addTimeInput(
    id: string,
    label?: string | null,
    configure?: ((timeInput: TimeInput) => unknown) | null,
  ): this;

  /**
   * Add an input to allow the user to select between on/off states.
   */
  addToggleInput(
    id: string,
    title?: string | null,
    configure?: ((toggleInput: ToggleInput) => unknown) | null,
  ): this;

  /**
   * Add an input to allow the user to select one or more values.
   */
  addChoiceSetInput(
    id: string,
    configure?: ((choiceSetInput: ChoiceSetInput) => unknown) | null,
  ): this;

  /**
   * Add an input to allow the user to rate something using stars.
   */
  addRatingInput(
    id: string,
    label?: string | null,
    configure?: ((ratingInput: RatingInput) => unknown) | null,
  ): this;

  /**
   * Add a donut chart.
   */
  addDonutChart(
    title: string,
    showTitle?: boolean | null,
    data?: Iterable<DonutChartData> | null,
    configure?: ((donutChart: DonutChart) => unknown) | null,
  ): this;

  /**
   * Add a gauge chart.
   */
  addGaugeChart(
    title: string,
    showTitle?: boolean | null,
    value?: number | null,
    segments?: Iterable<GaugeChartLegend> | null,
    configure?: ((gaugeChart: GaugeChart) => unknown) | null,
  ): this;

  /**
   * Add a horizontal bar chart.
   */
  addHorizontalBarChart(
    title: string,
    data: Iterable<HorizontalBarChartDataValue>,
    showTitle?: boolean | null,
    xAxisTitle?: string | null,
    yAxisTitle?: string | null,
    colorSet?: ChartColorSet | null,
    configure?: ((horizontalBarChart: HorizontalBarChart) => unknown) | null,
  ): this;

  /**
   * Add a stacked horizontal bar chart.
   */
  addStackedHorizontalBarChart(
    title: string,
    data: Iterable<StackedHorizontalBarChartData>,
    showTitle?: boolean | null,
    configure?:
      | ((stackedHorizontalBarChart: StackedHorizontalBarChart) => unknown)
      | null,
  ): this;

  /**
   * Add a line chart.
   */
  addLineChart(
    title: string,
    showTitle?: boolean | null,
    xAxisTitle?: string | null,
    yAxisTitle?: string | null,
    colorSet?: ChartColorSet | null,
    data?: Iterable<LineChartData> | null,
    configure?: ((lineChart: LineChart) => unknown) | null,
  ): this;

  /**
   * Add a pie chart.
   */
  addPieChart(
    title: string,
    showTitle?: boolean | null,
    data?: Iterable<DonutChartData> | null,
    configure?: ((pieChart: PieChart) => unknown) | null,
  ): this;

  /**
   * Add a vertical bar chart.
   */
  addVerticalBarChart(
    title: string,
    data: Iterable<VerticalBarChartDataValue>,
    showTitle?: boolean | null,
    xAxisTitle?: string | null,
    yAxisTitle?: string | null,
    colorSet?: ChartColorSet | null,
    configure?: ((verticalBarChart: VerticalBarChart) => unknown) | null,
  ): this;

  /**
   * Add a grouped vertical bar chart.
   */
  addGroupedVerticalBarChart(
    title: string,
    data?: Iterable<GroupedVerticalBarChartData> | null,
    showTitle?: boolean | null,
    xAxisTitle?: string | null,
    yAxisTitle?: string | null,
    colorSet?: ChartColorSet | null,
    configure?:
      ((groupedVerticalBarChart: GroupedVerticalBarChart) => unknown) | null,
  ): this;
}
