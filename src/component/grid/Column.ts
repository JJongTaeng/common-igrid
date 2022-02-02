import { IElement } from 'common-iutils';

interface ColumnInterface {
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
  connectedCallback(): void;
  updateStyleBySpan(span: SpanType): void;
  setContent(content: HTMLElement | string): this;
  setSpan(span: SpanType): this;
  setPadding(padding: number): this;
}

interface ColumnConstructorProps {
  span?: SpanType;
  children?: HTMLElement | string;
  padding: number;
}

type ColumnAttributeType = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'style'

interface SpanType {
  xxl: number;
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
}

export default class Column extends HTMLElement implements ColumnInterface {
  static get observedAttributes(): ColumnAttributeType[] {
    return ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'style']
  }

  private readonly $container: HTMLDivElement;
  private readonly $slot: HTMLSlotElement;
  private readonly $style: HTMLStyleElement;

  padding: number = 0;
  span: SpanType = {
    xxl: 0,
    xl: 0,
    lg: 0,
    md: 0,
    sm: 0,
    xs: 0,
  }



  constructor({ children, span, padding }: ColumnConstructorProps) {
    super();
    this.attachShadow({ mode: 'open' });

    this.$slot = new IElement<HTMLSlotElement>('slot')
      .setAttribute('name', 'column-slot')
      .getElement();

    this.$container = new IElement<HTMLDivElement>('div')
      .setAttribute('class', 'container')
      .appendChild(this.$slot)
      .getElement();

    this.$style = document.createElement('style');
    this.shadowRoot.append(this.$style, this.$container);

    children && this.setContent(children);
    span && this.setSpan(span);
    padding && this.setPadding(padding);
  }

  connectedCallback() {
    this.span.xxl = parseInt(this.getAttribute('xxl'))
    this.span.xl = parseInt(this.getAttribute('xl'))
    this.span.lg = parseInt(this.getAttribute('lg'))
    this.span.md = parseInt(this.getAttribute('md'))
    this.span.sm = parseInt(this.getAttribute('sm'))
    this.span.xs = parseInt(this.getAttribute('xs'))

    this.updateStyleBySpan({
      ...this.span,
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue !== newValue) {
      switch(name) {
        case 'xxl':
          this.span = {
            ...this.span,
            xxl: newValue,
          }
          break;
        case 'xl':
          this.span = {
            ...this.span,
            xl: newValue,
          }
          break;
        case 'lg':
          this.span = {
            ...this.span,
            lg: newValue,
          }
          break;
        case 'md':
          this.span = {
            ...this.span,
            md: newValue,
          }
          break;
        case 'sm':
          this.span = {
            ...this.span,
            sm: newValue,
          }
          break;
        case 'xs':
          this.span = {
            ...this.span,
            xs: newValue,
          }
          break;
        case 'padding':
          this.padding = newValue;
          break;
      }

      this.updateStyleBySpan({ ...this.span, padding: this.padding });
    }
  }

  updateStyleBySpan({ xxl, xl, lg, md, sm, xs, padding = 0 }) {
    this.$style.textContent = `
      :host {
        margin: ${padding / 2}px;
      }
      @media(max-width: 576px) {
        :host {
            width: calc(${xs * 4.166666}% - ${padding}px);
        }
      }
      @media(min-width: 576px) and (max-width: 768px) {
        :host {
            width: calc(${sm * 4.166666}% - ${padding}px);
        }
      }
      @media(min-width: 768px) and (max-width: 992px) {
        :host {
            width: calc(${md * 4.166666}% - ${padding}px);
        }
      }
      @media(min-width: 992px) and (max-width: 1${padding}0px) {
        :host {
            width: calc(${lg * 4.166666}% - ${padding}px);
        }
      }
      @media(min-width: 1200px) and (max-width: 1600px) {
        :host {
            width: calc(${xl * 4.166666}% - ${padding}px);
        }
      }
      @media(min-width: 1600px) {
        :host {
            width: calc(${xxl * 4.166666}% - ${padding}px);
        }
      }
    `
  }

  setSpan(span: SpanType) {
    this.setAttribute('xxl', span.xxl.toString());
    this.setAttribute('xl', span.toString());
    this.setAttribute('lg', span.toString());
    this.setAttribute('md', span.toString());
    this.setAttribute('sm', span.toString());
    this.setAttribute('xs', span.toString());

    return this;
  }

  setContent(content: HTMLElement | string) {
    this.$slot.replaceChildren();
    new IElement<HTMLDivElement>('div')
      .setAttribute('slot', 'column-slot')
      .append(content)
      .setParent(this.$slot)
      .getElement();

    return this;
  }

  setPadding(padding: number) {
    this.setAttribute('padding', this.padding.toString());
    return this;
  }
}

customElements.define('inte-column', Column);