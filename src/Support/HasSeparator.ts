export interface HasSeparator {
  /**
   * Controls whether a separator line should be displayed above the element
   * to visually separate it from the previous element. No separator will be
   * displayed for the first element in a container, even if this property is
   * set to true.
   */
  separator(separator?: boolean): this;
}
