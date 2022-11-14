import { Icon } from 'components';
import { useSession } from 'context';

import './styles.scss';

function ProfileData({ person, className, ...props }) {
  const { currentUser } = useSession();

  return (
    <div className={`profile-data${className ? ` ${className}` : ''}`} { ...props }>
      <div className="photo">
        {Boolean(person.photo) && <img scr={person.photo} alt="foto" style={{ content: `url(${person.photo})` }} />}
        {!Boolean(person.photo) && <Icon name="user" title="foto" />}
      </div>
      <div className="data">
        <h3>
          {person.name}
          {currentUser.admin && person.registered && (
            <Icon name="address-card" type={Icon.REGULAR} title="Autenticado" />
          )}
          {currentUser.admin && person.admin && (
            <Icon name="screwdriver-wrench" title="Administrador" />
          )}
        </h3>
        <small>{person.email || person.phone || 'sem dados para contato'}</small>
      </div>
    </div>
  );
}

export default ProfileData;
