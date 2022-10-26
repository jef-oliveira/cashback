import './styles.scss';

function Button({ fill='outline', theme='neutral', className, children, ...props }) {
  return (
    <button className={`button ${fill} ${theme}${className ? ` ${className}` : ''}`} { ...props }>
      {children}
    </button>
  );
}

Button.OUTLINE = 'outline';
Button.SOLID = 'solid';

Button.NEUTRAL = 'neutral';
Button.SUCCESS = 'regular';
Button.DANGER = 'danger';
Button.PRIMARY = 'primary';

export default Button;
