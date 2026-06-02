function getVersionParts(version: string): number[] {
  return version
    .replace('v', '')
    .split('.')
    .map(n => parseInt(n, 10));
}

export const isLatestVersion = (
  currentVersion: string,
  latestVersion: string
): boolean => {
  const currentVersionParts = getVersionParts(currentVersion);
  const latestVersionParts = getVersionParts(latestVersion);

  for (let i = 0; i < currentVersionParts.length; i += 1) {
    if (currentVersionParts[i] !== latestVersionParts[i]) {
      return (currentVersionParts[i] || 0) > (latestVersionParts[i] || 0);
    }
  }
  return true;
};
