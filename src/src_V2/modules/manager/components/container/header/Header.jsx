import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';

import CustomizedMenus from './NavigationMenu';
import travelyIcon from '../../../../../assets/images/Travely.png';
import { ROUTES } from '../../../routes';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={`../${ROUTES.DASHBOARD}`} className={styles.link}>
          <img src={travelyIcon} width='160' alt='Travely' />
        </Link>
      </div>
      <div className={styles.user}>
        <NotificationsIcon className={styles.notification} />
        <div>
          <CustomizedMenus />
        </div>
      </div>
    </header>
  );
}
