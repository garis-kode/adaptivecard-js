import { CodeBlockLanguage } from "../Enum/CodeBlockLanguage.js";
import { Height } from "../Enum/Height.js";
import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import { Spacing } from "../Enum/Spacing.js";
import type { HasHeight } from "../Support/HasHeight.js";
import type { HasHorizontalAlignment } from "../Support/HasHorizontalAlignment.js";
import type { HasSpacing } from "../Support/HasSpacing.js";
import { AbstractBlockElement } from "./AbstractBlockElement.js";

/**
 * A formatted and syntax-colored code block.
 */
export class CodeBlock
  extends AbstractBlockElement
  implements HasHeight, HasHorizontalAlignment, HasSpacing
{
  public static make(): CodeBlock {
    return new CodeBlock();
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
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.set("horizontalAlignment", alignment);
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
   * The code snippet to display.
   */
  public codeSnippet(codeSnippet: string): this {
    return this.set("codeSnippet", codeSnippet);
  }

  /**
   * The language the code snippet is expressed in.
   * Valid values: "Bash", "C", "Cpp", "CSharp", "Css", "Dos", "Go", "Graphql",
   * "Html", "Java", "JavaScript", "Json", "ObjectiveC", "Perl", "Php", "PlainText",
   * "PowerShell", "Python", "Sql", "TypeScript", "VbNet", "Verilog", "Vhdl", "Xml".
   */
  public language(language: CodeBlockLanguage): this {
    return this.set("language", language);
  }

  /**
   * A number that represents the line in the file from where the code snippet was extracted.
   */
  public startLineNumber(startLineNumber: number): this {
    return this.set("startLineNumber", startLineNumber);
  }

  public getType(): string {
    return "CodeBlock";
  }
}
