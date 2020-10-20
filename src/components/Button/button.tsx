import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classnames from 'classnames';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
export type ButtonSize = 'lg' | 'sm'

interface BaseButtonProps {
  classname?: string;
  /**类型 */
  btnType?: ButtonType;
  /**尺寸 */
  size?: ButtonSize;
  /**a链接的href */
  href?: string;
  /** 是否禁用 */
  disabled?: boolean;
  children?: React.ReactNode;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * 
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'beryl'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    classname,
    btnType,
    size,
    href,
    disabled,
    children,
    ...restProps
  } = props

  const classes = classnames('btn', classname, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}


export default Button;