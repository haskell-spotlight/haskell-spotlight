import GlobalMenu, { defaultMenuProps } from "../../layout/GlobalMenu";
import Footer from "../../layout/Footer";
import s from './Layout.module.css';
import { PackageProps } from "./common";
import Sidebar from './Sidebar';
import Tabs, { Tab } from "./tabs/Tabs";
import BriefInfo from "./BriefInfo";
import { ReactNode } from "react";

type LayoutProps = {
  analytics: {
    screenName: string
  },
  package: PackageProps,
  hidePackageVersion?: boolean,
  activeTab: string,
  children: ReactNode,
}

const getTabs = (props: LayoutProps): Tab[] => {
  return [
    {
      id: 'overview',
      title: 'Overview',
      href: `/package/${props.package.id}`
    },
    // {
    //   id: 'docs',
    //   title: '📘 Docs',
    //   href: `#`
    // },
    {
      id: 'versions',
      title: `${props.package.versionsCount} Versions`,
      href: `/package/${props.package.name}/versions`
    },
    // {
    //   id: 'dependencies',
    //   title: `${props.package.dependencies?.length || '0'} Dependencies`,
    //   href: '#'
    // },
    {
      id: 'dependents',
      title: `${props.package.reverseDependencies?.length || '0'} Dependents`,
      href: `/package/${props.package.name}/dependents`
    }
  ]
}

const Layout = (props: LayoutProps) => {
  return (
    <div className={s.page}>
      <GlobalMenu {...defaultMenuProps} />
      <div className={s.packageContainer}>
        <div className={s.contentContainer}>
          <div className={s.content}>
            <div className={s.briefInfo}>
              <BriefInfo
                packageName={props.package.name}
                packageVersion={props.package.currentVersion}
                shortDescription={props.package.shortDescription}
                hidePackageVersion={props.hidePackageVersion}
              />
              <Tabs
                tabs={getTabs(props)}
                activeTab={props.activeTab}
              />
            </div>

            <div className={s.children}>
              {props.children}
            </div>
          </div>
        </div>

        <div className={s.sidebar}>
          <Sidebar package={props.package} analytics={{ screenName: props.analytics.screenName }} />
        </div>
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
