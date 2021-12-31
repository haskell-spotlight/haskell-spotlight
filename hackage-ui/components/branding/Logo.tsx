import s from './Logo.module.css';

const Logo = (props: { fontSize: number }) => {
  return (
    <div
      className={s.logo}
      style={{ fontSize: `${props.fontSize}rem`, height: `${props.fontSize * 1.33}rem` }}
    >
      <svg
        className={s.svg}
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="80"
        viewBox="0 0 120 80"
        style={{ top: `-${props.fontSize * 0.07}rem`}}
      >
        <path d="M1.842 77.722L26.586 40.63 1.842 3.537H20.4L45.144 40.63 20.4 77.722H1.842zm0 0" fill="#453a62" />
        <path d="M26.586 77.722L51.33 40.63 26.586 3.537h18.558L94.63 77.722H76.074L60.61 54.54 45.143 77.722H26.586zm0 0" fill="#453a62" />
        <path d="M86.384 56.085L78.136 43.72h28.868v12.366h-20.62zM74.012 37.54l-8.248-12.365h41.24V37.54H74.012zm0 0" fill="#453a62" />
      </svg>
      <span style={{ marginLeft: '4rem'}}>hackage.haskell.org</span>
    </div>
  );
};

export default Logo;
