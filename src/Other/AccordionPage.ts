import { AbstractAction } from '../Action/AbstractAction.ts';
import { DonutChart } from '../Chart/Donut/DonutChart.ts';
import { DonutChartData } from '../Chart/Donut/DonutChartData.ts';
import { GaugeChart } from '../Chart/Gauge/GaugeChart.ts';
import { GaugeChartLegend } from '../Chart/Gauge/GaugeChartLegend.ts';
import { HorizontalBarChart } from '../Chart/HorizontalBar/HorizontalBarChart.ts';
import { HorizontalBarChartDataValue } from '../Chart/HorizontalBar/HorizontalBarChartDataValue.ts';
import { StackedHorizontalBarChart } from '../Chart/HorizontalBar/StackedHorizontalBarChart.ts';
import { StackedHorizontalBarChartData } from '../Chart/HorizontalBar/StackedHorizontalBarChartData.ts';
import { LineChart } from '../Chart/Line/LineChart.ts';
import { LineChartData } from '../Chart/Line/LineChartData.ts';
import { PieChart } from '../Chart/Pie/PieChart.ts';
import { GroupedVerticalBarChart } from '../Chart/VerticalBar/GroupedVerticalBarChart.ts';
import { GroupedVerticalBarChartData } from '../Chart/VerticalBar/GroupedVerticalBarChartData.ts';
import { VerticalBarChart } from '../Chart/VerticalBar/VerticalBarChart.ts';
import { VerticalBarChartDataValue } from '../Chart/VerticalBar/VerticalBarChartDataValue.ts';
import { AbstractBlockElement } from '../Element/AbstractBlockElement.ts';
import { AbstractElement } from '../Element/AbstractElement.ts';
import { Accordion } from '../Element/Accordion.ts';
import { ActionSet } from '../Element/ActionSet.ts';
import { Badge } from '../Element/Badge.ts';
import { Carousel } from '../Element/Carousel/Carousel.ts';
import { CodeBlock } from '../Element/CodeBlock.ts';
import { ColumnSet } from '../Element/Column/ColumnSet.ts';
import { CompoundButton } from '../Element/CompoundButton.ts';
import { Container } from '../Element/Container.ts';
import { Fact } from '../Element/Fact/Fact.ts';
import { FactSet } from '../Element/Fact/FactSet.ts';
import { Icon } from '../Element/Icon.ts';
import { Image } from '../Element/Image/Image.ts';
import { ImageSet } from '../Element/Image/ImageSet.ts';
import { Media } from '../Element/Media/Media.ts';
import { ProgressBar } from '../Element/Progress/ProgressBar.ts';
import { ProgressRing } from '../Element/Progress/ProgressRing.ts';
import { Rating } from '../Element/Rating.ts';
import { RichTextBlock } from '../Element/RichTextBlock/RichTextBlock.ts';
import { Table } from '../Element/Table/Table.ts';
import { TabSet } from '../Element/TabSet.ts';
import { TextBlock } from '../Element/TextBlock.ts';
import { ChartColorSet } from '../Enum/ChartColorSet.ts';
import { CodeBlockLanguage } from '../Enum/CodeBlockLanguage.ts';
import { ContainerStyle } from '../Enum/ContainerStyle.ts';
import { ExpandIconPosition } from '../Enum/ExpandIconPosition.ts';
import { HeaderSize } from '../Enum/HeaderSize.ts';
import { Height } from '../Enum/Height.ts';
import { HorizontalAlignment } from '../Enum/HorizontalAlignment.ts';
import { Spacing } from '../Enum/Spacing.ts';
import { VerticalAlignment } from '../Enum/VerticalAlignment.ts';
import { ChoiceSetInput } from '../Input/ChoiceSet/ChoiceSetInput.ts';
import { DateInput } from '../Input/DateInput.ts';
import { NumberInput } from '../Input/NumberInput.ts';
import { RatingInput } from '../Input/RatingInput.ts';
import { TextInput } from '../Input/TextInput.ts';
import { TimeInput } from '../Input/TimeInput.ts';
import { ToggleInput } from '../Input/ToggleInput.ts';
import { AbstractLayout } from '../Layout/AbstractLayout.ts';
import { AreaGridLayout } from '../Layout/AreaGridLayout.ts';
import { FlowLayout } from '../Layout/FlowLayout.ts';
import { StackLayout } from '../Layout/StackLayout.ts';
import { BackgroundImage } from '../Shared/BackgroundImage.ts';
import { HasHeight } from '../Support/HasHeight.ts';
import { HasHorizontalAlignment } from '../Support/HasHorizontalAlignment.ts';
import { HasItems } from '../Support/HasItems.ts';
import { HasLayouts } from '../Support/HasLayouts.ts';
import { HasSeparator } from '../Support/HasSeparator.ts';
import { HasSpacing } from '../Support/HasSpacing.ts';

