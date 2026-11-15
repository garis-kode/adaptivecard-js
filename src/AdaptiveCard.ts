import { AbstractAction } from './Action/AbstractAction.ts';
import { DonutChart } from './Chart/Donut/DonutChart.ts';
import { DonutChartData } from './Chart/Donut/DonutChartData.ts';
import { GaugeChart } from './Chart/Gauge/GaugeChart.ts';
import { GaugeChartLegend } from './Chart/Gauge/GaugeChartLegend.ts';
import { HorizontalBarChart } from './Chart/HorizontalBar/HorizontalBarChart.ts';
import { HorizontalBarChartDataValue } from './Chart/HorizontalBar/HorizontalBarChartDataValue.ts';
import { StackedHorizontalBarChart } from './Chart/HorizontalBar/StackedHorizontalBarChart.ts';
import { StackedHorizontalBarChartData } from './Chart/HorizontalBar/StackedHorizontalBarChartData.ts';
import { LineChart } from './Chart/Line/LineChart.ts';
import { LineChartData } from './Chart/Line/LineChartData.ts';
import { PieChart } from './Chart/Pie/PieChart.ts';
import { GroupedVerticalBarChart } from './Chart/VerticalBar/GroupedVerticalBarChart.ts';
import { GroupedVerticalBarChartData } from './Chart/VerticalBar/GroupedVerticalBarChartData.ts';
import { VerticalBarChart } from './Chart/VerticalBar/VerticalBarChart.ts';
import { VerticalBarChartDataValue } from './Chart/VerticalBar/VerticalBarChartDataValue.ts';
import { AbstractBlockElement } from './Element/AbstractBlockElement.ts';
import { Accordion } from './Element/Accordion.ts';
import { ActionSet } from './Element/ActionSet.ts';
import { Badge } from './Element/Badge.ts';
import { Carousel } from './Element/Carousel/Carousel.ts';
import { CodeBlock } from './Element/CodeBlock.ts';
import { ColumnSet } from './Element/Column/ColumnSet.ts';
import { CompoundButton } from './Element/CompoundButton.ts';
import { Container } from './Element/Container.ts';
import { Fact } from './Element/Fact/Fact.ts';
import { FactSet } from './Element/Fact/FactSet.ts';
import { Icon } from './Element/Icon.ts';
import { Image } from './Element/Image/Image.ts';
import { ImageSet } from './Element/Image/ImageSet.ts';
import { Media } from './Element/Media/Media.ts';
import { ProgressBar } from './Element/Progress/ProgressBar.ts';
import { ProgressRing } from './Element/Progress/ProgressRing.ts';
import { Rating } from './Element/Rating.ts';
import { RichTextBlock } from './Element/RichTextBlock/RichTextBlock.ts';
import { Table } from './Element/Table/Table.ts';
import { TabSet } from './Element/TabSet.ts';
import { TextBlock } from './Element/TextBlock.ts';
import { ChartColorSet } from './Enum/ChartColorSet.ts';
import { CodeBlockLanguage } from './Enum/CodeBlockLanguage.ts';
import { ContainerStyle } from './Enum/ContainerStyle.ts';
import { VerticalAlignment } from './Enum/VerticalAlignment.ts';
import { ChoiceSetInput } from './Input/ChoiceSet/ChoiceSetInput.ts';
import { DateInput } from './Input/DateInput.ts';
import { NumberInput } from './Input/NumberInput.ts';
import { RatingInput } from './Input/RatingInput.ts';
import { TextInput } from './Input/TextInput.ts';
import { TimeInput } from './Input/TimeInput.ts';
import { ToggleInput } from './Input/ToggleInput.ts';
import { AbstractLayout } from './Layout/AbstractLayout.ts';
import { AreaGridLayout } from './Layout/AreaGridLayout.ts';
import { FlowLayout } from './Layout/FlowLayout.ts';
import { StackLayout } from './Layout/StackLayout.ts';
import { Node } from './Node.ts';
import { HostCapabilities } from './Other/HostCapabilities.ts';
import { AdaptiveCardReference } from './Shared/AdaptiveCardReference.ts';
import { Authentication } from './Shared/Authentication.ts';
import { BackgroundImage } from './Shared/BackgroundImage.ts';
import { DocumentReference } from './Shared/DocumentReference.ts';
import { Metadata } from './Shared/Metadata.ts';
import { Refresh } from './Shared/Refresh.ts';
import { Resources } from './Shared/Resources.ts';
import { TeamsCardProperties } from './Shared/TeamsCardProperties.ts';
import { HasItems } from './Support/HasItems.ts';
import { HasKey } from './Support/HasKey.ts';
import { HasLayouts } from './Support/HasLayouts.ts';

/**
 * An Adaptive Card, containing a free-form body of card elements, and an optional set of actions.
 */
export class AdaptiveCard extends Node {
  public static readonly SCHEMA_URL =
    'https://adaptivecards.io/schemas/adaptive-card.json';
  public static readonly DEFAULT_VERSION = '1.6';

  private readonly hasItems = new HasItems(this, 'body');
  private readonly hasKey = new HasKey(this);
  private readonly hasLayouts = new HasLayouts(this);

  constructor(version: string = AdaptiveCard.DEFAULT_VERSION) {
    super();
    this.version(version);
  }

  public static make(version: string = AdaptiveCard.DEFAULT_VERSION): AdaptiveCard {
    return new AdaptiveCard(version);
  }

  public getType(): string {
    return 'AdaptiveCard';
  }

