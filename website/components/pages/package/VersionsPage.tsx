import s from './VersionsPage.module.css';
import { PackageProps } from './common';
import Layout from './Layout';
import * as lib from '@haskell-spotlight/react-lib';
import SmallButtonExtA from './SmallButtonExtA';

const screenName = 'PackageVersionsPage';

export type VersionsPageProps = {
  package: PackageProps,
}

const VersionsPage = (props: VersionsPageProps) => {
  const versions = props.package.versions ? sortVersions(Array.from(new Set([
    ...props.package.versions?.normal,
    ...props.package.versions?.unpreferred,
    ...props.package.versions?.deprecated,
  ]))) : [];

  return (
    <Layout
      analytics={{ screenName }}
      package={props.package}
      activeTab="versions"
      hidePackageVersion={true}
    >
      <div className={s.versionsPage}>
        <div className={s.info}>
          <span>All <strong>{versions.length}</strong> versions of <strong>{props.package.name}</strong></span>

          <SmallButtonExtA
            href="https://pvp.haskell.org/"
            title='Versioning Policy'
          />

        </div>

        <div>
          {versions.map(versionId => {
            let kind: VersionKind = 'normal';
            if (props.package.versions && props.package.versions?.unpreferred.includes(versionId)) {
              kind = 'unpreferred'
            } else if (props.package.versions && props.package.versions?.deprecated.includes(versionId)) {
              kind = 'deprecated'
            }

            return (
              <Version
                key={versionId}
                id={versionId}
                kind={kind}
                getHref={() => `/package/${props.package.name}-${versionId}`}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

type VersionKind = 'normal' | 'unpreferred' | 'deprecated';
export type VersionProps = {
  id: string,
  kind: VersionKind,
  getHref: () => string
}

const Version = (props: VersionProps) => {
  let versionKindColor = 'var(--purple-color-2)';
  let versionKindLabel = 'Recommended';
  if (props.kind === 'deprecated') {
    versionKindColor = 'var(--accent-color-red)';
    versionKindLabel = 'Deprecated';
  } else if (props.kind === 'unpreferred') {
    versionKindColor = 'var(--text-color)';
    versionKindLabel = 'Unpreferred';
  }

  return (
    <lib.links.A
      className={s.version}
      href={props.getHref()}
      analytics={{ featureName: 'ClickPackageVersion', eventParams: { event_label: props.id, screen_name: screenName } }}
      prefetch={false}
    >
      <div
        className={s.versionKind}
        style={{
          background: versionKindColor
        }}
      >
        {versionKindLabel}
      </div>
      <div
        className={s.versionId}
        style={{ color: versionKindColor }}
      >
        {props.id}
      </div>
    </lib.links.A>
  );
}

function sortVersions(versions: string[]): string[] {
  return versions.sort((v1, v2) => {
    const v1parts = v1.split('.');
    const v2parts = v2.split('.');
    const len = Math.min(v1parts.length, v2parts.length);

    for (let i = 0; i < len; i++) {
      const a2 = +v1parts[i] || 0;
      const b2 = +v2parts[i] || 0;

      if (a2 !== b2) {
        return a2 > b2 ? 1 : -1;
      }
    }

    return v1.length - v2.length;
  }).reverse();
}

export default VersionsPage;
