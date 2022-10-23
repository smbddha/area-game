export const colors = {
  background: "#292929",
  white: "#ededed",
};

export const shapeColors = {
  blue: "#3724db",
  yellow: "#C8DB24",
  opal: "#C6D8D3",
  ruby: "#D81E5B",
  fireOpal: "#EB5E55",
  metallicSeaweed: "#00798C",
};

export function randomColor(): string {
  return Object.values(shapeColors)[
    Math.floor(Math.random() * Object.keys(shapeColors).length)
  ];
}
