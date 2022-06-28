import {toPng, toBlob, toCanvas, toJpeg, toSvg, toPixelData} from 'html-to-image';

export enum ExportType {
  png,
  svg,
  jpeg,
  blob,
  canvas,
  pixelData
}

export type ExportOptions = {
  filter: (node: HTMLElement) => boolean
}

const renderMapping = new Map<ExportType, any>()
  .set(ExportType.blob, toBlob)
  .set(ExportType.png, toPng)
  .set(ExportType.canvas, toCanvas)
  .set(ExportType.jpeg, toJpeg)
  .set(ExportType.svg, toSvg)
  .set(ExportType.pixelData, toPixelData)

export const exportDomToImage = (node: HTMLElement, type = ExportType.png, options?: ExportOptions) => {
  const render = renderMapping.get(type) ?? toPng;
  return render(node, {filter: options?.filter ?? null})
}
