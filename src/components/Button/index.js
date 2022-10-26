import { Icon } from 'components';

import './styles.scss';

function Button({ fill='outline', theme='neutral', leftIcon, leftIconType, rightIcon, rightIconType, className, children, ...props }) {
  return (
    <button className={`button ${fill} ${theme}${className ? ` ${className}` : ''}`} { ...props }>
      {Boolean(leftIcon) && <Icon name={leftIcon} type={leftIconType} />}
      {Boolean(children) && <span>{children}</span>}
      {Boolean(rightIcon) && <Icon name={rightIcon} type={rightIconType} />}
    </button>
  );
}

Button.OUTLINE = 'outline';
Button.SOLID = 'solid';

Button.NEUTRAL = 'neutral';
Button.SUCCESS = 'success';
Button.DANGER = 'danger';
Button.PRIMARY = 'primary';

export default Button;
