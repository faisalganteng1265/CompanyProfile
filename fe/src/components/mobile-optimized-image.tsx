import Image, { getImageProps, type ImageProps } from "next/image";

/** Cap large mobile photos while retaining the desktop image and dimensions. */
export default function MobileOptimizedImage(props: ImageProps) {
  const { priority, ...imageProps } = props;
  const mobile = getImageProps({ ...imageProps, quality: 75 }).props;
  const mobileSrcSet = mobile.srcSet
    ?.split(", ")
    .filter((candidate) => {
      const descriptor = candidate.split(" ").at(-1) ?? "";
      return !descriptor.endsWith("w") || Number.parseInt(descriptor) <= 1080;
    })
    .join(", ");
  return (
    <picture
      style={
        props.fill
          ? { position: "absolute", inset: 0 }
          : { display: "contents" }
      }
    >
      <source
        media="(max-width: 760px)"
        srcSet={mobileSrcSet}
        sizes={mobile.sizes}
      />
      <Image
        {...imageProps}
        loading={priority ? "eager" : imageProps.loading}
        fetchPriority={priority ? "high" : imageProps.fetchPriority}
      />
    </picture>
  );
}
