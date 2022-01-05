// Copyright 2022 manufosela.
// SPDX-License-Identifier: MIT

import { css } from 'lit';

export const animationHandclockStyles = css`
  :host {
    display: inline-block;
    margin:0;
    padding: 0;
    color: var(--animation-handclock-text-color, #000);
    background-color: var(--animation-handclock-background-color, #fff);
  }

  .hour_marker {
    fill: transparent;
    stroke: var(--animation-handclock-hour-marker-color,#f0f0c9);
    stroke-width: 7;
    stroke-dasharray: 0.2, 4.8;
    stroke-dashoffset: 0.1;
  }

  .minute_marker {
    fill: transparent;
    stroke: var(--animation-handclock-minute-marker-color, #0f0e0e);
    stroke-width: 7;
    stroke-dasharray: 0.2, 0.8;
    stroke-dashoffset: 0.1;
  }

  .hand {
    stroke: var(--animation-handclock-hands-color, #ff0000);
    stroke-width: 2;
    stroke-linecap: round;
  }

  .hand--thick {
    stroke-width: 7;
  }

  .hand--second {
    stroke: yellow;
  }

`;
