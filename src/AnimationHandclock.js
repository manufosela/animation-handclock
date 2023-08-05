import { html, LitElement } from 'lit';
import { animationHandclockStyles } from './animation-handclock-style.js';

export class AnimationHandclock extends LitElement {
  static get styles() {
    return [animationHandclockStyles];
  }

  static get properties() {
    return {
      thedate: { type: Date },
      size: { type: Number },
      utc: { type: Number },
      text: { type: String },
      ampm: { type: String },
    };
  }

  constructor() {
    super();
    this.date = null;
    this.size = 800;
    this.utc = 0;
    this.text = 'Hora Local';
    this.ampm = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.horaActualLocal = new Date();
    this.date = new Date(
      this.horaActualLocal.getTime() + this.utc * 60 * 60 * 1000,
    );
  }

  firstUpdated() {
    this.shadowRoot.host.style.width = `${this.size}px`;
    this.shadowRoot.host.style.height = `${this.size}px`;
    this.shadowRoot.host.style.borderRadius = '50%';

    this.hoursElement = this.shadowRoot.querySelector('#hour_hand');
    this.minutesElement = this.shadowRoot.querySelector('#minute_hand');
    this.secondsElement = this.shadowRoot.querySelector('#second_hand');

    requestAnimationFrame(this._animate.bind(this));
  }

  _animate() {
    this.horaActualLocal = new Date();
    this.date = new Date(
      this.horaActualLocal.getTime() + this.utc * 60 * 60 * 1000,
    );

    this.ampm = this.date.getHours() >= 12 ? 'PM' : 'AM';
    this.hour = this.date.getHours() % 12;
    this.minute = this.date.getMinutes();
    this.second = this.date.getSeconds();

    this.hoursElement.setAttribute(
      'transform',
      `rotate(${(360 / 12) * this.hour})`,
    );
    this.minutesElement.setAttribute(
      'transform',
      `rotate(${(360 / 60) * this.minute})`,
    );
    this.secondsElement.setAttribute(
      'transform',
      `rotate(${(360 / 60) * this.second})`,
    );

    requestAnimationFrame(this._animate.bind(this));
  }

  render() {
    return html`
      <h3 class="ampm">${this.ampm}</h3>
      <svg
        width="${this.size}"
        height="${this.size}"
        viewBox="-100 -100 200 200"
      >
        <circle class="minute_marker" r="90" pathLength="60" />
        <circle class="hour_marker" r="90" pathLength="60" />

        <g id="hour_hand">
          <line class="hand" x1="0" y1="0" x2="0" y2="-50" />
          <line class="hand hand--thick" x1="0" y1="-12" x2="0" y2="-50" />
        </g>

        <g id="minute_hand">
          <line class="hand" x1="0" y1="0" x2="0" y2="-80" />
          <line class="hand hand--thick" x1="0" y1="-12" x2="0" y2="-80" />
        </g>

        <g id="second_hand">
          <line class="hand hand--second" x1="0" y1="12" x2="0" y2="-80" />
        </g>
      </svg>
      <h4 class="title">${this.text}</h4>
    `;
  }
}
