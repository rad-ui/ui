const data = {
    name: "Root",
    description: "The root Slider component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled value." }, type: "number | number[]", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial value (uncontrolled)." }, type: "number | number[]", default: "--" },
        { prop: { name: "min", info_tooltips: "Minimum value." }, type: "number", default: "0" },
        { prop: { name: "max", info_tooltips: "Maximum value." }, type: "number", default: "100" },
        { prop: { name: "step", info_tooltips: "Step increment." }, type: "number", default: "1" },
        { prop: { name: "pageStepMultiplier", info_tooltips: "Multiplier used for PageUp and PageDown keyboard increments." }, type: "number", default: "10" },
        { prop: { name: "thumbAlignment", info_tooltips: "center lets a thumb's centre reach the track ends; edge keeps the whole thumb inside the track (fill, marks and pointer follow)." }, type: "'center' | 'edge'", default: "'center'" },
        { prop: { name: "minStepsBetweenValues", info_tooltips: "In a range slider, the smallest number of steps kept between neighbouring thumbs." }, type: "number", default: "0" },
        { prop: { name: "orientation", info_tooltips: "Slider orientation." }, type: "enum", enum_values: ["horizontal", "vertical"], default: "horizontal" },
        { prop: { name: "disabled", info_tooltips: "Disables the slider." }, type: "boolean", default: "false" },
        { prop: { name: "showStepMarks", info_tooltips: "Shows tick marks at each step." }, type: "boolean", default: "false" },
        { prop: { name: "formatValue", info_tooltips: "Custom formatter for displayed value." }, type: "function", default: "--" },
        { prop: { name: "onValueChange", info_tooltips: "Callback during drag." }, type: "function", default: "--" },
        { prop: { name: "onValueCommit", info_tooltips: "Callback with the final value when a pointer drag ends or after each keyboard change." }, type: "function", default: "--" },
    {
      prop: {
        name: "thumbCollisionBehavior",
        info_tooltips: "When a thumb meets another: none stops, push moves it along, swap passes it."
      },
      type: "\"none\" | \"push\" | \"swap\"",
      default: "\"none\"",
    },
    {
      prop: {
        name: "format",
        info_tooltips: "Number format for the value text."
      },
      type: "Intl.NumberFormatOptions",
      default: "--",
    },
    {
      prop: {
        name: "locale",
        info_tooltips: "Locale for format."
      },
      type: "Intl.LocalesArgument",
      default: "--",
    },
    {
      prop: {
        name: "largeStep",
        info_tooltips: "Step for Page Up / Page Down."
      },
      type: "number",
      default: "step \u00d7 10",
    },
    {
      prop: {
        name: "form",
        info_tooltips: "id of a form elsewhere in the page."
      },
      type: "string",
      default: "--",
    }
  ]
}

export default data
