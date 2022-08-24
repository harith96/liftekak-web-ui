export default function getFirstComponentOfSelectedTown(fullTownName) {
  return fullTownName?.split(',')[0]?.trim() || '';
}
