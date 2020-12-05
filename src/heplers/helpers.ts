export const randomNumberInterval = (from: number, to: number): number => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

export const getGradientColor = (
  start_color: string,
  end_color: string,
  percent: number
): string => {
  // strip the leading # if it's there
  start_color = start_color.replace(/^\s*#|\s*$/g, "");
  end_color = end_color.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (Number(start_color.length) === 3) {
    start_color = start_color.replace(/(.)/g, "$1$1");
  }

  if (Number(end_color.length) === 3) {
    end_color = end_color.replace(/(.)/g, "$1$1");
  }

  // get colors
  const start_red = parseInt(start_color.substr(0, 2), 16),
    start_green = parseInt(start_color.substr(2, 2), 16),
    start_blue = parseInt(start_color.substr(4, 2), 16);

  const end_red = parseInt(end_color.substr(0, 2), 16),
    end_green = parseInt(end_color.substr(2, 2), 16),
    end_blue = parseInt(end_color.substr(4, 2), 16);

  // calculate new color
  const diff_r = end_red - start_red;
  const diff_g = end_green - start_green;
  const diff_b = end_blue - start_blue;

  let diff_red = (diff_r * percent + start_red).toString(16).split(".")[0];
  let diff_green = (diff_g * percent + start_green).toString(16).split(".")[0];
  let diff_blue = (diff_b * percent + start_blue).toString(16).split(".")[0];

  // ensure 2 digits by color
  if (Number(diff_red.length) === 1) diff_red = "0" + diff_red;
  if (Number(diff_green.length) === 1) diff_green = "0" + diff_green;
  if (Number(diff_blue.length) === 1) diff_blue = "0" + diff_blue;

  return "#" + diff_red + diff_green + diff_blue;
};
