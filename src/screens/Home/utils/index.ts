function generalCatelogSort(a: any, b: any) {
  if (a.catalogName === 'General') {
    return -1; // "General" comes before other catalogs
  } else if (b.catalogName === 'General') {
    return 1; // Other catalogs come after "General"
  } else {
    // For other catalogs, maintain their original order
    return 0;
  }
}

export {generalCatelogSort};
