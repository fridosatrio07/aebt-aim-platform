import { AssetRegistryModuleShell } from '../../../src/components/AssetRegistryModuleShell';

interface AssetDetailPageProps {
  params: Promise<{ assetId: string }>;
}

export default async function Page({ params }: AssetDetailPageProps) {
  const { assetId } = await params;
  return <AssetRegistryModuleShell mode="detail" assetId={assetId} />;
}
