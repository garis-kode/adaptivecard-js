import { AbstractAction } from "../Action/AbstractAction.js";
import { DonutChart } from "../Chart/Donut/DonutChart.js";
import { DonutChartData } from "../Chart/Donut/DonutChartData.js";
import { GaugeChart } from "../Chart/Gauge/GaugeChart.js";
import { GaugeChartLegend } from "../Chart/Gauge/GaugeChartLegend.js";
import { HorizontalBarChart } from "../Chart/HorizontalBar/HorizontalBarChart.js";
import { HorizontalBarChartDataValue } from "../Chart/HorizontalBar/HorizontalBarChartDataValue.js";
import { StackedHorizontalBarChart } from "../Chart/HorizontalBar/StackedHorizontalBarChart.js";
import { StackedHorizontalBarChartData } from "../Chart/HorizontalBar/StackedHorizontalBarChartData.js";
import { LineChart } from "../Chart/Line/LineChart.js";
import { LineChartData } from "../Chart/Line/LineChartData.js";
import { PieChart } from "../Chart/Pie/PieChart.js";
import { GroupedVerticalBarChart } from "../Chart/VerticalBar/GroupedVerticalBarChart.js";
import { GroupedVerticalBarChartData } from "../Chart/VerticalBar/GroupedVerticalBarChartData.js";
import { VerticalBarChart } from "../Chart/VerticalBar/VerticalBarChart.js";
import { VerticalBarChartDataValue } from "../Chart/VerticalBar/VerticalBarChartDataValue.js";
import { AbstractBlockElement } from "../Element/AbstractBlockElement.js";
import { AbstractElement } from "../Element/AbstractElement.js";
import { Accordion } from "../Element/Accordion.js";
import { ActionSet } from "../Element/ActionSet.js";
import { Badge } from "../Element/Badge.js";
import { Carousel } from "../Element/Carousel/Carousel.js";
import { CodeBlock } from "../Element/CodeBlock.js";
import { ColumnSet } from "../Element/Column/ColumnSet.js";
import { CompoundButton } from "../Element/CompoundButton.js";
import { Container } from "../Element/Container.js";
import { Fact } from "../Element/Fact/Fact.js";
import { FactSet } from "../Element/Fact/FactSet.js";
import { Icon } from "../Element/Icon.js";
import { Image } from "../Element/Image/Image.js";
import { ImageSet } from "../Element/Image/ImageSet.js";
import { Media } from "../Element/Media/Media.js";
import { ProgressBar } from "../Element/Progress/ProgressBar.js";
import { ProgressRing } from "../Element/Progress/ProgressRing.js";
import { Rating } from "../Element/Rating.js";
import { RichTextBlock } from "../Element/RichTextBlock/RichTextBlock.js";
import { Table } from "../Element/Table/Table.js";
import { TabSet } from "../Element/TabSet.js";
import { TextBlock } from "../Element/TextBlock.js";
import { ChartColorSet } from "../Enum/ChartColorSet.js";
import { CodeBlockLanguage } from "../Enum/CodeBlockLanguage.js";
import { ContainerStyle } from "../Enum/ContainerStyle.js";
import { Height } from "../Enum/Height.js";
import { TabStyle } from "../Enum/TabStyle.js";
import { VerticalAlignment } from "../Enum/VerticalAlignment.js";
import { ChoiceSetInput } from "../Input/ChoiceSet/ChoiceSetInput.js";
import { DateInput } from "../Input/DateInput.js";
import { NumberInput } from "../Input/NumberInput.js";
import { RatingInput } from "../Input/RatingInput.js";
import { TextInput } from "../Input/TextInput.js";
import { TimeInput } from "../Input/TimeInput.js";
import { ToggleInput } from "../Input/ToggleInput.js";
import { AbstractLayout } from "../Layout/AbstractLayout.js";
import { AreaGridLayout } from "../Layout/AreaGridLayout.js";
import { FlowLayout } from "../Layout/FlowLayout.js";
import { StackLayout } from "../Layout/StackLayout.js";
import { BackgroundImage } from "../Shared/BackgroundImage.js";
import { HasHeight } from "../Support/HasHeight.js";
import { HasItems } from "../Support/HasItems.js";
import { HasLayouts } from "../Support/HasLayouts.js";

/**
 * A page inside a `TabSet` element.
 */
