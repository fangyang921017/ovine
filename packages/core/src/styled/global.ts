import isFunction from 'lodash/isFunction'
import { createGlobalStyle, css, DefaultTheme } from 'styled-components'

import { app } from '@/app'

const getSiteStyle = (props: DefaultTheme) => {
  try {
    const siteStyle = app.styled.globalStyle
    return !isFunction(siteStyle) ? siteStyle : siteStyle(props)
  } catch (_) {
    //
  }

  return undefined
}

// 全局样式
const GlobalStyle = createGlobalStyle`
  /** lib 全局样式 */
  .app-root {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .form-control-static {
    min-height: 34px;
    padding-top: 7px;
    padding-bottom: 7px;
    margin-bottom: 0;
  }

  .clickable {
    user-select: none;
    cursor: pointer;
  }

  .l-h-1 {
    line-height: 1;
  }

  .sub-h-full {
    & > *:only-child {
      height: 100%;
    }
  }

  svg.icon.icon-clock {
    top: 0;
  }

  /** lib 主题相关的全局样式 */
  .antd-Crud-pageSwitch {
    .antd-Select {
      min-height: 20px;
      padding: 4px 0 4px 10px;
    }
  }

  /** amis 兼容  */

  ${({ theme: { ns } }) => css`
    .line-break-json {
      .${ns}JsonField {
        width: 100%;
        span {
          white-space: normal;
          word-break: all;
        }
      }
    }

    .${ns}Button {
      &--blank {
        color: var(--text-color);
        height: auto;
        &:hover {
          background-color: var(--Button--light-bg);
        }
        &.${ns}Button--iconOnly>i.fa {
          font-size: var(--fontSizeBased);
        }
      }
    }

    .cxd-Button--blank {
      &:hover {
        background-color: #d9d9d9;
      }
      &.cxd-Button--iconOnly {
        line-height: 1.4rem;
        & > i.fa {
          font-size: 0.9rem;
          line-height: 0.9rem;
        }
      }
    }

    .cxd-Page-title {
      .cxd-Remark-icon {
        vertical-align: baseline;
      }
    }

    .${ns}CBGroupOrItem {
      &:before,
      &:after,
      &:last-child:before {
        border-color: var(--Button--info-onActive-bg);
      }
    }

    .${ns}DateRangePicker {
      align-items: center;
    }

    .${ns}Drawer {
      &.hide-close-button {
        .${ns}Drawer-close {
          display: none;
        }
      }
    }

    .${ns}Crud-pager {
      & > div {
        white-space: nowrap;
      }
    }

    .${ns}ExcelControl-dropzone {
      & > p {
        margin: 1rem auto;
      }
    }

    /** 1.0.14 Tree BUG */
    .${ns}Toast-wrap--topCenter, .${ns}Toast-wrap--bottomCenter {
      transform: translateX(-50%);
      margin-left: 0;
    }
    .${ns}Tree-itemIcon {
      line-height: 30px;
      &.${ns}Tree-leafIcon {
        svg {
          display: block;
        }
      }
      svg {
        display: none;
      }
    }

    /** 调整默认菜单UI */
    .app-root {
      .${ns}ContextMenu {
        &-list {
          width: auto;
        }

        &-menu {
          box-shadow: none;
          &::before {
            border-radius: 0px;
          }
          &.in {
            animation-name: contextMenuIn;
            animation-duration: 100ms;
          }
        }

        &-item {
          position: relative;
          height: 20px;
          line-height: 20px;

          & > a {
            border: 0px !important;
          }
          &:not(.is-disabled):hover > a {
            background: #888888;
          }
        }
        &-item:hover {
          .${ns}ContextMenu-subList {
            box-shadow: none;
            border-radius: 0px;
            &::before {
              border-radius: 0px;
            }
          }
        }
      }
    }
  `}

  /** site 全局样式 */
  ${({ theme }) => getSiteStyle(theme)}
`

export default GlobalStyle
