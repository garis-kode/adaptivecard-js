import { ContainerStyle } from '../../Enum/ContainerStyle.ts';
import { Height } from '../../Enum/Height.ts';
import { HorizontalAlignment } from '../../Enum/HorizontalAlignment.ts';
import { Spacing } from '../../Enum/Spacing.ts';
import { VerticalAlignment } from '../../Enum/VerticalAlignment.ts';
import { HasHeight } from '../../Support/HasHeight.ts';
import { HasHorizontalAlignment } from '../../Support/HasHorizontalAlignment.ts';
import { HasSeparator } from '../../Support/HasSeparator.ts';
import { HasSpacing } from '../../Support/HasSpacing.ts';
import { AbstractElement } from '../AbstractElement.ts';
import { TextBlock } from '../TextBlock.ts';
import { TableCell } from './TableCell.ts';

/**
 * Represents a row of cells in a table.
 */
export class TableRow extends AbstractElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSeparator = new HasSeparator(this);
  private readonly hasSpacing = new HasSpacing(this);

  public static make(): TableRow {
    return new TableRow();
  }

  /**
   * Controls how the element should be vertically sized.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  /**
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.hasHorizontalAlignment.horizontalAlignment(alignment);
  }

  /**
   * Controls if a separator line should be displayed above the element to visually separate it from the previous element.
   */
  public separator(separator = true): this {
    return this.hasSeparator.separator(separator);
  }

  /**
   * Controls the amount of space between this element and the preceding one.
   * Valid values: "none", "extraSmall", "small", "default", "medium", "large", "extraLarge", "padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
  }

  /**
   * Add cells to the row.
   */
  public addCells(cell: TableCell | Iterable<TableCell>): this {
    if (!(cell instanceof TableCell) && Symbol.iterator in Object(cell)) {
      for (const item of cell) {
        this.push('cells', item);
      }

      return this;
    }

    return this.push('cells', cell);
  }

  /**
   * The cells in the row.
   * Valid values: "TableCell".
   */
  public cells(cells: Iterable<TableCell>): this {
    return this.addCells(cells);
  }

  /**
   * Convenience: add a cell containing a single TextBlock.
   */
  public addTextCell(
    text: string,
    configure: ((textBlock: TextBlock) => unknown) | null = null,
  ): this {
    const cell = new TableCell();
    cell.addTextBlock(text, configure);

    return this.addCells(cell);
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
   * Controls if the container should have rounded corners.
   */
  public roundedCorners(value = true): this {
    return this.set('roundedCorners', value);
  }

  /**
   * Controls if a border should be displayed around the container.
   */
  public showBorder(value = true): this {
    return this.set('showBorder', value);
  }

  /**
   * Controls how the content of every cell in the row should be horizontally aligned by default.
   * This property overrides the `horizontalCellContentAlignment` property of the table and columns.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalCellContentAlignment(alignment: HorizontalAlignment): this {
    return this.set('horizontalCellContentAlignment', alignment);
  }

  /**
   * Controls how the content of every cell in the row should be vertically aligned by default.
   * This property overrides the `verticalCellContentAlignment` property of the table and columns.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalCellContentAlignment(alignment: VerticalAlignment): this {
    return this.set('verticalCellContentAlignment', alignment);
  }

  public getType(): string {
    return 'TableRow';
  }
}