export class TabPage extends AbstractElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasItems = new HasItems(this);
  private readonly hasLayouts = new HasLayouts(this);

  constructor(title: string | null = null) {
    super();
    if (title !== null) {
      this.title(title);
    }
  }

  public static make(title: string | null = null): TabPage {
    return new TabPage(title);
  }

  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  public addLayouts(layout: AbstractLayout | Iterable<AbstractLayout>): this {
    return this.hasLayouts.addLayouts(layout);
  }

  public layouts(layouts: Iterable<AbstractLayout>): this {
    return this.hasLayouts.layouts(layouts);
  }

  public addStackLayout(
    callback: ((layout: StackLayout) => void) | null = null,
  ): this {
    return this.hasLayouts.addStackLayout(callback);
  }

  public addFlowLayout(
    callback: ((layout: FlowLayout) => void) | null = null,
  ): this {
    return this.hasLayouts.addFlowLayout(callback);
  }

  public addAreaGridLayout(
    callback: ((layout: AreaGridLayout) => void) | null = null,
  ): this {
    return this.hasLayouts.addAreaGridLayout(callback);
  }

  public addItems(
    element: AbstractBlockElement | Iterable<AbstractBlockElement>,
  ): this {
    return this.hasItems.addItems(element);
  }

  public items(elements: Iterable<AbstractBlockElement>): this {
    return this.hasItems.items(elements);
  }

  public addTextBlock(
    text: string,
    configure: ((textBlock: TextBlock) => unknown) | null = null,
  ): this {
    return this.hasItems.addTextBlock(text, configure);
  }

  public addImage(
    url: string,
    configure: ((image: Image) => unknown) | null = null,
  ): this {
    return this.hasItems.addImage(url, configure);
  }

  public addRichTextBlock(
    configure: ((richTextBlock: RichTextBlock) => unknown) | null = null,
  ): this {
    return this.hasItems.addRichTextBlock(configure);
  }

  public addContainer(
    configure: ((container: Container) => unknown) | null = null,
  ): this {
    return this.hasItems.addContainer(configure);
  }

  public addColumnSet(
    configure: ((columnSet: ColumnSet) => unknown) | null = null,
  ): this {
    return this.hasItems.addColumnSet(configure);
  }

  public addFactSet(
    facts: Iterable<Fact> = [],
    configure: ((factSet: FactSet) => unknown) | null = null,
  ): this {
    return this.hasItems.addFactSet(facts, configure);
  }

  public addImageSet(
    configure: ((imageSet: ImageSet) => unknown) | null = null,
  ): this {
    return this.hasItems.addImageSet(configure);
  }

  public addMedia(configure: ((media: Media) => unknown) | null = null): this {
    return this.hasItems.addMedia(configure);
  }

  public addTable(configure: ((table: Table) => unknown) | null = null): this {
    return this.hasItems.addTable(configure);
  }

  public addActionSet(
    configure: ((actionSet: ActionSet) => unknown) | null = null,
  ): this {
    return this.hasItems.addActionSet(configure);
  }

  public addBadge(
    text: string | null = null,
    configure: ((badge: Badge) => unknown) | null = null,
  ): this {
    return this.hasItems.addBadge(text, configure);
  }

  public addCarousel(
    configure: ((carousel: Carousel) => unknown) | null = null,
  ): this {
    return this.hasItems.addCarousel(configure);
  }

  public addAccordion(
    configure: ((accordion: Accordion) => unknown) | null = null,
  ): this {
    return this.hasItems.addAccordion(configure);
  }

  public addTabSet(
    configure: ((tabSet: TabSet) => unknown) | null = null,
  ): this {
    return this.hasItems.addTabSet(configure);
  }

  public addCodeBlock(
    code: string,
    language: CodeBlockLanguage = CodeBlockLanguage.PlainText,
    configure: ((codeBlock: CodeBlock) => unknown) | null = null,
  ): this {
    return this.hasItems.addCodeBlock(code, language, configure);
  }

  public addCompoundButton(
    title: string | null = null,
    description: string | null = null,
    configure: ((compoundButton: CompoundButton) => unknown) | null = null,
  ): this {
    return this.hasItems.addCompoundButton(title, description, configure);
  }

  public addIcon(
    name: string,
    configure: ((icon: Icon) => unknown) | null = null,
  ): this {
    return this.hasItems.addIcon(name, configure);
  }

  public addProgressBar(
    value: number | null = null,
    max = 100,
    configure: ((progressBar: ProgressBar) => unknown) | null = null,
  ): this {
    return this.hasItems.addProgressBar(value, max, configure);
  }

  public addProgressRing(
    label: string | null = null,
    configure: ((progressRing: ProgressRing) => unknown) | null = null,
  ): this {
    return this.hasItems.addProgressRing(label, configure);
  }

  public addRating(
    value: number | null = null,
    max = 5,
    configure: ((rating: Rating) => unknown) | null = null,
  ): this {
    return this.hasItems.addRating(value, max, configure);
  }

  public addTextInput(
    id: string,
    label: string | null = null,
    placeholder: string | null = null,
    configure: ((textInput: TextInput) => unknown) | null = null,
  ): this {
    return this.hasItems.addTextInput(id, label, placeholder, configure);
  }

  public addNumberInput(
    id: string,
    label: string | null = null,
    placeholder: string | null = null,
    configure: ((numberInput: NumberInput) => unknown) | null = null,
  ): this {
    return this.hasItems.addNumberInput(id, label, placeholder, configure);
  }

  public addDateInput(
    id: string,
    label: string | null = null,
    configure: ((dateInput: DateInput) => unknown) | null = null,
  ): this {
    return this.hasItems.addDateInput(id, label, configure);
  }

  public addTimeInput(
    id: string,
    label: string | null = null,
    configure: ((timeInput: TimeInput) => unknown) | null = null,
  ): this {
    return this.hasItems.addTimeInput(id, label, configure);
  }

  public addToggleInput(
    id: string,
    title: string | null = null,
    configure: ((toggleInput: ToggleInput) => unknown) | null = null,
  ): this {
    return this.hasItems.addToggleInput(id, title, configure);
  }

  public addChoiceSetInput(
    id: string,
    configure: ((choiceSetInput: ChoiceSetInput) => unknown) | null = null,
  ): this {
    return this.hasItems.addChoiceSetInput(id, configure);
  }

  public addRatingInput(
    id: string,
    label: string | null = null,
    configure: ((ratingInput: RatingInput) => unknown) | null = null,
  ): this {
    return this.hasItems.addRatingInput(id, label, configure);
  }

  public addDonutChart(
    title: string,
    showTitle: boolean | null = null,
    data: Iterable<DonutChartData> | null = null,
    configure: ((donutChart: DonutChart) => unknown) | null = null,
  ): this {
    return this.hasItems.addDonutChart(title, showTitle, data, configure);
  }

  public addGaugeChart(
    title: string,
    showTitle: boolean | null = null,
    value: number | null = null,
    segments: Iterable<GaugeChartLegend> | null = null,
    configure: ((gaugeChart: GaugeChart) => unknown) | null = null,
  ): this {
    return this.hasItems.addGaugeChart(
      title,
      showTitle,
      value,
      segments,
      configure,
    );
  }

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
    return this.hasItems.addHorizontalBarChart(
      title,
      data,
      showTitle,
      xAxisTitle,
      yAxisTitle,
      colorSet,
      configure,
    );
  }

  public addStackedHorizontalBarChart(
    title: string,
    data: Iterable<StackedHorizontalBarChartData>,
    showTitle: boolean | null = null,
    configure:
      | ((stackedHorizontalBarChart: StackedHorizontalBarChart) => unknown)
      | null = null,
  ): this {
    return this.hasItems.addStackedHorizontalBarChart(
      title,
      data,
      showTitle,
      configure,
    );
  }

  public addLineChart(
    title: string,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
    data: Iterable<LineChartData> | null = null,
    configure: ((lineChart: LineChart) => unknown) | null = null,
  ): this {
    return this.hasItems.addLineChart(
      title,
      showTitle,
      xAxisTitle,
      yAxisTitle,
      colorSet,
      data,
      configure,
    );
  }

  public addPieChart(
    title: string,
    showTitle: boolean | null = null,
    data: Iterable<DonutChartData> | null = null,
    configure: ((pieChart: PieChart) => unknown) | null = null,
  ): this {
    return this.hasItems.addPieChart(title, showTitle, data, configure);
  }

  public addVerticalBarChart(
    title: string,
    data: Iterable<VerticalBarChartDataValue>,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
    configure: ((verticalBarChart: VerticalBarChart) => unknown) | null = null,
  ): this {
    return this.hasItems.addVerticalBarChart(
      title,
      data,
      showTitle,
      xAxisTitle,
      yAxisTitle,
      colorSet,
      configure,
    );
  }

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
    return this.hasItems.addGroupedVerticalBarChart(
      title,
      data,
      showTitle,
      xAxisTitle,
      yAxisTitle,
      colorSet,
      configure,
    );
  }

  /**
   * The name of the icon to display in the tab.
   */
  public iconName(name: string): this {
    return this.set("iconName", name);
  }

  /**
   * The style of the tab. If the style is `IconOnly`, only the icon will be displayed,
   * but the title will still be used for accessibility purposes.
   * Valid values: "IconOnly", "IconAndText".
   */
  public tabStyle(style: TabStyle): this {
    return this.set("tabStyle", style);
  }

  /**
   * The title of the tab page, as it appears on tabs.
   */
  public title(title: string): this {
    return this.set("title", title);
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
   * Controls if a border should be displayed around the container.
   */
  public showBorder(showBorder = true): this {
    return this.set("showBorder", showBorder);
  }

  /**
   * Controls if the container should have rounded corners.
   */
  public roundedCorners(roundedCorners = true): this {
    return this.set("roundedCorners", roundedCorners);
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
   * Controls how the container's content should be vertically aligned.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalContentAlignment(alignment: VerticalAlignment): this {
    return this.set("verticalContentAlignment", alignment);
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
    return "TabPage";
  }
}
