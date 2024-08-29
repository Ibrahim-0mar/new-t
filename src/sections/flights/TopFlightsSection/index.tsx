import Content from './components/Content';

async function TopFlightsSection({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <Content searchParams={searchParams} />;
}

export default TopFlightsSection;
