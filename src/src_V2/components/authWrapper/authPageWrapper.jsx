import classNames from './authPageWrapper.module.css';
import logo from '../../assets/Travely.png';
import loginIllustration from '../../assets/login_illustration.svg';

const authPageWrapper = (props) => {
  return (
    <div className={classNames.authWrapper}>
      <div className={classNames.illustrationWrapper}>
        <div className={classNames.logo}>
          <img className={classNames.img} src={logo} alt="" />
        </div>
        <img className={classNames.illustration} src={loginIllustration} alt="" />
      </div>
      <div className={classNames.mainWrapper}>
        <div className={classNames.titleWrapper}>
          <h1 className={classNames.title}>{props.title}</h1>
          {props.description && <h2 className={classNames.description}>{props.description}</h2>}
        </div>
        <div className={classNames.formWrapper}>{props.children}</div>
      </div>
    </div>
  );
};

export default authPageWrapper;
