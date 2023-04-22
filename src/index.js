/**
 *
 */
import { make } from './utils/dom';
import { IconQuote } from '@codexteam/icons';
import './index.css';
/**
 *
 */
export default class Quoted {
  /**
   *
   */
  static get toolbox() {
    return {
      icon: IconQuote,
      title: 'Quote',
    };
  }

  /**
   *
   */
  static get QUOTED_TYPES() {
    return [
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'danger',
      'light',
      'dark',
    ];
  }

  /**
   *
   */
  static get DEFAULT_TYPE() {
    return 'info';
  }

  /**
   * Allow to press Enter inside the Alert block
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   *
   * @param {*} param0
   */
  constructor({ data, api, config, block, readOnly }) {
    this.api = api;
    this.config = config;
    this.block = block;

    this.readOnly = readOnly;

    this.defaultType = config.defaultType || Quoted.DEFAULT_TYPE;

    this.CSS = {
      block: this.api.styles.block,
      wrapper: 'ce-quoted',
      cdxWrapper: `cdx-quoted`,
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive,
      wrapperForType: (type) => `cdx-quoted-${type}`,
    };

    this.nodes = {
      inner: null,
    };

    this.config.placeholder = config.placeholder || '引述文字';

    this._data = {
      type: Quoted.QUOTED_TYPES.includes(data.type) ? data.type : this.defaultType,
      text: data.text || '',
    };
  }

  /**
   *
   * @returns
   */
  render() {
    const div = make('div', ['quoted-wrapper', this.CSS.wrapperForType(this._data.type)]),
        inner = make('div', ['quoted-inner', this.CSS.wrapper]);

    inner.contentEditable = this.readOnly ? 'false' : 'true';

    inner.setAttribute('data-placeholder', this.config.placeholder);

    inner.textContent = this._data.text || '';

    this.nodes.container = div;
    this.nodes.inner = inner;

    div.appendChild(inner);

    return div;
  }

  /**
   *
   */
  renderSettings() {
    const settingsContainer = make('div');

    Quoted.QUOTED_TYPES.forEach((type) => {
      const settingsButton = make(
        'div',
        [
          this.CSS.settingsButton,
          this.CSS.cdxWrapper,
          this.CSS.wrapperForType(type),
        ],
        {
          innerHTML: 'A',
        }
      );

      if (this._data.type === type) {
        // Highlight current type button
        settingsButton.classList.add(this.CSS.settingsButtonActive);
      }

      // Set up click handler
      settingsButton.addEventListener('click', () => {
        this._changeAlertType(type);

        // Un-highlight previous type button
        settingsContainer
          .querySelectorAll(`.${this.CSS.settingsButton}`)
          .forEach((button) =>
            button.classList.remove(this.CSS.settingsButtonActive)
          );

        // and highlight the clicked type button
        settingsButton.classList.add(this.CSS.settingsButtonActive);
      });

      settingsContainer.appendChild(settingsButton);
    });

    return settingsContainer;
  }

  /**
   *
   * @param {*} tool
   */
  save(tool) {
    return {
      text: tool.querySelector('.quoted-inner').textContent,
      type: this._data.type,
    };
  }

  /**
   * Returns true to notify core that read-only is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   *
   */
  get data() {
    this._data.text = this.nodes.inner.textContent;

    return this._data;
  }

  /**
   * @param data
   */
  set data(data) {
    if (data.text !== undefined) {
      this.nodes.inner.textContent = this._data.text || '';
    }
  }

  /**
   *
   * @param {*} event
   */
  onPaste(event) {
    console.log(event);
    this._data = {
      text: event.detail.data.textContent,
    };
  }

  /**
   *
   * @param {*} newType
   */
  _changeAlertType(newType) {
    // Save new type
    this._data.type = newType;

    Quoted.QUOTED_TYPES.forEach((type) => {
      const alertClass = this.CSS.wrapperForType(type);

      // Remove the old Alert type class
      this.nodes.container.classList.remove(alertClass);

      if (newType === type) {
        // Add an Alert class for the selected Alert type
        this.nodes.container.classList.add(alertClass);
      }
    });
  }

  /**
   * Sanitizer config for Alert Tool saved data
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      type: false,
      text: true,
    };
  }
}