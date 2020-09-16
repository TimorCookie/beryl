import React from 'react';
import classnames from 'classnames';
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

interface BaseButtonProps {
  classname?: string;
  btnType?: ButtonType;
  size?: ButtonSize;
  href?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
  const {
    classname,
    btnType,
    size,
    href,
    disabled,
    children,
    ...restProps
  } = props
  
  const classes = classnames('btn', classname,{
    [`btn-${btnType}`]: ButtonType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if(btnType === ButtonType.Link&&href) {
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
  btnType: ButtonType.Default
}


export default Button