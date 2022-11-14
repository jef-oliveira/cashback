import { Icon } from 'components';

import './styles.scss';

function Info({ type = 'neutral', icon = 'circle-info', iconType, className, children, ...props }) {
  return (
    <div className={`info ${type}${className ? ` ${className}` : ''}`}>
      <Icon name={icon} type={iconType} />
      {children}
    </div>
  );
}

Info.NEUTRAL = 'neutral';
Info.SUCCESS = 'success';
Info.DANGER = 'danger';
Info.WARNING = 'warning';

export default Info;
