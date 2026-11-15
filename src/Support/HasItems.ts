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
import { ChoiceSetInput } from '../Input/ChoiceSet/ChoiceSetInput.ts';
import { DateInput } from '../Input/DateInput.ts';
import { NumberInput } from '../Input/NumberInput.ts';
import { RatingInput } from '../Input/RatingInput.ts';
import { TextInput } from '../Input/TextInput.ts';
import { TimeInput } from '../Input/TimeInput.ts';
import { ToggleInput } from '../Input/ToggleInput.ts';
import { Node } from '../Node.ts';

export class HasItems<T extends Node> {
  constructor(
    private readonly host: T,
    private readonly itemsKey: string = 'items',
  ) {}

  /**
   * Add one or more block elements.
   */
  public addItems(element: AbstractBlockElement | Iterable<AbstractBlockElement>): T {
    if (!(element instanceof AbstractBlockElement) && Symbol.iterator in Object(element)) {
      for (const item of element) {
        this.host.pushProperty(this.itemsKey, item);
      }

      return this.host;
    }

    return this.host.pushProperty(this.itemsKey, element);
  }

  /**
   * The items in the container.
   */
  public items(elements: Iterable<AbstractBlockElement>): T {
    return this.addItems(elements);
  }

  /**
   * Add a block of text, optionally formatted using Markdown.
   */
  public addTextBlock(
    text: string,
    configure: ((textBlock: TextBlock) => unknown) | null = null,
  ): T {
    return this.addItems(this.configure(new TextBlock(text), configure));
  }

  /**
   * Add a standalone image element.
   */
  public addImage(url: string, configure: ((image: Image) => unknown) | null = null): T {
    const image = new Image().url(url);

    return this.addItems(this.configure(image, configure));
  }

  /**
   * Add a rich text block that displays formatted text.
   */
  public addRichTextBlock(
    configure: ((richTextBlock: RichTextBlock) => unknown) | null = null,
  ): T {
    return this.addItems(this.configure(new RichTextBlock(), configure));
  }

  /**
   * Add a container for other elements.
   */
  public addContainer(configure: ((container: Container) => unknown) | null = null): T {
    return this.addItems(this.configure(new Container(), configure));
  }

  /**
   * Add a set of columns, splitting the available horizontal space so elements
   * can be organized in a row.
   */
  public addColumnSet(configure: ((columnSet: ColumnSet) => unknown) | null = null): T {
    return this.addItems(this.configure(new ColumnSet(), configure));
  }

  /**
   * Add a set of facts, displayed as a table or a vertical list when horizontal
   * space is constrained.
   */
  public addFactSet(
    facts: Iterable<Fact> = [],
    configure: ((factSet: FactSet) => unknown) | null = null,
  ): T {
    const factSet = new FactSet();
    factSet.facts(facts);

    return this.addItems(this.configure(factSet, configure));
  }

  /**
   * Add a set of images, displayed side-by-side and wrapped across multiple rows
   * as needed.
   */
  public addImageSet(configure: ((imageSet: ImageSet) => unknown) | null = null): T {
    return this.addItems(this.configure(new ImageSet(), configure));
  }

  /**
   * Add a media element, making it possible to embed videos inside a card.
   */
  public addMedia(configure: ((media: Media) => unknown) | null = null): T {
    return this.addItems(this.configure(new Media(), configure));
  }

  /**
   * Add a table to display data in a tabular way, with rows, columns and cells.
   */
  public addTable(configure: ((table: Table) => unknown) | null = null): T {
    return this.addItems(this.configure(new Table(), configure));
  }

  /**
   * Add an action set, which can be placed anywhere in the card.
   */
  public addActionSet(configure: ((actionSet: ActionSet) => unknown) | null = null): T {
    return this.addItems(this.configure(new ActionSet(), configure));
  }

  /**
   * Add a badge element to show an icon and/or text in a compact form over a
   * colored background.
   */
  public addBadge(
    text: string | null = null,
    configure: ((badge: Badge) => unknown) | null = null,
  ): T {
    return this.addItems(this.configure(new Badge(text), configure));
  }

  /**
   * Add a carousel with sliding pages.
   */
  public addCarousel(configure: ((carousel: Carousel) => unknown) | null = null): T {
    return this.addItems(this.configure(new Carousel(), configure));
  }

  /**
   * Add an accordion, allowing the end-user to toggle the display of content by
   * expanding or collapsing pages.
   */
  public addAccordion(configure: ((accordion: Accordion) => unknown) | null = null): T {
    return this.addItems(this.configure(new Accordion(), configure));
  }

  /**
   * Add a tab set, allowing the end-user to navigate through pages using a tabbed
   * interface.
   */
  public addTabSet(configure: ((tabSet: TabSet) => unknown) | null = null): T {
    return this.addItems(this.configure(new TabSet(), configure));
  }

  /**
   * Add a formatted and syntax-colored code block.
   */
  public addCodeBlock(
    code: string,
    language: CodeBlockLanguage = CodeBlockLanguage.PlainText,
    configure: ((codeBlock: CodeBlock) => unknown) | null = null,
  ): T {
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
  ): T {
    return this.addItems(
      this.configure(new CompoundButton(title, description), configure),
    );
  }

  /**
   * Add a standalone icon element. Icons can be picked from the vast Adaptive Card
   * icon catalog.
   */
  public addIcon(name: string, configure: ((icon: Icon) => unknown) | null = null): T {
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
  ): T {
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
  ): T {
    return this.addItems(this.configure(new ProgressRing(label), configure));
  }

  /**
   * Add a read-only star rating element to display the rating of something.
   */
  public addRating(
    value: number | null = null,
    max = 5,
    configure: ((rating: Rating) => unknown) | null = null,
  ): T {
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
  ): T {
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
  ): T {
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
  ): T {
    return this.addItems(this.configure(new DateInput(id, label), configure));
  }

  /**
   * Add an input to allow the user to select a time.
   */
  public addTimeInput(
    id: string,
    label: string | null = null,
    configure: ((timeInput: TimeInput) => unknown) | null = null,
  ): T {
    return this.addItems(this.configure(new TimeInput(id, label), configure));
  }

  /**
   * Add an input to allow the user to select between on/off states.
   */
  public addToggleInput(
    id: string,
    title: string | null = null,
    configure: ((toggleInput: ToggleInput) => unknown) | null = null,
  ): T {
    return this.addItems(this.configure(new ToggleInput(id, title), configure));
  }

  /**
   * Add an input to allow the user to select one or more values.
   */
  public addChoiceSetInput(
    id: string,
    configure: ((choiceSetInput: ChoiceSetInput) => unknown) | null = null,
  ): T {
    return this.addItems(this.configure(new ChoiceSetInput(id), configure));
  }

  /**
   * Add an input to allow the user to rate something using stars.
   */
  public addRatingInput(
    id: string,
    label: string | null = null,
    configure: ((ratingInput: RatingInput) => unknown) | null = null,
  ): T {
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
  ): T {
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
  ): T {
    return this.addItems(
      this.configure(new GaugeChart(title, showTitle, value, segments), configure),
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
    configure: ((horizontalBarChart: HorizontalBarChart) => unknown) | null = null,
  ): T {
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
  ): T {
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
  ): T {
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
  ): T {
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
  ): T {
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
  ): T {
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
}