/**
 * A single page within an accordion.
 */
export class AccordionPage extends AbstractElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasItems = new HasItems(this);
  private readonly hasLayouts = new HasLayouts(this);
  private readonly hasSeparator = new HasSeparator(this);
  private readonly hasSpacing = new HasSpacing(this);

  constructor(headerTitle: string | null = null) {
    super();
    if (headerTitle !== null) {
      this.headerTitle(headerTitle);
    }
  }

  public static make(headerTitle: string | null = null): AccordionPage {
    return new AccordionPage(headerTitle);
  }

  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.hasHorizontalAlignment.horizontalAlignment(alignment);
  }

  public separator(separator = true): this {
    return this.hasSeparator.separator(separator);
  }

  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
  }

  public addLayouts(layout: AbstractLayout | Iterable<AbstractLayout>): this {
    return this.hasLayouts.addLayouts(layout);
  }

  public layouts(layouts: Iterable<AbstractLayout>): this {
    return this.hasLayouts.layouts(layouts);
  }

  public addStackLayout(callback: ((layout: StackLayout) => void) | null = null): this {
    return this.hasLayouts.addStackLayout(callback);
  }

  public addFlowLayout(callback: ((layout: FlowLayout) => void) | null = null): this {
    return this.hasLayouts.addFlowLayout(callback);
  }

  public addAreaGridLayout(
    callback: ((layout: AreaGridLayout) => void) | null = null,
  ): this {
    return this.hasLayouts.addAreaGridLayout(callback);
  }

  public addItems(element: AbstractBlockElement | Iterable<AbstractBlockElement>): this {
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

  public addImage(url: string, configure: ((image: Image) => unknown) | null = null): this {
    return this.hasItems.addImage(url, configure);
  }

  public addRichTextBlock(
    configure: ((richTextBlock: RichTextBlock) => unknown) | null = null,
  ): this {
    return this.hasItems.addRichTextBlock(configure);
  }

  public addContainer(configure: ((container: Container) => unknown) | null = null): this {
    return this.hasItems.addContainer(configure);
  }

  public addColumnSet(configure: ((columnSet: ColumnSet) => unknown) | null = null): this {
    return this.hasItems.addColumnSet(configure);
  }

  public addFactSet(
    facts: Iterable<Fact> = [],
    configure: ((factSet: FactSet) => unknown) | null = null,
  ): this {
    return this.hasItems.addFactSet(facts, configure);
  }

  public addImageSet(configure: ((imageSet: ImageSet) => unknown) | null = null): this {
    return this.hasItems.addImageSet(configure);
  }

  public addMedia(configure: ((media: Media) => unknown) | null = null): this {
    return this.hasItems.addMedia(configure);
  }

  public addTable(configure: ((table: Table) => unknown) | null = null): this {
    return this.hasItems.addTable(configure);
  }

  public addActionSet(configure: ((actionSet: ActionSet) => unknown) | null = null): this {
    return this.hasItems.addActionSet(configure);
  }

  public addBadge(
    text: string | null = null,
    configure: ((badge: Badge) => unknown) | null = null,
  ): this {
    return this.hasItems.addBadge(text, configure);
  }

  public addCarousel(configure: ((carousel: Carousel) => unknown) | null = null): this {
    return this.hasItems.addCarousel(configure);
  }

  public addAccordion(configure: ((accordion: Accordion) => unknown) | null = null): this {
    return this.hasItems.addAccordion(configure);
  }

  public addTabSet(configure: ((tabSet: TabSet) => unknown) | null = null): this {
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

  public addIcon(name: string, configure: ((icon: Icon) => unknown) | null = null): this {
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
    return this.hasItems.addGaugeChart(title, showTitle, value, segments, configure);
  }

  public addHorizontalBarChart(
    title: string,
    data: Iterable<HorizontalBarChartDataValue>,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
    configure: ((horizontalBarChart: HorizontalBarChart) => unknown) | null = null,
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
   * Controls the position of the expand/collapse icon.
   * Valid values: "Start", "Inline", "End".
   */
  public expandIconPosition(position: ExpandIconPosition): this {
    return this.set('expandIconPosition', position);
  }

  /**
   * The name of the icon to display in the header.
   */
  public headerIconName(name: string): this {
    return this.set('headerIconName', name);
  }

  /**
   * Controls the size of the header.
   * Valid values: "Small", "Medium", "Large", "XLarge".
   */
  public headerSize(size: HeaderSize): this {
    return this.set('headerSize', size);
  }

  /**
   * The header text of the accordion page.
   */
  public headerTitle(title: string): this {
    return this.set('headerTitle', title);
  }

  /**
   * Controls whether the header text is wrapped.
   */
  public headerWrap(wrap = true): this {
    return this.set('headerWrap', wrap);
  }

  /**
   * Controls whether the page is expanded.
   */
  public isExpanded(expanded = true): this {
    return this.set('isExpanded', expanded);
  }

  /**
   * The style of the container. Container styles control the colors of the background,
   * border and text inside the container, in such a way that contrast requirements are always met.
   * Valid values: "default", "emphasis", "accent", "good", "attention", "warning".
   */
  public style(style: ContainerStyle): this {
    return this.set('style', style);
  }

  /**
   * Controls how the container's content should be vertically aligned.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalContentAlignment(alignment: VerticalAlignment): this {
    return this.set('verticalContentAlignment', alignment);
  }

  /**
   * Controls if the container should bleed into its parent. A bleeding container extends into its parent's padding.
   */
  public bleed(bleed = true): this {
    return this.set('bleed', bleed);
  }

  /**
   * The minimum height, in pixels, of the container, in the `<number>px` format.
   * Valid values: "<number>px".
   */
  public minHeight(minHeight: string): this {
    return this.set('minHeight', minHeight);
  }

  /**
   * The maximum height, in pixels, of the container, in the `<number>px` format. When the content of a container
   * exceeds the container's maximum height, a vertical scrollbar is displayed.
   * Valid values: "<number>px".
   */
  public maxHeight(maxHeight: string): this {
    return this.set('maxHeight', maxHeight);
  }

  /**
   * Controls if the container should have rounded corners.
   */
  public roundedCorners(roundedCorners = true): this {
    return this.set('roundedCorners', roundedCorners);
  }

  /**
   * Controls if a border should be displayed around the container.
   */
  public showBorder(showBorder = true): this {
    return this.set('showBorder', showBorder);
  }

  /**
   * Controls if the content of the card is to be rendered left-to-right or right-to-left.
   */
  public rtl(rtl = true): this {
    return this.set('rtl', rtl);
  }

  /**
   * Defines the container's background image.
   * Valid values: "BackgroundImage".
   */
  public backgroundImage(backgroundImage: BackgroundImage): this {
    return this.set('backgroundImage', backgroundImage);
  }

  /**
   * An Action that will be invoked when the element is tapped or clicked.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set('selectAction', action);
  }

  public getType(): string {
    return 'AccordionPage';
  }
}
