import Image from 'next/image';

interface MosaicImage {
  src: string;
  alt: string;
}

interface ImageMosaicProps {
  images: MosaicImage[];
  layout?: 'hero' | 'grid';
  priority?: boolean;
  className?: string;
}

export default function ImageMosaic({
  images,
  layout = 'hero',
  priority = false,
  className = '',
}: ImageMosaicProps) {
  if (!images.length) return null;

  if (layout === 'hero' && images.length >= 2) {
    const [main, ...rest] = images;
    const sideImages = rest.slice(0, 2);
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 ${className}`}>
        <div className="relative sm:col-span-2 aspect-[4/3] sm:aspect-[5/4] rounded-card-lg overflow-hidden bg-primary-soft">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 66vw"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 sm:grid-rows-2 gap-3 sm:gap-4">
          {sideImages.map((img, i) => (
            <div key={img.src} className={`relative ${sideImages.length === 1 ? 'col-span-2 sm:col-span-1' : 'aspect-square sm:aspect-auto'} rounded-card-lg overflow-hidden bg-primary-soft`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={priority && i === 0}
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === 'hero' && images.length === 1) {
    return (
      <div className={`relative aspect-[16/9] rounded-card-lg overflow-hidden bg-primary-soft ${className}`}>
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 ${className}`}>
      {images.map((img) => (
        <div key={img.src} className="relative aspect-square rounded-card overflow-hidden bg-primary-soft">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}
