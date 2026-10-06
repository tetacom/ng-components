import { toBlob } from 'html-to-image';

export interface ChartImageExportOptions {
  backgroundColor?: string;
  pixelRatio?: number;
  timeoutMs?: number;
}

export interface ChartImageCapture {
  signal: AbortSignal;
  isReady: () => boolean;
  filter: (node: HTMLElement) => boolean;
  snapshotCanvas?: (canvas: HTMLCanvasElement) => string;
}

export async function exportChartImage(
  root: HTMLElement,
  options: ChartImageExportOptions,
  capture: ChartImageCapture,
): Promise<Blob> {
  const timeoutMs = options.timeoutMs ?? 10000;
  if (
    !Number.isFinite(timeoutMs) ||
    timeoutMs <= 0 ||
    (options.pixelRatio != null && (!Number.isFinite(options.pixelRatio) || options.pixelRatio <= 0))
  ) {
    throw new Error('Invalid chart image export options');
  }
  const controller = new AbortController();
  const abort = () => controller.abort();
  capture.signal.addEventListener('abort', abort, { once: true });
  if (capture.signal.aborted) controller.abort();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const signal = controller.signal;
  const check = () => {
    if (signal.aborted)
      throw new Error(timedOut ? 'Chart image export timed out' : 'Chart was destroyed during image export');
  };
  const wait = <T>(promise: Promise<T>): Promise<T> =>
    new Promise((resolve, reject) => {
      const onAbort = () => {
        cleanup();
        try {
          check();
        } catch (error) {
          reject(error);
        }
      };
      const cleanup = () => signal.removeEventListener('abort', onAbort);
      signal.addEventListener('abort', onAbort, { once: true });
      promise.then(
        (value) => {
          cleanup();
          resolve(value);
        },
        (error) => {
          cleanup();
          reject(error);
        },
      );
      if (signal.aborted) onAbort();
    });
  const restores: (() => void)[] = [];
  try {
    check();
    await wait(root.ownerDocument.fonts.ready);
    let lastSignature = '';
    let stableFrames = 0;
    while (stableFrames < 3) {
      await wait(new Promise<void>((resolve) => setTimeout(resolve, 50)));
      check();
      const signature = root.clientWidth + ':' + root.clientHeight + ':' + root.innerHTML;
      const ready = root.clientWidth > 0 && root.clientHeight > 0 && capture.isReady();
      stableFrames = ready && signature === lastSignature ? stableFrames + 1 : 0;
      lastSignature = signature;
    }
    restores.push(...prepareSvgSnapshots(root, capture.filter));
    for (const canvas of Array.from(root.querySelectorAll('canvas'))) {
      check();
      const image = new Image();
      image.src = capture.snapshotCanvas ? capture.snapshotCanvas(canvas) : canvas.toDataURL('image/png');
      image.className = canvas.className;
      image.style.cssText = canvas.style.cssText;
      const rect = canvas.getBoundingClientRect();
      image.style.width = rect.width + 'px';
      image.style.height = rect.height + 'px';
      await wait(image.decode());
      check();
      const parent = canvas.parentNode;
      if (!parent) throw new Error('Chart canvas is no longer attached');
      parent.replaceChild(image, canvas);
      restores.push(() => {
        if (image.parentNode === parent) parent.replaceChild(canvas, image);
      });
    }
    const blob = await wait(
      toBlob(root, {
        backgroundColor: options.backgroundColor ?? getChartBackgroundColor(root),
        pixelRatio: options.pixelRatio ?? 1,
        cacheBust: true,
        width: root.clientWidth,
        height: root.clientHeight,
        filter: capture.filter,
      }),
    );
    check();
    if (!blob) throw new Error('Failed to create chart PNG');
    return blob;
  } finally {
    restores.reverse().forEach((restore) => restore());
    clearTimeout(timeout);
    capture.signal.removeEventListener('abort', abort);
  }
}

function getChartBackgroundColor(root: HTMLElement): string {
  const view = root.ownerDocument.defaultView;
  if (!view) return '#ffffff';
  const backgrounds: string[] = [];
  for (let element: HTMLElement | null = root; element; element = element.parentElement) {
    backgrounds.push(view.getComputedStyle(element).backgroundColor);
  }
  const canvas = root.ownerDocument.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Cannot resolve chart background color');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, 1, 1);
  for (const background of backgrounds.reverse()) {
    context.fillStyle = background;
    context.fillRect(0, 0, 1, 1);
  }
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
  return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}
function prepareSvgSnapshots(root: HTMLElement, filter: ChartImageCapture['filter']): (() => void)[] {
  const view = root.ownerDocument.defaultView;
  if (!view) throw new Error('Chart document is not available');
  const restores: (() => void)[] = [];
  const svgs = Array.from(root.querySelectorAll('svg')).filter(svg => !svg.parentElement?.closest('svg'));
  try {
    for (const svg of svgs) {
      const snapshot = svg.cloneNode(true) as SVGSVGElement;
      const sources = [svg, ...Array.from(svg.querySelectorAll<SVGElement>('*'))];
      const targets = [snapshot, ...Array.from(snapshot.querySelectorAll<SVGElement>('*'))];
      sources.forEach((source, index) => {
        const target = targets[index];
        if (source !== svg && !filter(source as unknown as HTMLElement)) {
          target.remove();
          return;
        }
        // html-to-image deep-clones SVG without copying descendant computed styles.
        const style = view.getComputedStyle(source);
        for (let propertyIndex = 0; propertyIndex < style.length; propertyIndex++) {
          const property = style.item(propertyIndex);
          target.style.setProperty(property, style.getPropertyValue(property), style.getPropertyPriority(property));
        }
      });
      const parent = svg.parentNode;
      if (!parent) throw new Error('Chart SVG is no longer attached');
      parent.replaceChild(snapshot, svg);
      restores.push(() => {
        if (snapshot.parentNode === parent) parent.replaceChild(svg, snapshot);
      });
    }
  } catch (error) {
    restores.reverse().forEach(restore => restore());
    throw error;
  }
  return restores;
}
