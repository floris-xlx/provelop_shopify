{%- if settings.cart_type == "drawer" -%}
  {{ 'component-cart-drawer.css' | asset_url | stylesheet_tag }}
  {{ 'component-cart.css' | asset_url | stylesheet_tag }}
  {{ 'component-totals.css' | asset_url | stylesheet_tag }}
  {{ 'component-price.css' | asset_url | stylesheet_tag }}
  {{ 'component-discounts.css' | asset_url | stylesheet_tag }}
{%- endif -%}

<style>
  header-drawer {
    justify-self: start;
    margin-left: -1.2rem;
  }

  .header__heading-link.media {
    --media-radius: 0;
    width: {{ settings.logo_width }}px;
    max-width: {{ settings.logo_width }}px;
  }
  
  .header__heading-link.media img {
    object-fit: contain;
  }

  .header__heading-link.media .header__heading-logo--secondary {
    display: none;
  }
  
  @media screen and (max-width: 749px) {
    .header__heading-link.media {
      width: {{ settings.mobile_logo_width }}px;
      max-width: {{ settings.mobile_logo_width }}px;
    }
  }

  {% if section.settings.display_search == false %}
    .header__icon--search {
      display: none;
    }
  {% endif %}

  {%- if section.settings.sticky_header_type == 'reduce-logo-size' -%}
    .scrolled-past-header .header__heading-link.media {
      width: {{ settings.logo_width | times: 0.75 }}px;
      max-width: {{ settings.logo_width | times: 0.75 }}px;
    }
    @media screen and (max-width: 749px) {
      .scrolled-past-header .header__heading-link.media {
        width: {{ settings.mobile_logo_width | times: 0.75 }}px;
        max-width: {{ settings.mobile_logo_width | times: 0.75 }}px;
      }
    }
  {%- endif -%}

  {% if section.settings.menu_type_desktop != 'drawer' %}
    @media screen and (min-width: 990px) {
      header-drawer {
        display: none;
      }
    }
  {% endif %}

  .menu-drawer-container {
    display: flex;
  }

  .list-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .list-menu--inline {
    display: inline-flex;
    flex-wrap: wrap;
  }

  summary.list-menu__item {
    padding-right: 2.7rem;
  }

  .list-menu__item {
    display: flex;
    align-items: center;
    line-height: calc(1 + 0.3 / var(--font-body-scale));
  }

  .list-menu__item--link {
    text-decoration: none;
    padding-bottom: 1rem;
    padding-top: 1rem;
    line-height: calc(1 + 0.8 / var(--font-body-scale));
  }

  @media screen and (min-width: 750px) {
    .list-menu__item--link {
      padding-bottom: 0.5rem;
      padding-top: 0.5rem;
    }
  }

  /* Sidecart styles */
  .sidecart {
    position: fixed;
    top: 0;
    right: -100%;
    width: 400px;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    transition: right 0.3s ease;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .sidecart.open {
    right: 0;
  }

  .sidecart-header {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sidecart-body {
    flex: 1;
    padding: 1rem;
  }

  .sidecart-footer {
    padding: 1rem;
    border-top: 1px solid #ddd;
  }

  .sidecart-close {
    cursor: pointer;
    font-size: 1.5rem;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
  }

  .cart-item img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  .cart-item-details {
    flex: 1;
    margin-left: 1rem;
  }

  .cart-item-title {
    font-weight: bold;
  }

  .cart-item-quantity {
    display: flex;
    align-items: center;
  }

  .cart-item-quantity button {
    background: none;
    border: 1px solid #ddd;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
  }

  .cart-item-quantity input {
    width: 2rem;
    text-align: center;
    border: 1px solid #ddd;
    margin: 0 0.5rem;
  }

  .cart-item-price {
    font-weight: bold;
    color: #e60000;
  }

  .cart-item-remove {
    cursor: pointer;
    color: #e60000;
  }

  .cart-summary {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .cart-checkout-button {
    width: 100%;
    padding: 1rem;
    background-color: #800080;
    color: white;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
</style>

{%- style -%}
  .header {
    padding-top: {{ section.settings.padding_top | times: 0.5 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.5 | round: 0 }}px;
  }

  .section-header {
    position: sticky; /* This is for fixing a Safari z-index issue. PR #2147 */
    margin-bottom: {{ section.settings.margin_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-header {
      margin-bottom: {{ section.settings.margin_bottom }}px;
    }
  }

  @media screen and (min-width: 990px) {
    .header {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}

{%- if settings.cart_type == "drawer" -%}
  <script src="{{ 'cart-drawer.js' | asset_url }}" defer="defer"></script>
{%- endif -%}

{% if settings.cart_type == 'notification' %}
  <link rel="stylesheet" href="{{ 'component-cart-notification.css' | asset_url }}" media="print" onload="this.media='all'">
  <script src="{{ 'cart-notification.js' | asset_url }}" defer="defer"></script>
{% endif %}

<svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <symbol id="icon-search" viewbox="0 0 18 19" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z" fill="currentColor"/>
  </symbol>

  <symbol id="icon-reset" class="icon icon-close"  fill="none" viewBox="0 0 18 18" stroke="currentColor">
    <circle r="8.5" cy="9" cx="9" stroke-opacity="0.2"/>
    <path d="M6.82972 6.82915L1.17193 1.17097" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"/>
    <path d="M1.22896 6.88502L6.77288 1.11523" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"/>
  </symbol>

  <symbol id="icon-close" class="icon icon-close" fill="none" viewBox="0 0 18 17">
    <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
  </symbol>
</svg>
<{% if section.settings.sticky_header_type != 'none' %}sticky-header data-sticky-type="{{ section.settings.sticky_header_type }}"{% else %}static-header{% endif %} class="header-wrapper color-{{ section.settings.color_scheme }} gradient{% if section.settings.show_line_separator %} header-wrapper--border-bottom{% endif %}{% if section.settings.sticky_header_type == 'none' %} header-wrapper--not-sticky{% endif %}">
  <header class="header header--{{ section.settings.logo_position }} header--mobile-{{ section.settings.mobile_logo_position }} page-width{% if section.settings.menu_type_desktop == 'drawer' %} drawer-menu{% endif %}{% if section.settings.menu != blank %} header--has-menu{% endif %}">
    {%- if section.settings.menu != blank -%}
      {% render 'header-drawer', section: section %}
    {%- endif -%}

    {%- if section.settings.logo_position == 'top-center' or section.settings.menu == blank -%}
      <details-modal class="header__search">
        <details>
          <summary class="header__icon header__icon--search header__icon--summary link focus-inset modal__toggle" aria-haspopup="dialog" aria-label="{{ 'general.search.search' | t }}">
            <span>
              <svg class="modal__toggle-open icon icon-search" aria-hidden="true" focusable="false">
                <use href="#icon-search">
              </svg>
              <svg class="modal__toggle-close icon icon-close" aria-hidden="true" focusable="false">
                <use href="#icon-close">
              </svg>
            </span>
          </summary>
          <div class="search-modal modal__content gradient" role="dialog" aria-modal="true" aria-label="{{ 'general.search.search' | t }}">
            <div class="modal-overlay"></div>
            <div class="search-modal__content{% if settings.inputs_shadow_vertical_offset != 0 and settings.inputs_shadow_vertical_offset < 0 %} search-modal__content-top{% else %} search-modal__content-bottom{% endif %}" tabindex="-1">
              {%- if settings.predictive_search_enabled -%}
                <predictive-search class="search-modal__form" data-loading-text="{{ 'accessibility.loading' | t }}">
              {%- else -%}
                <search-form class="search-modal__form"> 
              {%- endif -%}
                  <form action="{{ routes.search_url }}" method="get" role="search" class="search search-modal__form search-modal__form--border-light search-modal__form--polyfill search-modal__form--predictive" data-model="{{ settings.animations_type }}">
                    <div class="field">
                      <input class="search__input field__input"
                        id="Search-In-Modal-1"
                        type="search"
                        name="q"
                        value="{{ search.terms | escape }}"
                        placeholder="{{ 'general.search.search' | t }}"
                        {%- if settings.predictive_search_enabled -%}
                          role="combobox"
                          aria-expanded="false"
                          aria-owns="predictive-search-results"
                          aria-controls="predictive-search-results"
                          aria-haspopup="listbox"
                          aria-autocomplete="list"
                          autocorrect="off"
                          autocomplete="off"
                          autocapitalize="off"
                          spellcheck="false"
                        {%- endif -%}
                      >
                      <label class="field__label" for="Search-In-Modal-1">{{ 'general.search.search' | t }}</label>
                      <input type="hidden" name="options[prefix]" value="last">
                      <button type="reset" class="reset__button field__button{% if search.terms == blank %} hidden{% endif %}" aria-label="{{ 'general.search.reset' | t }}">
                        <svg class="icon icon-close" aria-hidden="true" focusable="false">
                          <use xlink:href="#icon-reset">
                        </svg>
                      </button>
                      <button class="search__button field__button" aria-label="{{ 'general.search.search' | t }}">
                        <svg class="icon icon-search" aria-hidden="true" focusable="false">
                          <use href="#icon-search">
                        </svg>
                      </button>
                    </div>

                    {%- if settings.predictive_search_enabled -%}
                      <div class="predictive-search predictive-search--header" tabindex="-1" data-predictive-search>
                        <div class="predictive-search__loading-state">
                          <svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                            <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                          </svg>
                        </div>
                      </div>

                      <span class="predictive-search-status visually-hidden" role="status" aria-hidden="true"></span>
                    {%- endif -%}
                  </form>
              {%- if settings.predictive_search_enabled -%}
                </predictive-search>
              {%- else -%}
                </search-form>
              {%- endif -%}
              <button type="button" class="modal__close-button link link--text focus-inset" aria-label="{{ 'accessibility.close' | t }}">
                <svg class="icon icon-close" aria-hidden="true" focusable="false">
                  <use href="#icon-close">
                </svg>
              </button>
            </div>
          </div>
        </details>
      </details-modal>
    {%- endif -%}

    {%- if section.settings.logo_position != 'middle-center' -%}
      {%- if request.page_type == 'index' -%}
        <h1 class="header__heading">
      {%- endif -%}
          <{% if section.settings.logo_link != blank %}a href="{{ section.settings.logo_link }}"{% else %}div{% endif %}
            class="header__heading-link{% if section.settings.logo_link != blank %} link link--text focus-inset{% endif %}{% if settings.logo != blank %} media media--transparent ratio{% endif %}"
            {%- if settings.logo != blank -%}
              style="--ratio-percent: {{ 1 | divided_by: settings.logo.aspect_ratio | times: 100 }}%"
            {% endif %}
          >
            {%- if settings.logo != blank -%}
              {%- assign logo_alt = settings.logo.alt | default: shop.name | escape -%}
              {%- assign logo_height = settings.logo_width | divided_by: settings.logo.aspect_ratio -%}
              {{ settings.logo | image_url: width: 500 | image_tag:
                class: 'header__heading-logo header__heading-logo--main motion-reduce',
                widths: '50, 100, 150, 200, 250, 300, 400, 500',
                height: logo_height,
                width: settings.logo_width,
                alt: logo_alt
              }}
              {%- if settings.secondary_logo != blank -%}
                {%- assign secondary_logo_height = settings.logo_width | divided_by: settings.secondary_logo.aspect_ratio -%}
                {{ settings.secondary_logo | image_url: width: 500 | image_tag:
                  class: 'header__heading-logo header__heading-logo--secondary motion-reduce',
                  widths: '50, 100, 150, 200, 250, 300, 400, 500',
                  height: secondary_logo_height,
                  width: settings.logo_width,
                  alt: logo_alt
                }}
              {%- endif -%}
            {%- else -%}
              <span class="h2">{{ shop.name }}</span>
            {%- endif -%}
          </{% if section.settings.logo_link != blank %}a{% else %}div{% endif %}>
      {%- if request.page_type == 'index' -%}
        </h1>
      {%- endif -%}
    {%- endif -%}

    {%- if section.settings.menu != blank and section.settings.menu_type_desktop != 'drawer' -%}
      {% if section.settings.menu_type_desktop == 'dropdown' %}
        <nav class="header__inline-menu">
          <ul class="list-menu list-menu--inline" role="list">
            {%- for link in section.settings.menu.links -%}
              <li>
                {%- if link.links != blank -%}
                  {% if section.settings.products_mega_menu_links contains link.title %}
                    {% render 'products-mega-menu', link: link %}
                  {% else %}
                    <header-menu>
                      <details id="Details-HeaderMenu-{{ forloop.index }}">
                        <summary class="header__menu-item header__menu-item--main list-menu__item link focus-inset">
                          <span {%- if link.child_active %} class="header__active-menu-item"{% endif %}>{{ link.title | escape }}</span>
                          {% render 'icon-caret' %}
                        </summary>
                        <ul id="HeaderMenu-MenuList-{{ forloop.index }}" class="header__submenu list-menu list-menu--disclosure gradient caption-large motion-reduce global-settings-popup" role="list" tabindex="-1">
                          {%- for childlink in link.links -%}
                            <li>
                              {%- if childlink.links == blank -%}
                                <a href="{{ childlink.url }}" class="header__menu-item list-menu__item link link--text focus-inset caption-large{% if section.settings.highlight_active_link and childlink.current %} list-menu__item--active{% endif %}"{% if childlink.current %} aria-current="page"{% endif %}>
                                  {{ childlink.title | escape }}
                                </a>
                              {%- else -%}
                                <details id="Details-HeaderSubMenu-{{ forloop.index }}">
                                  <summary class="header__menu-item link link--text list-menu__item focus-inset caption-large">
                                    <span>{{ childlink.title | escape }}</span>
                                    {% render 'icon-caret' %}
                                  </summary>
                                  <ul id="HeaderMenu-SubMenuList-{{ forloop.index }}" class="header__submenu list-menu motion-reduce">
                                    {%- for grandchildlink in childlink.links -%}
                                      <li>
                                        <a href="{{ grandchildlink.url }}" class="header__menu-item list-menu__item link link--text focus-inset caption-large{% if section.settings.highlight_active_link and grandchildlink.current %} list-menu__item--active{% endif %}"{% if grandchildlink.current %} aria-current="page"{% endif %}>
                                          {{ grandchildlink.title | escape }}
                                        </a>
                                      </li>
                                    {%- endfor -%}
                                  </ul>
                                </details>
                              {%- endif -%}
                            </li>
                          {%- endfor -%}
                        </ul>
                      </details>
                    </header-menu>
                  {% endif %}
                {%- else -%}
                  <a href="{{ link.url }}" class="header__menu-item header__menu-item--main list-menu__item link link--text focus-inset"{% if link.current %} aria-current="page"{% endif %}>
                    <span {%- if section.settings.highlight_active_link and link.current %} class="header__active-menu-item-v2 color-{{ section.settings.highlighted_link_color_scheme }}"{% endif %}>{{ link.title | escape }}</span>
                  </a>
                {%- endif -%}
              </li>
            {%- endfor -%}
          </ul>
        </nav>
      {% else %}
        <nav class="header__inline-menu">
          <ul class="list-menu list-menu--inline" role="list">
            {%- for link in section.settings.menu.links -%}
              <li>
                {%- if link.links != blank -%}
                  {% if section.settings.products_mega_menu_links contains link.title %}
                    {% render 'products-mega-menu', link: link %}
                  {% else %}
                    <header-menu>
                      <details id="Details-HeaderMenu-{{ forloop.index }}" class="mega-menu">
                        <summary
                          id="HeaderMenu-{{ link.handle }}"
                          class="header__menu-item list-menu__item link focus-inset"
                        >
                          <span
                            {%- if link.child_active %}
                              class="header__active-menu-item"
                            {% endif %}
                          >
                            {{- link.title | escape -}}
                          </span>
                          {% render 'icon-caret' %}
                        </summary>
                        <div
                          id="MegaMenu-Content-{{ forloop.index }}"
                          class="mega-menu__content color-{{ section.settings.menu_color_scheme }} gradient motion-reduce global-settings-popup"
                          tabindex="-1"
                        >
                          <ul
                            class="mega-menu__list page-width{% if link.levels == 1 %} mega-menu__list--condensed{% endif %}"
                            role="list"
                          >
                            {%- for childlink in link.links -%}
                              <li>
                                <a
                                  id="HeaderMenu-{{ link.handle }}-{{ childlink.handle }}"
                                  href="{{ childlink.url }}"
                                  class="mega-menu__link mega-menu__link--level-2 link{% if childlink.current %} mega-menu__link--active{% endif %}"
                                  {% if childlink.current %}
                                    aria-current="page"
                                  {% endif %}
                                >
                                  {{ childlink.title | escape }}
                                </a>
                                {%- if childlink.links != blank -%}
                                  <ul class="list-unstyled" role="list">
                                    {%- for grandchildlink in childlink.links -%}
                                      <li>
                                        <a
                                          id="HeaderMenu-{{ link.handle }}-{{ childlink.handle }}-{{ grandchildlink.handle }}"
                                          href="{{ grandchildlink.url }}"
                                          class="mega-menu__link link{% if grandchildlink.current %} mega-menu__link--active{% endif %}"
                                          {% if grandchildlink.current %}
                                            aria-current="page"
                                          {% endif %}
                                        >
                                          {{ grandchildlink.title | escape }}
                                        </a>
                                      </li>
                                    {%- endfor -%}
                                  </ul>
                                {%- endif -%}
                              </li>
                            {%- endfor -%}
                          </ul>
                        </div>
                      </details>
                    </header-menu>
                  {% endif %}
                {%- else -%}
                  <a
                    id="HeaderMenu-{{ link.handle }}"
                    href="{{ link.url }}"
                    class="header__menu-item list-menu__item link link--text focus-inset"
                    {% if link.current %}
                      aria-current="page"
                    {% endif %}
                  >
                    <span
                      {% if section.settings.highlight_active_link and link.current %}
                        class="header__active-menu-item-v2 color-{{ section.settings.highlighted_link_color_scheme }}"
                      {% endif %}
                    >
                      {{- link.title | escape -}}
                    </span>
                  </a>
                {%- endif -%}
              </li>
            {%- endfor -%}
          </ul>
        </nav>
      {% endif %}
    {%- endif -%}

    {%- if section.settings.logo_position == 'middle-center' -%}
      {%- if request.page_type == 'index' -%}
        <h1 class="header__heading">
      {%- endif -%}
          <{% if section.settings.logo_link != blank %}a href="{{ section.settings.logo_link }}"{% else %}div{% endif %}
            class="header__heading-link{% if section.settings.logo_link != blank %} link link--text focus-inset{% endif %}{% if settings.logo != blank %} media media--transparent ratio{% endif %}"
            {%- if settings.logo != blank -%}
              style="--ratio-percent: {{ 1 | divided_by: settings.logo.aspect_ratio | times: 100 }}%"
            {% endif %}
          >
            {%- if settings.logo != blank -%}
              {%- assign logo_alt = settings.logo.alt | default: shop.name | escape -%}
              {%- assign logo_height = settings.logo_width | divided_by: settings.logo.aspect_ratio -%}
              {{ settings.logo | image_url: width: 500 | image_tag:
                class: 'header__heading-logo header__heading-logo--main',
                widths: '50, 100, 150, 200, 250, 300, 400, 500',
                height: logo_height,
                width: settings.logo_width,
                alt: logo_alt
              }}
              {%- if settings.secondary_logo != blank -%}
                {%- assign secondary_logo_height = settings.logo_width | divided_by: settings.secondary_logo.aspect_ratio -%}
                {{ settings.secondary_logo | image_url: width: 500 | image_tag:
                  class: 'header__heading-logo header__heading-logo--secondary',
                  widths: '50, 100, 150, 200, 250, 300, 400, 500',
                  height: secondary_logo_height,
                  width: settings.logo_width,
                  alt: logo_alt
                }}
              {%- endif -%}
            {%- else -%}
              <span class="h2">{{ shop.name }}</span>
            {%- endif -%}
          </{% if section.settings.logo_link != blank %}a{% else %}div{% endif %}>
      {%- if request.page_type == 'index' -%}
        </h1>
      {%- endif -%}
    {%- endif -%}

    <div class="header__icons">
      <details-modal class="header__search">
        <details>
          <summary class="header__icon header__icon--search header__icon--summary link focus-inset modal__toggle" aria-haspopup="dialog" aria-label="{{ 'general.search.search' | t }}">
            <span>
              <svg class="modal__toggle-open icon icon-search" aria-hidden="true" focusable="false">
                <use href="#icon-search">
              </svg>
              <svg class="modal__toggle-close icon icon-close" aria-hidden="true" focusable="false">
                <use href="#icon-close">
              </svg>
            </span>
          </summary>
          <div class="search-modal modal__content gradient" role="dialog" aria-modal="true" aria-label="{{ 'general.search.search' | t }}">
            <div class="modal-overlay"></div>
            <div class="search-modal__content search-modal__content--right{% if settings.inputs_shadow_vertical_offset != 0 and settings.inputs_shadow_vertical_offset < 0 %} search-modal__content-top{% else %} search-modal__content-bottom{% endif %}" tabindex="-1">
              {%- if settings.predictive_search_enabled -%}
                <predictive-search class="search-modal__form" data-main='false' data-loading-text="{{ 'accessibility.loading' | t }}">
              {%- else -%}
                <search-form class="search-modal__form" data-main='false'>
              {%- endif -%}
                  <form action="{{ routes.search_url }}" method="get" role="search" class="search search-modal__form search-modal__form--border-light search-modal__form--polyfill search-modal__form--predictive" data-modal="{{ settings.animations_type }}">
                    <div class="field">
                      <input class="search__input field__input"
                        id="Search-In-Modal"
                        type="search"
                        name="q"
                        value="{{ search.terms | escape }}"
                        placeholder="{{ 'general.search.search' | t }}"
                        {%- if settings.predictive_search_enabled -%}
                          role="combobox"
                          aria-expanded="false"
                          aria-owns="predictive-search-results"
                          aria-controls="predictive-search-results"
                          aria-haspopup="listbox"
                          aria-autocomplete="list"
                          autocorrect="off"
                          autocomplete="off"
                          autocapitalize="off"
                          spellcheck="false"
                        {%- endif -%}
                      >
                      <label class="field__label" for="Search-In-Modal">{{ 'general.search.search' | t }}</label>
                      <input type="hidden" name="options[prefix]" value="last">
                      <button type="reset" class="reset__button field__button{% if search.terms == blank %} hidden{% endif %}" aria-label="{{ 'general.search.reset' | t }}">
                        <svg class="icon icon-close" aria-hidden="true" focusable="false">
                          <use xlink:href="#icon-reset">
                        </svg>
                      </button>
                      <button class="search__button field__button" aria-label="{{ 'general.search.search' | t }}">
                        <svg class="icon icon-search" aria-hidden="true" focusable="false">
                          <use href="#icon-search">
                        </svg>
                      </button>
                    </div>

                    {%- if settings.predictive_search_enabled -%}
                      <div class="predictive-search predictive-search--header" tabindex="-1" data-predictive-search>
                        <div class="predictive-search__loading-state">
                          <svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                            <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                          </svg>
                        </div>
                      </div>

                      <span class="predictive-search-status visually-hidden" role="status" aria-hidden="true"></span>
                    {%- endif -%}
                  </form>
                {%- if settings.predictive_search_enabled -%}
                  </predictive-search>
                {%- else -%}
                  </search-form>
                {%- endif -%}
              <button type="button" class="search-modal__close-button modal__close-button link link--text focus-inset" aria-label="{{ 'accessibility.close' | t }}">
                <svg class="icon icon-close" aria-hidden="true" focusable="false">
                  <use href="#icon-close">
                </svg>
              </button>
            </div>
          </div>
        </details>
      </details-modal>

      {%- if shop.customer_accounts_enabled -%}
        <a href="{%- if customer -%}{{ routes.account_url }}{%- else -%}{{ routes.account_login_url }}{%- endif -%}" class="header__icon header__icon--account link focus-inset{% if section.settings.menu != blank %} small-hide{% endif %}">
          {% render 'icon-account' %}
          <span class="visually-hidden">
            {%- liquid
              if customer
                echo 'customer.account_fallback' | t
              else
                echo 'customer.log_in' | t
              endif
            -%}
          </span>
        </a>
      {%- endif -%}

      <a href="javascript:void(0);" class="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble">
        {%- liquid
          assign non_upsell_count = cart.item_count
          for item in cart.items
            if item.product.tags contains 'cart-hidden'
              assign non_upsell_count = non_upsell_count | minus: 1
            endif
          endfor
           
          if non_upsell_count > 0
            render 'icon-cart-empty'
          else
            render 'icon-cart'
          endif
        -%}
        <span class="visually-hidden">{{ 'templates.cart.cart' | t }}</span>
        {%- if non_upsell_count > 0-%}
          <div class="cart-count-bubble">
            {%- if non_upsell_count < 100 -%}
              <span aria-hidden="true">{{ non_upsell_count }}</span>
            {%- endif -%}
            <span class="visually-hidden">{{ 'sections.header.cart_count' | t: count: non_upsell_count }}</span>
          </div>
        {%- endif -%}
      </a>
    </div>
  </header>
</{% if section.settings.sticky_header_type != 'none' %}sticky-header{% else %}static-header{% endif %}>

{%- if settings.cart_type == "notification" -%}
  {%- render 'cart-notification', color_scheme: section.settings.color_scheme -%}
{%- endif -%}

<!-- HTML for the sidecart -->
<div class="sidecart" id="sidecart">
  <div class="sidecart-header">
    <h2>Cart • <span id="cart-item-count">{{ cart.item_count }}</span> items</h2>
    <span class="sidecart-close" id="sidecart-close">&times;</span>
  </div>
  <div class="sidecart-body">
    <p>Cart reserved for 04:40 more minutes</p>
    <p>You're $5.01 away from FREE shipping!</p>
    {% for item in cart.items %}
      <div class="cart-item">
        <img src="{{ item.image | img_url: 'small' }}" alt="{{ item.title }}">
        <div class="cart-item-details">
          <p class="cart-item-title">{{ item.title }}</p>
          <p class="cart-item-quantity">
            <button>-</button>
            <input type="text" value="{{ item.quantity }}" readonly>
            <button>+</button>
          </p>
          <p class="cart-item-price">{{ item.line_price | money }}</p>
        </div>
        <span class="cart-item-remove">&times;</span>
      </div>
    {% endfor %}
  </div>
  <div class="sidecart-footer">
    <div class="cart-summary">
      <p>Subtotal</p>
      <p>{{ cart.total_price | money }}</p>
    </div>
    <button class="cart-checkout-button">Check out • {{ cart.total_price | money }}</button>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var sidecart = document.getElementById('sidecart');
    var cartIcon = document.getElementById('cart-icon-bubble');
    var sidecartClose = document.getElementById('sidecart-close');

    cartIcon.addEventListener('click', function() {
      sidecart.classList.add('open');
    });

    sidecartClose.addEventListener('click', function() {
      sidecart.classList.remove('open');
    });

    document.addEventListener('click', function(event) {
      if (!sidecart.contains(event.target) && !cartIcon.contains(event.target)) {
        sidecart.classList.remove('open');
      }
    });
  });
</script>

{% javascript %}
  class StickyHeader extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.header = document.querySelector('.section-header');
      this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type') === 'always' || this.getAttribute('data-sticky-type') === 'reduce-logo-size';
      this.headerBounds = {};

      this.setHeaderHeight();

      window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

      if (this.headerIsAlwaysSticky) {
        this.header.classList.add('shopify-section-header-sticky');
      };

      this.currentScrollTop = 0;
      this.preventReveal = false;
      this.predictiveSearch = this.querySelector('predictive-search');

      this.onScrollHandler = this.onScroll.bind(this);
      this.hideHeaderOnScrollUp = () => this.preventReveal = true;

      this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
      window.addEventListener('scroll', this.onScrollHandler, false);

      this.createObserver();
    }

    setHeaderHeight() {
      document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
    }

    disconnectedCallback() {
      this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
      window.removeEventListener('scroll', this.onScrollHandler);
    }

    createObserver() {
      let observer = new IntersectionObserver((entries, observer) => {
        this.headerBounds = entries[0].intersectionRect;
        observer.disconnect();
      });

      observer.observe(this.header);
    }

    onScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

      if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
        this.header.classList.add('scrolled-past-header');
        if (this.preventHide) return;
        requestAnimationFrame(this.hide.bind(this));
      } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
        this.header.classList.add('scrolled-past-header');
        if (!this.preventReveal) {
          requestAnimationFrame(this.reveal.bind(this));
        } else {
          window.clearTimeout(this.isScrolling);

          this.isScrolling = setTimeout(() => {
            this.preventReveal = false;
          }, 66);

          requestAnimationFrame(this.hide.bind(this));
        }
      } else if (scrollTop <= this.headerBounds.top) {
        this.header.classList.remove('scrolled-past-header');
        requestAnimationFrame(this.reset.bind(this));
      }

      this.currentScrollTop = scrollTop;
    }

    hide() {
      if (this.headerIsAlwaysSticky) return;
      this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
      this.closeMenuDisclosure();
      this.closeSearchModal();
    }

    reveal() {
      if (this.headerIsAlwaysSticky) return;
      this.header.classList.add('shopify-section-header-sticky', 'animate');
      this.header.classList.remove('shopify-section-header-hidden');
    }

    reset() {
      if (this.headerIsAlwaysSticky) return;
      this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky', 'animate');
    }

    closeMenuDisclosure() {
      this.disclosures = this.disclosures || this.header.querySelectorAll('header-menu');
      this.disclosures.forEach(disclosure => disclosure.close());
    }

    closeSearchModal() {
      this.searchModal = this.searchModal || this.header.querySelector('details-modal');
      this.searchModal.close(false);
    }
  }

  customElements.define('sticky-header', StickyHeader);
  
  class StaticHeader extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.header = document.querySelector('.section-header');
      this.setHeaderHeight();

      window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));
    }

    setHeaderHeight() {
      document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
    }
  }

  customElements.define('static-header', StaticHeader);
{% endjavascript %}

