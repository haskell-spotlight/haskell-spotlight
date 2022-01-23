import { NextPage, GetStaticPropsResult, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import DependentsPage, { DependentsPageProps } from '../../../components/pages/package/DependentsPage';
import * as pkgFetch from '../../../fetch/package';

const Page: NextPage<DependentsPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>{props.package.name} - Hackage: The Haskell community’s package registry</title>
        <meta name="description" content={props.package.shortDescription || props.package.name}></meta>
      </Head>

      <DependentsPage {...props} />
    </>
  );
}

export async function getStaticProps(props: GetStaticPropsContext): Promise<GetStaticPropsResult<DependentsPageProps>> {
  const packageId = props.params!.packageId as string;
  const pkg = await pkgFetch.getPackage(packageId);

  return {
    props: {
      package: pkg,
    },
    revalidate: 180
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export default Page;
