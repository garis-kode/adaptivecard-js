import { CodeBlockLanguage } from "../Enum/CodeBlockLanguage.js";
import { Height } from "../Enum/Height.js";
import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import { Spacing } from "../Enum/Spacing.js";
import { HasHeight } from "../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../Support/HasSpacing.js";
import { AbstractBlockElement } from "./AbstractBlockElement.js";

/**
 * A formatted and syntax-colored code block.
 */
export class CodeBlock extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  public static make(): CodeBlock {
    return new CodeBlock();
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
   * Controls the amount of space between this element and the preceding one.
   * Valid values: "none", "extraSmall", "small", "default", "medium", "large", "extraLarge", "padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
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