<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": {{ shop.name | json }},
    {% if settings.logo %}
      "logo": {{ settings.logo | image_url: width: 500 | prepend: "https:" | json }},
    {% endif %}
    "sameAs": [
      {{ settings.social_twitter_link | json }},
      {{ settings.social_facebook_link | json }},
      {{ settings.social_pinterest_link | json }},
      {{ settings.social_instagram_link | json }},
      {{ settings.social_tiktok_link | json }},
      {{ settings.social_tumblr_link | json }},
      {{ settings.social_snapchat_link | json }},
      {{ settings.social_youtube_link | json }},
      {{ settings.social_vimeo_link | json }}
    ],
    "url": {{ request.origin | append: page.url | json }}
  }
</script>

{%- if request.page_type == 'index' -%}
  {% assign potential_action_target = request.origin | append: routes.search_url | append: "?q={search_term_string}" %}
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": {{ shop.name | json }},
      "potentialAction": {
        "@type": "SearchAction",
        "target": {{ potential_action_target | json }},
        "query-input": "required name=search_term_string"
      },
      "url": {{ request.origin | append: page.url | json }}
    }
  </script>
{%- endif -%}

{% schema %}
{
  "name": "t:sections.header.name",
  "class": "section-header",
  "settings": [
    {
      "type": "header",
      "content": "Header"
    },
    {
      "type": "select",
      "id": "sticky_header_type",
      "options": [
        {
          "value": "none",
          "label": "t:sections.header.settings.sticky_header_type.options__1.label"
        },
        {
          "value": "on-scroll-up",
          "label": "t:sections.header.settings.sticky_header_type.options__2.label"
        },
        {
          "value": "always",
          "label": "t:sections.header.settings.sticky_header_type.options__3.label"
        },
        {
          "value": "reduce-logo-size",
          "label": "t:sections.header.settings.sticky_header_type.options__4.label"
        }
      ],
      "default": "on-scroll-up",
      "label": "t:sections.header.settings.sticky_header_type.label"
    },
    {
      "type": "checkbox",
      "id": "show_line_separator",
      "default": true,
      "label": "t:sections.header.settings.show_line_separator.label"
    },
    {
      "type": "select",
      "id": "color_scheme",
      "options": [
        {
          "value": "accent-1",
          "label": "Accent 1"
        },
        {
          "value": "accent-2",
          "label": "Accent 2"
        },
        {
          "value": "background-1",
          "label": "Background 1"
        },
        {
          "value": "background-2",
          "label": "Background 2"
        },
        {
          "value": "inverse",
          "label": "Inverse"
        }
      ],
      "default": "background-1",
      "label": "Color scheme"
    },
    {
      "type": "header",
      "content": "t:sections.header.settings.logo_header.content"
    },
    {
      "type": "paragraph",
      "content": "t:sections.header.settings.logo_help.content"
    },
    {
      "type": "url",
      "id": "logo_link",
      "label": "Logo link",
      "default": "/"
    },
    {
      "type": "select",
      "id": "logo_position",
      "options": [
        {
          "value": "top-left",
          "label": "t:sections.header.settings.logo_position.options__2.label"
        },
        {
          "value": "top-center",
          "label": "t:sections.header.settings.logo_position.options__3.label"
        },
        {
          "value": "middle-left",
          "label": "t:sections.header.settings.logo_position.options__1.label"
        },
        {
          "value": "middle-center",
          "label": "t:sections.header.settings.logo_position.options__4.label"
        }
      ],
      "default": "middle-left",
      "label": "t:sections.header.settings.logo_position.label"
    },
    {
      "type": "header",
      "content": "Menu"
    },
    {
      "type": "link_list",
      "id": "menu",
      "default": "main-menu",
      "label": "t:sections.header.settings.menu.label"
    },
    {
      "type": "select",
      "id": "menu_type_desktop",
      "options": [
        {
          "value": "dropdown",
          "label": "Dropdown"
        },
        {
          "value": "mega",
          "label": "Mega menu"
        },
        {
          "value": "drawer",
          "label": "Drawer"
        }
      ],
      "default": "dropdown",
      "label": "Desktop menu type",
      "info": "Menu type is automatically optimized for mobile."
    },
    {
      "type": "checkbox",
      "id": "highlight_active_link",
      "label": "Highlight active link on desktop",
      "default": true
    },
    {
      "type": "select",
      "id": "highlighted_link_color_scheme",
      "options": [
        {
          "value": "accent-1",
          "label": "Accent 1"
        },
        {
          "value": "accent-2",
          "label": "Accent 2"
        },
        {
          "value": "background-1",
          "label": "Background 1"
        },
        {
          "value": "background-2",
          "label": "Background 2"
        },
        {
          "value": "inverse",
          "label": "Inverse"
        }
      ],
      "default": "accent-1",
      "label": "Highlighted link color scheme"
    },
    {
      "type": "header",
      "content": "Products & Collections Mega Menu"
    },
    {
      "type": "text",
      "id": "products_mega_menu_links",
      "label": "Links to display products & collections mega menu",
      "info": "Labels of links separated by comma."
    },
    {
      "type": "checkbox",
      "id": "products_mega_menu_display_collection_products",
      "label": "Display products that the collection contains",
      "default": false,
      "info": "If checked, every product from the sub-link collection will be displayed. Otherwise, add each individual product/collection as a nested link."
    },
    {
      "type": "checkbox",
      "id": "products_mega_menu_display_collection_images",
      "label": "Display collection images on desktop",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "products_mega_menu_display_collection_images_on_mobile",
      "label": "Display collection images on mobile",
      "default": false
    },
    {
      "type": "header",
      "content": "Mobile menu"
    },
    {
      "type": "text",
      "id": "mobile_menu_title",
      "label": "Title",
      "default": "Menu"
    },
    {
      "type": "link_list",
      "id": "secondary_menu",
      "label": "Secondary menu"
    },
    {
      "type": "select",
      "id": "menu_color_scheme",
      "options": [
        {
          "value": "accent-1",
          "label": "Accent 1"
        },
        {
          "value": "accent-2",
          "label": "Accent 2"
        },
        {
          "value": "background-1",
          "label": "Background 1"
        },
        {
          "value": "background-2",
          "label": "Background 2"
        },
        {
          "value": "inverse",
          "label": "Inverse"
        }
      ],
      "default": "background-1",
      "label": "Color scheme"
    },
    {
      "type": "header",
      "content": "t:sections.header.settings.mobile_layout.content"
    },
    {
      "type": "select",
      "id": "mobile_logo_position",
      "options": [
        {
          "value": "center",
          "label": "t:sections.header.settings.mobile_logo_position.options__1.label"
        },
        {
          "value": "left",
          "label": "t:sections.header.settings.mobile_logo_position.options__2.label"
        }
      ],
      "default": "center",
      "label": "t:sections.header.settings.mobile_logo_position.label"
    },
    {
      "type": "header",
      "content": "Search"
    },
    {
      "type": "paragraph",
      "content": "Add a \"search-hidden\" tag to the products you want to hide from the search results."
    },
    {
      "type": "checkbox",
      "id": "display_search",
      "label": "Display search icon",
      "default": true
    },
    {
      "type": "header",
      "content": "t:sections.all.spacing"
    },
    {
      "type": "range",
      "id": "margin_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "t:sections.header.settings.margin_bottom.label",
      "default": 0
    },
    {
      "type": "header",
      "content": "t:sections.all.padding.section_padding_heading"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 36,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_top",
      "default": 20
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 36,
      "step": 4,
      "unit": "px",
      "label": "t:sections.all.padding.padding_bottom",
      "default": 20
    }
  ]
}
{% endschema %}
