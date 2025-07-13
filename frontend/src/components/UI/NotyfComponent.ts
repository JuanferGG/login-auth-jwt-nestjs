import { Notyf } from "notyf";

export const NotyfComponent = new Notyf({
  duration: 3000,
  position: {
    x: "left",
    y: "bottom",
  },
  dismissible: true,
  types: [
    {
      type: "warning",
      background: "#dfb409", //? Color amarillo
    },
  ],
});
