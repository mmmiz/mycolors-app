export const isBackgroundColorDark = (backgroundColor) => {
  const threshold = 128;

  // Check if the backgroundColor is a named color
  const namedColor = document.createElement('div');
  namedColor.style.color = backgroundColor;
  document.body.appendChild(namedColor);
  const computedColor = window.getComputedStyle(namedColor).color;
  document.body.removeChild(namedColor);

  // Extract RGB values from the computedColor
  const rgb = computedColor.match(/\d+/g);

  if (rgb) {
    // Calculate brightness using RGB values
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    return brightness < threshold;
  }

  // If RGB values are not available, default to considering it as a dark color
  return true;
};