  /**
   * Key that identifies the element in the list of items.
   */
  public key(key: string): this {
    return this.hasKey.key(key);
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
   * The Adaptive Card schema version the card is authored against.
   * Valid values: "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6".
   */
  public version(version: string): this {
    return this.set('version', version);
  }

  /**
   * The body of the card, comprised of a list of elements displayed according to
   * the `layouts` property. If the `layouts` property is not specified, a
   * `Layout.Stack` is used.
   */
  public body(elements: Iterable<AbstractBlockElement>): this {
    return this.addItems(elements);
  }

  /**
   * A URL to the Adaptive Card schema the card is authored against.
   */
  public schema(schema: string): this {
    return this.set('$schema', schema);
  }

  /**
   * Add card level actions, which always appear at the bottom of the card.
   */
  public addActions(action: AbstractAction | Iterable<AbstractAction>): this {
    if (!(action instanceof AbstractAction) && Symbol.iterator in Object(action)) {
      for (const item of action) {
        this.push('actions', item);
      }

      return this;
    }

    return this.push('actions', action);
  }

  /**
   * The card level actions, which always appear at the bottom of the card.
   */
  public actions(actions: Iterable<AbstractAction>): this {
    return this.addActions(actions);
  }

  /**
   * An Action that will be invoked when the element is tapped or clicked. `Action.ShowCard` is
   * not supported.
   */
  public selectAction(action: AbstractAction): this {
    return this.set('selectAction', action);
  }

  /**
   * The text that should be displayed if the client is not able to render the card.
   */
  public fallbackText(text: string): this {
    return this.set('fallbackText', text);
  }

  /**
   * Defines the container's background image.
   * Valid values: "BackgroundImage".
   */
  public backgroundImage(backgroundImage: BackgroundImage): this {
    return this.set('backgroundImage', backgroundImage);
  }

  /**
   * The minimum height, in pixels, of the container, in the `<number>px` format.
   * Valid values: "<number>px".
   */
  public minHeight(minHeight: string): this {
    return this.set('minHeight', minHeight);
  }

  /**
   * A unique identifier for the element or action. Input elements must have an `id`,
   * otherwise they will not be validated and their values will not be sent to the Bot.
   */
  public id(id: string): this {
    return this.set('id', id);
  }

  /**
   * An alternate element to render if the type of this one is unsupported or
   * if the host application doesn't support all the capabilities specified in
   * the `requires` property.
   */
  public fallback(fallback: unknown): this {
    return this.set('fallback', fallback);
  }

  /**
   * A list of capabilities the element requires the host application to support.
   * If the host application doesn't support at least one of the listed capabilities,
   * the element is not rendered (or its fallback is rendered if provided).
   * Valid values: "HostCapabilities".
   */
  public requires(requires: HostCapabilities): this {
    return this.set('requires', requires);
  }

  /**
   * The area of a `Layout.AreaGrid` layout in which an element should be displayed.
   */
  public gridArea(gridArea: string): this {
    return this.set('grid.area', gridArea);
  }

  /**
   * Controls whether the element should be used as a sort key by elements
   * that allow sorting across a collection of elements.
   */
  public isSortKey(isSortKey = true): this {
    return this.set('isSortKey', isSortKey);
  }

  /**
   * Controls how the container's content should be vertically aligned.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalContentAlignment(alignment: VerticalAlignment): this {
    return this.set('verticalContentAlignment', alignment);
  }

  /**
   * The style of the container. Container styles control the colors of the
   * background, border and text inside the container, in such a way that
   * contrast requirements are always met.
   * Valid values: "default", "emphasis", "accent", "good", "attention", "warning".
   */
  public style(style: ContainerStyle): this {
    return this.set('style', style);
  }

  /**
   * Controls if the content of the card is to be rendered left-to-right or right-to-left.
   */
  public rtl(rtl = true): this {
    return this.set('rtl', rtl);
  }

  /**
   * The text that should be spoken for the entire card.
   */
  public speak(speak: string): this {
    return this.set('speak', speak);
  }

  /**
   * The locale associated with the element.
   */
  public lang(lang: string): this {
    return this.set('lang', lang);
  }

  /**
   * Defines how the card can be refreshed by making a request to the target Bot.
   * Valid values: "RefreshDefinition".
   */
  public refresh(refresh: Refresh): this {
    return this.set('refresh', refresh);
  }

  /**
   * Defines authentication information to enable on-behalf-of single-sign-on or just-in-time OAuth.
   * This information is used in conjunction with the `refresh` property and `Action.Execute` in general.
   * Valid values: "Authentication".
   */
  public authentication(authentication: Authentication): this {
    return this.set('authentication', authentication);
  }

  /**
   * Metadata associated with the card.
   * Valid values: "CardMetadata".
   */
  public metadata(metadata: Metadata): this {
    return this.set('metadata', metadata);
  }

  /**
   * Teams-specific metadata associated with the card. Valid values: `TeamsCardProperties`.
   */
  public msteams(msteams: TeamsCardProperties, useCamelCaseKey = false): this {
    if (useCamelCaseKey) {
      return this.set('msTeams', msteams);
    }

    return this.set('msteams', msteams);
  }

  /**
   * Resources card elements can reference.
   * Valid values: "Resources".
   */
  public resources(resources: Resources): this {
    return this.set('resources', resources);
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
        this.push('references', item);
      }

      return this;
    }

    return this.push('references', reference);
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
      $schema: base['$schema'] ?? AdaptiveCard.SCHEMA_URL,
      type: base['type'],
    };

    if (base['version'] !== undefined) {
      ordered['version'] = base['version'];
    }

    for (const [key, value] of Object.entries(base)) {
      if (!(key in ordered)) {
        ordered[key] = value;
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
